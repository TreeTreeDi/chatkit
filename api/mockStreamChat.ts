import { v4 as uuid } from 'uuid'
import { BlockType, BlockStatus } from '../types/message'
import { ChunkType, type Chunk } from '../types/chunk'
import { useMessageStore } from '../store/messageStore'

interface MockStreamChatOptions {
  withThinking?: boolean
  onChunk?: (chunk: Chunk) => void
}

// Mock 数据:一个包含丰富 Markdown 格式的示例
const MOCK_THINKING_CONTENT = `这是一个思考过程的示例。

让我分析一下这个问题:
1. 首先需要理解核心需求
2. 然后设计解决方案
3. 最后实现并验证`

const MOCK_TEXT_CONTENT = `# 流式 Markdown 渲染演示

这是一个**流式渲染**的演示,内容会逐字逐句地显示出来。

## 支持的功能

### 1. 代码高亮

这是一段 TypeScript 代码:

\`\`\`typescript
interface MessageBlock {
  id: string
  type: BlockType
  content: string
  status: BlockStatus
}

const updateContent = (id: string, content: string) => {
  store.updateBlockContent(id, content)
}
\`\`\`

### 2. 列表支持

**有序列表:**

1. 第一项
2. 第二项
3. 第三项

**无序列表:**

- 支持 Markdown
- 支持代码高亮
- 支持表格
- 支持数学公式

### 3. 表格展示

| 功能 | 状态 | 说明 |
|------|------|------|
| 流式渲染 | ✅ | 实时更新 |
| 代码高亮 | ✅ | Prism.js |
| 数学公式 | ✅ | KaTeX |
| 思考块 | ✅ | 可折叠 |

### 4. 数学公式

行内公式: $E = mc^2$

块级公式:

$$
\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

### 5. 引用和强调

> 这是一段引用文本,展示了 Markdown 的引用功能。

**粗体文本** 和 *斜体文本* 也都支持。

### 6. 链接

访问 [GitHub](https://github.com) 了解更多信息。

---

## 总结

这个 Demo 展示了完整的流式 Markdown 渲染能力,包括:

- ✅ 实时流式更新
- ✅ 完整 Markdown 语法支持
- ✅ 代码高亮
- ✅ 数学公式
- ✅ 表格渲染
- ✅ 思考过程展示

**体验非常流畅!**`

/**
 * Mock 流式聊天 - 模拟 OpenAI SSE 流式响应
 * 不需要真实 API,用于演示和开发
 */
export async function* mockStreamChat(
  options: MockStreamChatOptions = {}
): AsyncGenerator<Chunk> {
  const { withThinking = true, onChunk } = options
  const store = useMessageStore.getState()

  // 创建块 ID
  const textBlockId = uuid()
  const thinkingBlockId = uuid()

  try {
    // 1. 如果启用思考块,先流式输出思考过程
    if (withThinking) {
      // 创建思考块
      store.upsertBlock({
        id: thinkingBlockId,
        type: BlockType.THINKING,
        content: '',
        status: BlockStatus.STREAMING,
        createdAt: new Date().toISOString(),
      })

      const chunk: Chunk = { type: ChunkType.THINKING_START }
      yield chunk
      onChunk?.(chunk)

      // 模拟思考内容逐字输出
      const thinkingChunks = splitIntoChunks(MOCK_THINKING_CONTENT, 5)
      for (const text of thinkingChunks) {
        await sleep(50) // 模拟网络延迟

        store.updateBlockContent(thinkingBlockId, text)

        const deltaChunk: Chunk = {
          type: ChunkType.THINKING_DELTA,
          text,
        }
        yield deltaChunk
        onChunk?.(deltaChunk)
      }

      // 完成思考
      store.updateBlockStatus(thinkingBlockId, BlockStatus.COMPLETE)
      const completeChunk: Chunk = { type: ChunkType.THINKING_COMPLETE }
      yield completeChunk
      onChunk?.(completeChunk)

      // 思考完成后稍作停顿
      await sleep(300)
    }

    // 2. 创建文本块
    store.upsertBlock({
      id: textBlockId,
      type: BlockType.TEXT,
      content: '',
      status: BlockStatus.STREAMING,
      createdAt: new Date().toISOString(),
    })

    const textStartChunk: Chunk = { type: ChunkType.TEXT_START }
    yield textStartChunk
    onChunk?.(textStartChunk)

    // 3. 流式输出文本内容
    const textChunks = splitIntoChunks(MOCK_TEXT_CONTENT, 8)
    for (const text of textChunks) {
      await sleep(30) // 模拟网络延迟

      store.updateBlockContent(textBlockId, text)

      const deltaChunk: Chunk = {
        type: ChunkType.TEXT_DELTA,
        text,
      }
      yield deltaChunk
      onChunk?.(deltaChunk)
    }

    // 4. 完成文本输出
    store.updateBlockStatus(textBlockId, BlockStatus.COMPLETE)
    const textCompleteChunk: Chunk = { type: ChunkType.TEXT_COMPLETE }
    yield textCompleteChunk
    onChunk?.(textCompleteChunk)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorChunk: Chunk = { type: ChunkType.ERROR, error: errorMessage }
    yield errorChunk
    onChunk?.(errorChunk)

    // 更新所有块为错误状态
    if (store.getBlock(textBlockId)) {
      store.updateBlockStatus(textBlockId, BlockStatus.ERROR)
    }
    if (withThinking && store.getBlock(thinkingBlockId)) {
      store.updateBlockStatus(thinkingBlockId, BlockStatus.ERROR)
    }
  }
}

/**
 * 将文本拆分为小块,模拟流式传输
 * @param text 完整文本
 * @param chunkSize 每块的字符数
 */
function splitIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = []
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize))
  }
  return chunks
}

/**
 * 异步延迟函数
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { streamChat } from '../api/streamChat'
import { useMessageStore } from '../store/messageStore'
import { ChunkType } from '../types/chunk'
import { BlockStatus } from '../types/message'

// Mock fetch API
global.fetch = vi.fn()

describe('streamChat - 流式 Markdown 核心功能测试', () => {
  beforeEach(() => {
    useMessageStore.getState().clearBlocks()
    vi.clearAllMocks()
  })

  it('应该处理流式文本消息', async () => {
    // Mock SSE 响应
    const mockSSEData = [
      'data: {"choices":[{"delta":{"content":"Hello"}}]}',
      'data: {"choices":[{"delta":{"content":" "}}]}',
      'data: {"choices":[{"delta":{"content":"World"}}]}',
      'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}',
      'data: [DONE]',
    ].join('\n')

    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(mockSSEData))
        controller.close()
      }
    })

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      body: mockStream,
    } as Response)

    const chunks: any[] = []

    // 执行流式处理
    for await (const chunk of streamChat({
      apiKey: 'test-key',
      messages: [{ role: 'user', content: 'test' }],
      onChunk: (c) => chunks.push(c),
    })) {
      // 收集所有 chunks
    }

    // 验证 chunks
    expect(chunks.length).toBeGreaterThan(0)
    expect(chunks[0].type).toBe(ChunkType.TEXT_START)
    expect(chunks.some(c => c.type === ChunkType.TEXT_DELTA)).toBe(true)
    expect(chunks[chunks.length - 1].type).toBe(ChunkType.TEXT_COMPLETE)

    // 验证 store 中的最终内容
    const store = useMessageStore.getState()
    const blocks = Array.from(store.blocks.values())

    expect(blocks.length).toBe(1)
    expect(blocks[0].content).toBe('Hello World')
    expect(blocks[0].status).toBe(BlockStatus.COMPLETE)
  })

  it('应该处理带思考过程的流式消息', async () => {
    const mockSSEData = [
      'data: {"choices":[{"delta":{"reasoning_content":"Let me think..."}}]}',
      'data: {"choices":[{"delta":{"content":"Answer"}}]}',
      'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}',
      'data: [DONE]',
    ].join('\n')

    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(mockSSEData))
        controller.close()
      }
    })

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      body: mockStream,
    } as Response)

    const chunks: any[] = []

    for await (const chunk of streamChat({
      apiKey: 'test-key',
      messages: [{ role: 'user', content: 'test' }],
      onChunk: (c) => chunks.push(c),
    })) {
      // 收集所有 chunks
    }

    // 验证思考块和文本块都被创建
    const store = useMessageStore.getState()
    const blocks = Array.from(store.blocks.values())

    expect(blocks.length).toBe(2)

    const thinkingBlock = blocks.find(b => b.content.includes('think'))
    const textBlock = blocks.find(b => b.content.includes('Answer'))

    expect(thinkingBlock).toBeDefined()
    expect(textBlock).toBeDefined()
    expect(thinkingBlock?.status).toBe(BlockStatus.COMPLETE)
    expect(textBlock?.status).toBe(BlockStatus.COMPLETE)
  })

  it('应该处理 API 错误', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    } as Response)

    const chunks: any[] = []

    for await (const chunk of streamChat({
      apiKey: 'invalid-key',
      messages: [{ role: 'user', content: 'test' }],
      onChunk: (c) => chunks.push(c),
    })) {
      // 收集所有 chunks
    }

    // 验证错误被正确处理
    expect(chunks.some(c => c.type === ChunkType.ERROR)).toBe(true)
    const errorChunk = chunks.find(c => c.type === ChunkType.ERROR)
    expect(errorChunk?.error).toContain('401')
  })

  it('应该正确模拟增量 Markdown 渲染', async () => {
    // 模拟逐字符流式输出 Markdown
    const mockSSEData = [
      'data: {"choices":[{"delta":{"content":"#"}}]}',
      'data: {"choices":[{"delta":{"content":" "}}]}',
      'data: {"choices":[{"delta":{"content":"标题"}}]}',
      'data: {"choices":[{"delta":{"content":"\\n\\n"}}]}',
      'data: {"choices":[{"delta":{"content":"**粗体**"}}]}',
      'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}',
      'data: [DONE]',
    ].join('\n')

    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(mockSSEData))
        controller.close()
      }
    })

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      body: mockStream,
    } as Response)

    const contentSnapshots: string[] = []

    for await (const chunk of streamChat({
      apiKey: 'test-key',
      messages: [{ role: 'user', content: 'test' }],
      onChunk: (c) => {
        if (c.type === ChunkType.TEXT_DELTA) {
          // 每次增量后记录当前内容快照
          const currentStore = useMessageStore.getState()
          const blocks = Array.from(currentStore.blocks.values())
          const textBlock = blocks.find(b => b.content.length > 0)
          if (textBlock) {
            contentSnapshots.push(textBlock.content)
          }
        }
      },
    })) {
      // 流式处理
    }

    // 验证内容是逐步累积的
    expect(contentSnapshots.length).toBeGreaterThan(0)

    // 验证最终内容包含完整的 Markdown
    const finalContent = contentSnapshots[contentSnapshots.length - 1]
    expect(finalContent).toContain('# 标题')
    expect(finalContent).toContain('**粗体**')

    // 验证内容是递增的(每次都比上一次长)
    for (let i = 1; i < contentSnapshots.length; i++) {
      expect(contentSnapshots[i].length).toBeGreaterThanOrEqual(
        contentSnapshots[i - 1].length
      )
    }
  })
})

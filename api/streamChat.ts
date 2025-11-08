import { v4 as uuid } from 'uuid'
import { BlockType, BlockStatus } from '../types/message'
import { ChunkType, type Chunk } from '../types/chunk'
import { useMessageStore } from '../store/messageStore'

interface StreamChatOptions {
  apiKey: string
  model?: string
  messages: Array<{ role: string; content: string }>
  onChunk?: (chunk: Chunk) => void
}

export async function* streamChat(options: StreamChatOptions): AsyncGenerator<Chunk> {
  const { apiKey, model = 'gpt-4', messages, onChunk } = options
  const store = useMessageStore.getState()

  // 创建块 ID
  const textBlockId = uuid()
  const thinkingBlockId = uuid()

  let hasThinking = false

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')

      // 保留最后一个不完整的行
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data:')) continue

        const data = trimmed.slice(5).trim()
        if (data === '[DONE]') continue

        try {
          const parsed = JSON.parse(data)
          const delta = parsed.choices?.[0]?.delta
          if (!delta) continue

          // 处理思考内容(reasoning_content)
          if (delta.reasoning_content) {
            if (!hasThinking) {
              hasThinking = true

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
            }

            // 更新思考内容
            store.updateBlockContent(thinkingBlockId, delta.reasoning_content)

            const chunk: Chunk = {
              type: ChunkType.THINKING_DELTA,
              text: delta.reasoning_content
            }
            yield chunk
            onChunk?.(chunk)
          }

          // 处理文本内容
          if (delta.content) {
            const block = store.getBlock(textBlockId)

            // 首次创建文本块
            if (!block) {
              store.upsertBlock({
                id: textBlockId,
                type: BlockType.TEXT,
                content: '',
                status: BlockStatus.STREAMING,
                createdAt: new Date().toISOString(),
              })

              const chunk: Chunk = { type: ChunkType.TEXT_START }
              yield chunk
              onChunk?.(chunk)
            }

            // 更新文本内容
            store.updateBlockContent(textBlockId, delta.content)

            const chunk: Chunk = {
              type: ChunkType.TEXT_DELTA,
              text: delta.content
            }
            yield chunk
            onChunk?.(chunk)
          }

          // 处理完成信号
          if (parsed.choices?.[0]?.finish_reason) {
            if (hasThinking) {
              store.updateBlockStatus(thinkingBlockId, BlockStatus.COMPLETE)
              const chunk: Chunk = { type: ChunkType.THINKING_COMPLETE }
              yield chunk
              onChunk?.(chunk)
            }

            if (store.getBlock(textBlockId)) {
              store.updateBlockStatus(textBlockId, BlockStatus.COMPLETE)
              const chunk: Chunk = { type: ChunkType.TEXT_COMPLETE }
              yield chunk
              onChunk?.(chunk)
            }
          }
        } catch (parseError) {
          console.error('Failed to parse SSE line:', data, parseError)
        }
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const chunk: Chunk = { type: ChunkType.ERROR, error: errorMessage }
    yield chunk
    onChunk?.(chunk)

    // 更新所有流式块为错误状态
    if (store.getBlock(textBlockId)) {
      store.updateBlockStatus(textBlockId, BlockStatus.ERROR)
    }
    if (hasThinking && store.getBlock(thinkingBlockId)) {
      store.updateBlockStatus(thinkingBlockId, BlockStatus.ERROR)
    }
  }
}

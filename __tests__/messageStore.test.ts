import { describe, it, expect, beforeEach } from 'vitest'
import { useMessageStore } from '../store/messageStore'
import { BlockType, BlockStatus } from '../types/message'

describe('messageStore - 核心流式功能测试', () => {
  beforeEach(() => {
    // 每个测试前清空 store
    useMessageStore.getState().clearBlocks()
  })

  it('应该能够创建新的文本块', () => {
    const store = useMessageStore.getState()

    const block = {
      id: 'block-1',
      type: BlockType.TEXT,
      content: 'Hello',
      status: BlockStatus.STREAMING,
      createdAt: new Date().toISOString(),
    }

    store.upsertBlock(block)

    const savedBlock = store.getBlock('block-1')
    expect(savedBlock).toBeDefined()
    expect(savedBlock?.content).toBe('Hello')
    expect(savedBlock?.status).toBe(BlockStatus.STREAMING)
  })

  it('应该能够流式追加内容', () => {
    const store = useMessageStore.getState()

    // 创建初始块
    store.upsertBlock({
      id: 'block-1',
      type: BlockType.TEXT,
      content: 'Hello',
      status: BlockStatus.STREAMING,
      createdAt: new Date().toISOString(),
    })

    // 流式追加内容
    store.updateBlockContent('block-1', ' ')
    store.updateBlockContent('block-1', 'World')
    store.updateBlockContent('block-1', '!')

    const block = store.getBlock('block-1')
    expect(block?.content).toBe('Hello World!')
  })

  it('应该能够更新块状态', () => {
    const store = useMessageStore.getState()

    store.upsertBlock({
      id: 'block-1',
      type: BlockType.TEXT,
      content: 'Complete message',
      status: BlockStatus.STREAMING,
      createdAt: new Date().toISOString(),
    })

    store.updateBlockStatus('block-1', BlockStatus.COMPLETE)

    const block = store.getBlock('block-1')
    expect(block?.status).toBe(BlockStatus.COMPLETE)
  })

  it('应该维护正确的块顺序', () => {
    const store = useMessageStore.getState()

    store.upsertBlock({
      id: 'block-1',
      type: BlockType.THINKING,
      content: 'Thinking...',
      status: BlockStatus.STREAMING,
      createdAt: new Date().toISOString(),
    })

    store.upsertBlock({
      id: 'block-2',
      type: BlockType.TEXT,
      content: 'Response',
      status: BlockStatus.STREAMING,
      createdAt: new Date().toISOString(),
    })

    // 重新获取最新状态
    const currentState = useMessageStore.getState()
    expect(currentState.blockIds).toEqual(['block-1', 'block-2'])
  })

  it('应该能够清空所有块', () => {
    const store = useMessageStore.getState()

    store.upsertBlock({
      id: 'block-1',
      type: BlockType.TEXT,
      content: 'Test',
      status: BlockStatus.STREAMING,
      createdAt: new Date().toISOString(),
    })

    store.clearBlocks()

    expect(store.blockIds).toEqual([])
    expect(store.blocks.size).toBe(0)
  })
})

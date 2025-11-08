import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { enableMapSet } from 'immer'
import type { MessageBlock } from '../types/message'

// 启用 Immer 的 Map/Set 支持
enableMapSet()

interface MessageStore {
  // 状态
  blocks: Map<string, MessageBlock>
  blockIds: string[]

  // Actions
  upsertBlock: (block: MessageBlock) => void
  updateBlockContent: (id: string, content: string) => void
  updateBlockStatus: (id: string, status: MessageBlock['status']) => void
  getBlock: (id: string) => MessageBlock | undefined
  clearBlocks: () => void
}

export const useMessageStore = create<MessageStore>()(
  immer((set, get) => ({
    // 初始状态
    blocks: new Map(),
    blockIds: [],

    // 添加或更新块
    upsertBlock: (block) => set((state) => {
      const exists = state.blocks.has(block.id)

      state.blocks.set(block.id, {
        ...block,
        updatedAt: new Date().toISOString(),
      })

      // 如果是新块,添加到 ID 列表
      if (!exists) {
        state.blockIds.push(block.id)
      }
    }),

    // 更新块内容(流式更新核心方法)
    updateBlockContent: (id, newContent) => set((state) => {
      const block = state.blocks.get(id)
      if (!block) return

      block.content += newContent  // 追加内容
      block.updatedAt = new Date().toISOString()
    }),

    // 更新块状态
    updateBlockStatus: (id, status) => set((state) => {
      const block = state.blocks.get(id)
      if (!block) return

      block.status = status
      block.updatedAt = new Date().toISOString()
    }),

    // 获取块
    getBlock: (id) => {
      return get().blocks.get(id)
    },

    // 清空所有块
    clearBlocks: () => set((state) => {
      state.blocks.clear()
      state.blockIds = []
    }),
  }))
)

// 导出选择器 Hooks
export const useBlock = (id: string) =>
  useMessageStore(state => state.blocks.get(id))

export const useAllBlocks = () => {
  const blockIds = useMessageStore(state => state.blockIds)
  const blocks = useMessageStore(state => state.blocks)

  return blockIds.map(id => blocks.get(id)!).filter(Boolean)
}

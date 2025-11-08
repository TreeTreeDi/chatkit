// 块类型枚举
export enum BlockType {
  TEXT = 'text',
  THINKING = 'thinking',
}

// 块状态
export enum BlockStatus {
  STREAMING = 'streaming',   // 流式接收中
  COMPLETE = 'complete',     // 完成
  ERROR = 'error',           // 错误
}

// 消息块接口
export interface MessageBlock {
  id: string
  type: BlockType
  content: string
  status: BlockStatus
  createdAt: string
  updatedAt?: string
}

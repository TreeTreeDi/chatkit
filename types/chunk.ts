// Chunk 类型枚举
export enum ChunkType {
  TEXT_START = 'text.start',
  TEXT_DELTA = 'text.delta',
  TEXT_COMPLETE = 'text.complete',
  THINKING_START = 'thinking.start',
  THINKING_DELTA = 'thinking.delta',
  THINKING_COMPLETE = 'thinking.complete',
  ERROR = 'error',
}

// Chunk 联合类型
export type Chunk =
  | { type: ChunkType.TEXT_START }
  | { type: ChunkType.TEXT_DELTA; text: string }
  | { type: ChunkType.TEXT_COMPLETE }
  | { type: ChunkType.THINKING_START }
  | { type: ChunkType.THINKING_DELTA; text: string }
  | { type: ChunkType.THINKING_COMPLETE }
  | { type: ChunkType.ERROR; error: string }

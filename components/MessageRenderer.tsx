import React from 'react'
import { useAllBlocks } from '../store/messageStore'
import { TextBlock } from './blocks/TextBlock'
import { ThinkingBlock } from './blocks/ThinkingBlock'
import { BlockType } from '../types/message'

export const MessageRenderer: React.FC = () => {
  const blocks = useAllBlocks()

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      {blocks.map((block) => {
        switch (block.type) {
          case BlockType.TEXT:
            return <TextBlock key={block.id} blockId={block.id} />

          case BlockType.THINKING:
            return <ThinkingBlock key={block.id} blockId={block.id} />

          default:
            return null
        }
      })}
    </div>
  )
}

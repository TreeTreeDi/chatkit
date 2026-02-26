import React from 'react'
import { useAllBlocks } from '../store/messageStore'
import { TextBlock } from './blocks/TextBlock'
import { ThinkingBlock } from './blocks/ThinkingBlock'
import { BlockType } from '../types/message'

export const MessageRenderer: React.FC = () => {
  const blocks = useAllBlocks()

  if (blocks.length === 0) {
    return (
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '60px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          color: '#9ca3af',
        }}
      >
        <span style={{ fontSize: '48px' }}>💬</span>
        <p style={{ fontSize: '16px', margin: 0 }}>点击&ldquo;开始演示&rdquo;查看流式渲染效果</p>
      </div>
    )
  }

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

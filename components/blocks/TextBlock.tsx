import React from 'react'
import { Markdown } from '../Markdown'
import { useBlock } from '../../store/messageStore'
import { BlockStatus } from '../../types/message'

interface TextBlockProps {
  blockId: string
}

export const TextBlock: React.FC<TextBlockProps> = ({ blockId }) => {
  const block = useBlock(blockId)

  if (!block) return null

  return (
    <div
      style={{
        marginBottom: '16px',
        lineHeight: '1.6',
        fontSize: '15px',
      }}
    >
      <Markdown content={block.content} />

      {/* 流式输入光标 */}
      {block.status === BlockStatus.STREAMING && (
        <span
          className="cursor-blink"
          style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            background: '#0066ff',
            marginLeft: '2px',
          }}
        >
          ▊
        </span>
      )}
    </div>
  )
}

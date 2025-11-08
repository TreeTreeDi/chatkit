import React, { useState } from 'react'
import { Markdown } from '../Markdown'
import { useBlock } from '../../store/messageStore'
import { BlockStatus } from '../../types/message'

interface ThinkingBlockProps {
  blockId: string
}

export const ThinkingBlock: React.FC<ThinkingBlockProps> = ({ blockId }) => {
  const block = useBlock(blockId)
  const [expanded, setExpanded] = useState(false)

  if (!block) return null

  const isThinking = block.status === BlockStatus.STREAMING

  return (
    <div
      style={{
        marginBottom: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* 可折叠的头部 */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '12px 16px',
          background: '#f9f9f9',
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontWeight: 500 }}>
          {isThinking ? '正在思考...' : '思考过程'}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '12px' }}>
          {expanded ? '▼' : '▶'}
        </span>
      </div>

      {/* 可折叠的内容 */}
      {expanded && (
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid #e0e0e0',
            background: '#fafafa',
          }}
        >
          <Markdown content={block.content} />

          {isThinking && (
            <span
              className="cursor-blink"
              style={{
                display: 'inline-block',
                width: '8px',
                height: '16px',
                background: '#666',
                marginLeft: '2px',
              }}
            >
              ▊
            </span>
          )}
        </div>
      )}
    </div>
  )
}

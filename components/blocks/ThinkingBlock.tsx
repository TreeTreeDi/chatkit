import React, { useState } from 'react'
import { Markdown } from '../Markdown'
import { useBlock } from '../../store/messageStore'
import { BlockStatus } from '../../types/message'

interface ThinkingBlockProps {
  blockId: string
}

export const ThinkingBlock: React.FC<ThinkingBlockProps> = ({ blockId }) => {
  const block = useBlock(blockId)
  const [expanded, setExpanded] = useState(true)

  if (!block) return null

  const isThinking = block.status === BlockStatus.STREAMING

  return (
    <div
      style={{
        marginBottom: '16px',
        border: `1px solid ${isThinking ? '#a5b4fc' : '#e0e0e0'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
    >
      {/* 可折叠的头部 */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '12px 16px',
          background: isThinking ? '#eef2ff' : '#f9f9f9',
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background 0.3s',
        }}
      >
        {isThinking && (
          <span
            style={{
              display: 'inline-block',
              width: '14px',
              height: '14px',
              border: '2px solid #6366f1',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              flexShrink: 0,
            }}
          />
        )}
        <span style={{ fontWeight: 500, color: isThinking ? '#4f46e5' : '#374151' }}>
          {isThinking ? '正在思考...' : '思考过程'}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>
          {expanded ? '▼' : '▶'}
        </span>
      </div>

      {/* 可折叠的内容 */}
      {expanded && (
        <div
          style={{
            padding: '16px',
            borderTop: `1px solid ${isThinking ? '#a5b4fc' : '#e0e0e0'}`,
            background: '#fafafa',
            transition: 'border-color 0.3s',
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
                background: '#6366f1',
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

'use client'

import React, { useState } from 'react'
import { MessageRenderer } from '../components/MessageRenderer'
import { mockStreamChat } from '../api/mockStreamChat'
import { useMessageStore } from '../store/messageStore'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [withThinking, setWithThinking] = useState(true)
  const clearBlocks = useMessageStore((state) => state.clearBlocks)

  const handleStartDemo = async () => {
    if (loading) return

    setLoading(true)
    clearBlocks()

    try {
      // 使用 Mock 流式聊天
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const chunk of mockStreamChat({
        withThinking,
      })) {
        // Chunk 处理已在 mockStreamChat 内部完成
      }
    } catch (error) {
      console.error('Stream error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    clearBlocks()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 头部 */}
      <header
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>
            流式 Markdown 渲染演示
          </h1>
        </div>
      </header>

      {/* 消息区域 */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '20px 0', background: '#f9fafb' }}>
        <MessageRenderer />
      </main>

      {/* 控制面板 */}
      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '20px',
          background: 'white',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* 选项 */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <input
                type="checkbox"
                checked={withThinking}
                onChange={(e) => setWithThinking(e.target.checked)}
                disabled={loading}
                style={{ cursor: 'pointer' }}
              />
              <span>包含思考过程 (Thinking Block)</span>
            </label>
          </div>

          {/* 按钮组 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleStartDemo}
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px 24px',
                background: loading
                  ? '#9ca3af'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 2px 8px rgba(102, 126, 234, 0.4)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.4)'
                }
              }}
            >
              {loading ? '流式渲染中...' : '开始演示'}
            </button>

            <button
              onClick={handleClear}
              disabled={loading}
              style={{
                padding: '14px 24px',
                background: 'white',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#f9fafb'
                  e.currentTarget.style.borderColor = '#9ca3af'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }
              }}
            >
              清空
            </button>
          </div>

          {/* 提示信息 */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#0369a1',
            }}
          >
            提示: 这个演示使用 Mock 数据,不需要真实的 OpenAI API。点击&ldquo;开始演示&rdquo;查看流式 Markdown 渲染效果!
          </div>
        </div>
      </footer>
    </div>
  )
}

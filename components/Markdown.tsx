import React from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

interface MarkdownProps {
  content: string
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const components: Components = {
    // 代码块渲染
    code(props) {
      const { className, children, ...rest } = props
      const match = /language-(\w+)/.exec(className || '')
      const codeString = String(children).replace(/\n$/, '')

      // 如果有语言类名,则渲染为代码块
      return match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1em 0',
            borderRadius: '8px',
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      ) : (
        <code
          className={className}
          style={{
            background: '#f5f5f5',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.9em',
          }}
          {...rest}
        >
          {children}
        </code>
      )
    },

    // 链接渲染
    a({ children, ...props }) {
      return (
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0066ff', textDecoration: 'underline' }}
        >
          {children}
        </a>
      )
    },

    // 表格渲染
    table({ children, ...props }) {
      return (
        <div style={{ overflowX: 'auto', margin: '1em 0' }}>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              border: '1px solid #ddd',
            }}
            {...props}
          >
            {children}
          </table>
        </div>
      )
    },

    th({ children, ...props }) {
      return (
        <th
          style={{
            padding: '8px 12px',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            fontWeight: 600,
          }}
          {...props}
        >
          {children}
        </th>
      )
    },

    td({ children, ...props }) {
      return (
        <td
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
          }}
          {...props}
        >
          {children}
        </td>
      )
    },
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  )
}

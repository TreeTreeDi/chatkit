# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 的流式聊天应用,支持显示 AI 思考过程和文本响应。使用 Zustand + Immer 管理状态,通过流式 SSE 协议与 OpenAI API 交互。

## 常用命令

### 开发
```bash
pnpm dev          # 启动开发服务器 (http://localhost:3000)
pnpm build        # 生产构建
pnpm start        # 启动生产服务器
```

### 代码质量检查
```bash
pnpm lint         # ESLint 检查
pnpm lint:fix     # 自动修复 ESLint 问题
pnpm type-check   # TypeScript 类型检查
pnpm check        # 同时运行 lint 和 type-check
pnpm check:fix    # 自动修复后检查
```

### 测试
```bash
pnpm test         # 运行 Vitest 测试
pnpm test:ui      # 启动 Vitest UI 界面
```

测试框架: Vitest (使用 happy-dom 环境)
测试文件位置: `__tests__/` 目录

## 核心架构

### 状态管理 (Zustand + Immer)

- **位置**: `store/messageStore.ts`
- **核心机制**: 使用 Zustand 的 Immer 中间件管理 Map/Set 数据结构
- **关键点**: 必须在文件顶部调用 `enableMapSet()` 以支持 Map/Set

状态结构:
```typescript
{
  blocks: Map<string, MessageBlock>  // 存储所有消息块
  blockIds: string[]                 // 保持渲染顺序
}
```

选择器:
- `useBlock(id)` - 获取单个块
- `useAllBlocks()` - 按顺序获取所有块

### 流式聊天系统

#### 核心类型

**消息块** (`types/message.ts`):
- `BlockType.TEXT` - 文本内容块
- `BlockType.THINKING` - AI 思考过程块
- `BlockStatus` - STREAMING / COMPLETE / ERROR

**数据块** (`types/chunk.ts`):
- 使用判别联合类型定义所有流式事件
- 事件类型: `{TEXT|THINKING}_{START|DELTA|COMPLETE}`, `ERROR`

#### 流式处理流程

1. **API 层** (`api/streamChat.ts`):
   - 使用 AsyncGenerator 处理 SSE 流
   - 解析 OpenAI 的 `delta.reasoning_content` (思考) 和 `delta.content` (文本)
   - 自动调用 `useMessageStore.getState()` 更新状态

2. **渲染层**:
   - `MessageRenderer` 订阅 `useAllBlocks()` 自动重渲染
   - `TextBlock` / `ThinkingBlock` 订阅单个块的状态变化
   - 使用 `Markdown` 组件渲染富文本 (支持 KaTeX 数学公式)

### 组件结构

```
components/
├── MessageRenderer.tsx      # 消息块列表容器
├── Markdown.tsx             # Markdown 渲染器 (react-markdown + KaTeX)
└── blocks/
    ├── TextBlock.tsx        # 文本块组件
    └── ThinkingBlock.tsx    # 思考块组件
```

## 关键技术细节

### Immer Map/Set 支持
使用 Zustand + Immer 管理 Map 时必须:
1. 导入 `enableMapSet` 并在模块顶部调用
2. 使用 `state.blocks.set()` / `state.blocks.get()` 修改

### SSE 流处理
- 使用 `TextDecoder` 处理字节流
- 手动管理缓冲区处理不完整行
- 错误处理会自动更新所有相关块的状态为 ERROR

### Markdown 渲染配置
使用插件:
- `remark-gfm` - GitHub Flavored Markdown
- `remark-math` + `rehype-katex` - 数学公式支持

## 开发规范

### 目录别名
配置了 `@` 别名指向项目根目录 (vitest.config.ts + tsconfig.json)

### TypeScript
严格模式,必须通过 `pnpm type-check` 检查

### 状态更新模式
优先使用:
- `updateBlockContent(id, content)` - 追加内容 (流式更新)
- `updateBlockStatus(id, status)` - 更新状态
- `upsertBlock(block)` - 创建或完全替换块

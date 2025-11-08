# MotherDuck 样式指南

> 基于 motherduck-clone.html 的完整样式系统分析与设计规范

---

## 目录

1. [项目概览](#项目概览)
2. [颜色系统](#颜色系统)
3. [字体系统](#字体系统)
4. [间距系统](#间距系统)
5. [组件库](#组件库)
6. [效果与交互](#效果与交互)
7. [响应式设计](#响应式设计)
8. [布局系统](#布局系统)
9. [最佳实践](#最佳实践)

---

## 项目概览

### 设计理念
MotherDuck 采用现代、简洁的设计风格,以浅色调为主,辅以鲜明的强调色。设计系统强调:
- **简洁性**: 扁平化设计,减少不必要的装饰
- **可访问性**: 高对比度色彩组合,清晰的视觉层次
- **一致性**: 统一的间距、圆角和字体系统
- **响应式**: 移动优先的设计方法

### 技术栈
- **样式方案**: Styled Components (styled-jsx)
- **CSS 版本**: Modern CSS with CSS Custom Properties
- **浏览器支持**: 现代浏览器 (支持 CSS Grid, Flexbox, Custom Properties)

---

## 颜色系统

### 主色调 (Primary Colors)

#### 背景色
```css
/* 主背景色 - 温暖的米色 */
--color-bg-primary: #F4EFEA;

/* 次要背景色 - 浅灰白 */
--color-bg-secondary: #F8F8F7;

/* 纯白背景 */
--color-bg-white: #FFFFFF;

/* 深色背景 - 用于页脚、深色区域 */
--color-bg-dark: #383838;
```

#### 前景色/文本色
```css
/* 主文本色 - 深灰 */
--color-text-primary: #383838;

/* 次要文本色 - 中灰 */
--color-text-secondary: #A1A1A1;

/* 深色背景上的文本 */
--color-text-inverse: #FFFFFF;

/* 黑色文本 - 用于高对比度场景 */
--color-text-black: #000000;
```

### 强调色 (Accent Colors)

#### 品牌色/交互色
```css
/* 主品牌色 - 天蓝色 */
--color-brand-primary: #6FC2FF;

/* 品牌色深色变体 - 用于悬停、激活状态 */
--color-brand-dark: #2BA5FF;

/* 警示色 - 黄色 (用于通知栏) */
--color-accent-yellow: #FFDE00;

/* 次要强调色 - 珊瑚红 */
--color-accent-coral: #FF7169;

/* 中性色调 - 米黄色 (用于激活背景) */
--color-accent-beige: #E1D6CB;
```

### 颜色使用示例

```css
/* 按钮 - 主要操作 */
.button-primary {
  background-color: #6FC2FF;
  color: #383838;
  border: 2px solid #383838;
}

.button-primary:hover {
  box-shadow: -8px 8px 0px 0px #383838;
}

.button-primary:active {
  background-color: #2BA5FF;
}

/* 按钮 - 次要操作 */
.button-secondary {
  background-color: #F4EFEA;
  color: #383838;
  border: 2px solid #383838;
}

.button-secondary:active {
  background-color: #E1D6CB;
}

/* 按钮 - 禁用状态 */
.button-disabled {
  background-color: #F8F8F7;
  color: #A1A1A1;
  border: 2px solid #A1A1A1;
  pointer-events: none;
}

/* 通知横幅 */
.banner-alert {
  background-color: #FFDE00;
  color: #000000;
  border: solid #383838;
  border-width: 2px 0;
}
```

### 颜色对比度表

| 背景色 | 前景色 | 对比度 | WCAG 等级 |
|--------|--------|--------|-----------|
| #F4EFEA | #383838 | 8.9:1 | AAA |
| #6FC2FF | #383838 | 5.2:1 | AA |
| #383838 | #FFFFFF | 11.4:1 | AAA |
| #FFDE00 | #000000 | 16.8:1 | AAA |

---

## 字体系统

### 字体家族 (Font Families)

```css
/* 主字体 - 用于正文 */
--font-family-base: 'Inter', Arial, sans-serif;

/* 等宽字体 - 用于代码、技术内容 */
--font-family-mono: 'Aeonik Mono', monospace;

/* 标题字体 - 压缩字体,用于大标题 */
--font-family-display: 'Aeonik Fono', 'Aeonik Mono';

/* 备用字体 */
--font-family-fallback: 'Open Sans', sans-serif;
```

### 字体加载

```html
<!-- 预连接 Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 预加载自定义字体 -->
<link rel="preload" href="/fonts/AeonikMono/AeonikMono-Regular.woff2" 
      as="font" type="font/woff2" crossorigin>
```

### 字号系统 (Font Sizes)

```css
/* 字号规模 - 基于 4px 基准单位 */
--font-size-xs: 12px;      /* 0.75rem */
--font-size-sm: 13px;      /* 0.8125rem */
--font-size-base: 14px;    /* 0.875rem */
--font-size-md: 16px;      /* 1rem - 基准字号 */
--font-size-lg: 18px;      /* 1.125rem */
--font-size-xl: 20px;      /* 1.25rem */
--font-size-2xl: 24px;     /* 1.5rem */
--font-size-3xl: 30px;     /* 1.875rem */
--font-size-4xl: 32px;     /* 2rem */
--font-size-5xl: 40px;     /* 2.5rem */
--font-size-6xl: 48px;     /* 3rem */
--font-size-7xl: 56px;     /* 3.5rem */
--font-size-8xl: 72px;     /* 4.5rem */
--font-size-9xl: 80px;     /* 5rem */
```

### 字重 (Font Weights)

```css
--font-weight-light: 300;    /* 细体 - 用于正文 */
--font-weight-regular: 400;  /* 常规 - 用于大多数文本 */
--font-weight-semibold: 600; /* 半粗 - 用于强调 */
--font-weight-bold: 700;     /* 粗体 - 用于标题 */
```

### 行高 (Line Heights)

```css
--line-height-tight: 120%;   /* 紧凑 - 用于大标题 */
--line-height-snug: 130%;    /* 稍紧 - 用于小标题 */
--line-height-normal: 140%;  /* 正常 - 用于正文 */
--line-height-relaxed: 160%; /* 宽松 - 用于大段落 */
```

### 字距 (Letter Spacing)

```css
--letter-spacing-normal: normal;  /* 正常间距 */
--letter-spacing-wide: 0.02em;    /* 稍宽 - 用于大多数文本 */
```

### 排版样式示例

```css
/* H1 - 超大标题 */
h1 {
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 48px;
  line-height: 120%;
  font-weight: 400;
  letter-spacing: normal;
}

@media (min-width: 728px) {
  h1 { font-size: 56px; }
}

@media (min-width: 960px) {
  h1 { font-size: 80px; }
}

/* H2 - 大标题 */
h2 {
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 24px;
  line-height: 120%;
  font-weight: 400;
}

@media (min-width: 728px) {
  h2 { font-size: 32px; }
}

@media (min-width: 960px) {
  h2 { font-size: 40px; }
}

/* H3 - 中标题 */
h3 {
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 20px;
  line-height: 120%;
  font-weight: 400;
}

@media (min-width: 960px) {
  h3 { font-size: 32px; }
}

/* H4 - 小标题 */
h4 {
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 18px;
  line-height: 120%;
  font-weight: 400;
}

@media (min-width: 728px) {
  h4 { font-size: 24px; }
}

@media (min-width: 960px) {
  h4 { font-size: 32px; }
}

/* H5 - 次小标题 */
h5 {
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 16px;
  line-height: 120%;
  font-weight: 400;
}

@media (min-width: 960px) {
  h5 { font-size: 24px; }
}

/* 正文 - 段落 */
p {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 140%;
  letter-spacing: 0.02em;
}

/* 正文 - 大号 */
.text-large {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.02em;
}

@media (min-width: 728px) {
  .text-large { font-size: 20px; }
}

/* 正文 - 小号 */
.text-small {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 300;
  line-height: 140%;
  letter-spacing: 0.02em;
}

@media (min-width: 728px) {
  .text-small { font-size: 14px; }
}

/* 标签文本 */
label {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
}

@media (min-width: 728px) {
  label {
    font-size: 16px;
    line-height: 160%;
  }
}

/* 粗体文本 */
.text-bold {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: 0.02em;
}

@media (min-width: 1302px) {
  .text-bold { font-size: 16px; }
}

/* 大写文本 */
.text-uppercase {
  font-family: 'Aeonik Fono', 'Aeonik Mono';
  text-transform: uppercase;
  letter-spacing: normal;
}
```

---

## 间距系统

### 间距比例 (Spacing Scale)

基于 **4px 基准单位** 的间距系统:

```css
/* 间距变量 */
--spacing-0: 0px;      /* 0 */
--spacing-1: 4px;      /* 0.25rem */
--spacing-2: 8px;      /* 0.5rem */
--spacing-3: 12px;     /* 0.75rem */
--spacing-4: 16px;     /* 1rem */
--spacing-5: 20px;     /* 1.25rem */
--spacing-6: 24px;     /* 1.5rem */
--spacing-8: 32px;     /* 2rem */
--spacing-10: 40px;    /* 2.5rem */
--spacing-12: 48px;    /* 3rem */
--spacing-14: 56px;    /* 3.5rem */
--spacing-16: 64px;    /* 4rem */
--spacing-18: 72px;    /* 4.5rem */
--spacing-20: 80px;    /* 5rem */
--spacing-24: 96px;    /* 6rem */
--spacing-30: 120px;   /* 7.5rem */
--spacing-32: 128px;   /* 8rem */
--spacing-34: 136px;   /* 8.5rem */
--spacing-38: 152px;   /* 9.5rem */
--spacing-40: 160px;   /* 10rem */
--spacing-50: 200px;   /* 12.5rem */
```

### Gap 值 (用于 Flexbox/Grid)

```css
gap: 4px;    /* 极小间距 */
gap: 6px;    /* 小间距 */
gap: 8px;    /* 基础间距 */
gap: 12px;   /* 小-中间距 */
gap: 16px;   /* 中等间距 */
gap: 20px;   /* 中-大间距 */
gap: 24px;   /* 大间距 */
gap: 32px;   /* 特大间距 */
gap: 40px;   /* 超大间距 */
gap: 48px;   /* 巨大间距 */
gap: 56px;   /* 极大间距 */
gap: 64px;   /* 超极大间距 */
gap: 72px;   /* 特超大间距 */
gap: 80px;   /* 最大间距 */
```

### Padding 使用模式

```css
/* 内容区域内边距 */
.container {
  padding: 0 20px;
}

@media (min-width: 960px) {
  .container {
    padding: 0 60px;
  }
}

@media (min-width: 1302px) {
  .container {
    padding: 0 30px;
  }
}

/* 组件内边距 */
.component-padding-sm {
  padding: 8px 12px;
}

.component-padding-md {
  padding: 16px 24px;
}

.component-padding-lg {
  padding: 24px 32px;
}

/* 区域内边距 */
.section-padding-mobile {
  padding: 64px 0;
}

@media (min-width: 728px) {
  .section-padding-tablet {
    padding: 56px 0;
  }
}

@media (min-width: 960px) {
  .section-padding-desktop {
    padding: 90px 0 72px;
  }
}
```

### 间距使用示例

```css
/* 卡片组件 */
.card {
  padding: 24px;
  gap: 16px;
}

@media (min-width: 728px) {
  .card {
    padding: 32px;
    gap: 24px;
  }
}

/* 按钮内边距 */
.button {
  padding: 16.5px 22px; /* 垂直 | 水平 */
}

/* 列表项间距 */
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 网格间距 */
.grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 728px) {
  .grid {
    gap: 24px;
  }
}

@media (min-width: 960px) {
  .grid {
    gap: 32px;
  }
}
```

---

## 组件库

### 按钮 (Buttons)

#### 主要按钮 (Primary Button)

```css
.button-primary {
  /* 布局 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  position: relative;
  cursor: pointer;
  
  /* 外观 */
  background-color: #6FC2FF;
  color: #383838;
  border: 2px solid #383838;
  border-radius: 2px;
  
  /* 文字 */
  font-family: 'Inter', serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  text-transform: uppercase;
  
  /* 间距 */
  padding: 16.5px 22px;
  
  /* 交互 */
  outline-color: #2BA5FF;
  outline-offset: 0px;
  transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
}

.button-primary:hover {
  box-shadow: -8px 8px 0px 0px #383838;
  transform: translate(4px, -4px);
}

.button-primary:active {
  background-color: #2BA5FF;
}

.button-primary:disabled {
  color: #A1A1A1;
  background-color: #F8F8F7;
  border-color: #A1A1A1;
  pointer-events: none;
  user-select: none;
}
```

#### 次要按钮 (Secondary Button)

```css
.button-secondary {
  /* 继承主要按钮的所有样式 */
  /* ... */
  
  /* 仅改变背景色 */
  background-color: #F4EFEA;
}

.button-secondary:active {
  background-color: #E1D6CB;
}
```

#### 文本按钮 (Text Button/Link)

```css
.button-text {
  /* 布局 */
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  cursor: pointer;
  
  /* 外观 */
  background: none;
  border: 1px solid transparent;
  border-radius: 2px;
  color: #383838;
  
  /* 文字 */
  font-family: 'Inter', serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: 0.02em;
  
  /* 间距 */
  padding-left: 0;
  padding-right: 0;
  
  /* 交互 */
  outline-color: #383838;
  outline-offset: -1px;
}

.button-text span {
  font-family: 'Inter', serif;
  border-bottom: 0.09em solid #383838;
  margin-bottom: 1px;
  padding: 1px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.button-text:hover span {
  border-bottom-color: #383838;
}

.button-text:disabled {
  border: 1px solid transparent;
  background-color: transparent;
}

/* 反色文本按钮 (用于深色背景) */
.button-text-inverse {
  color: #F8F8F7;
}

.button-text-inverse span {
  border-color: #F8F8F7;
}
```

#### 按钮尺寸变体

```css
/* 小按钮 */
.button-sm {
  padding: 12px 16px;
  font-size: 14px;
}

/* 中按钮 (默认) */
.button-md {
  padding: 16.5px 22px;
  font-size: 16px;
}

/* 大按钮 */
.button-lg {
  padding: 20px 28px;
  font-size: 18px;
}
```

#### 使用示例

```html
<!-- 主要按钮 -->
<button class="button-primary">
  <span>开始使用</span>
</button>

<!-- 次要按钮 -->
<button class="button-secondary">
  <span>了解更多</span>
</button>

<!-- 文本按钮 -->
<button class="button-text">
  <span>查看详情</span>
  <svg><!-- 箭头图标 --></svg>
</button>

<!-- 禁用按钮 -->
<button class="button-primary" disabled>
  <span>已禁用</span>
</button>
```

### 容器 (Containers)

#### 主容器

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 728px) {
  .container {
    max-width: 728px;
    padding: 0 20px;
  }
}

@media (min-width: 960px) {
  .container {
    max-width: 960px;
    padding: 0 60px;
  }
}

@media (min-width: 1302px) {
  .container {
    max-width: 1302px;
    padding: 0 30px;
  }
}
```

#### 内容容器变体

```css
/* 窄容器 */
.container-narrow {
  max-width: 480px;
}

/* 中等容器 */
.container-medium {
  max-width: 720px;
}

/* 宽容器 */
.container-wide {
  max-width: 1000px;
}

/* 全宽容器 */
.container-full {
  max-width: 100%;
}
```

### 卡片 (Cards)

```css
.card {
  /* 布局 */
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  /* 外观 */
  background-color: #FFFFFF;
  border: 2px solid #383838;
  border-radius: 2px;
  
  /* 间距 */
  padding: 24px;
  
  /* 交互 */
  transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
}

.card:hover {
  box-shadow: -6px 6px 0px 0px #383838;
  transform: translate(3px, -3px);
}

@media (min-width: 728px) {
  .card {
    padding: 32px;
    gap: 24px;
  }
}

/* 卡片标题 */
.card-title {
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 120%;
  margin-bottom: 8px;
}

/* 卡片内容 */
.card-content {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 140%;
  letter-spacing: 0.02em;
}
```

### 导航栏 (Header/Navigation)

```css
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #F4EFEA;
  z-index: 99;
  border-bottom: 2px solid transparent;
  transition: border-bottom 200ms ease-in-out;
}

.header-container {
  padding: 20px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-mobile);
}

@media (min-width: 1302px) {
  .header-container {
    padding: 20px 0;
    height: var(--header-desktop);
  }
}

/* 导航链接 */
.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: 0.02em;
  color: #383838;
  text-decoration: none;
  border-bottom: 0.09em solid transparent;
  padding: 1px 0;
  transition: border-color 120ms ease-in-out;
}

.nav-link:hover {
  border-bottom-color: #383838;
}

@media (min-width: 1302px) {
  .nav-link {
    font-size: 14px;
  }
}
```

### 页脚 (Footer)

```css
.footer {
  padding: 64px 0;
  width: 100%;
  background-color: #383838;
  color: #FFFFFF;
}

@media (min-width: 728px) {
  .footer {
    padding: 56px 0;
  }
}

@media (min-width: 960px) {
  .footer {
    padding: 90px 0 72px;
  }
}

/* 页脚链接 */
.footer-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  text-decoration: none;
  border-bottom: 0.09em solid transparent;
  transition: border-color 120ms ease-in-out;
}

.footer-link:hover {
  border-bottom-color: #FFFFFF;
}
```

### 通知横幅 (Banner)

```css
.banner {
  border: solid #383838;
  border-width: 2px 0;
  background-color: #FFDE00;
  display: flex;
  align-items: center;
  color: #000000;
  overflow: hidden;
  height: 70px;
}

@media (min-width: 728px) {
  .banner {
    height: 55px;
  }
}

.banner-text {
  font-family: 'Aeonik Fono', 'Aeonik Mono';
  text-transform: uppercase;
  width: fit-content;
  text-align: center;
  letter-spacing: normal;
}

.banner-link {
  text-transform: uppercase;
  font-family: 'Aeonik Fono', 'Aeonik Mono';
  letter-spacing: normal;
  color: #000000;
}

.banner-link span {
  border-color: #000000;
}

.banner-link:hover span {
  border-color: #000000;
}
```

### 表单元素

#### 输入框 (Input)

```css
.input {
  /* 布局 */
  width: 100%;
  
  /* 外观 */
  background-color: #FFFFFF;
  border: 2px solid #383838;
  border-radius: 2px;
  color: #383838;
  
  /* 文字 */
  font-family: 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  
  /* 间距 */
  padding: 12px 16px;
  
  /* 交互 */
  outline-color: #2BA5FF;
  outline-offset: 0px;
  transition: border-color 120ms ease-in-out;
}

.input:focus {
  border-color: #2BA5FF;
  outline: 2px solid #2BA5FF;
}

.input:disabled {
  background-color: #F8F8F7;
  color: #A1A1A1;
  border-color: #A1A1A1;
}

.input::placeholder {
  color: #A1A1A1;
}
```

#### 标签 (Label)

```css
.label {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #383838;
  display: block;
  margin-bottom: 8px;
}

@media (min-width: 728px) {
  .label {
    font-size: 16px;
    line-height: 160%;
  }
}
```

### 提示框 (Tooltip)

```css
.tooltip {
  position: absolute;
  background-color: #F4EFEA;
  color: transparent;
  padding: 4px 8px;
  z-index: 1;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 140%;
  border: 1px solid #383838;
  border-radius: 2px;
  white-space: nowrap;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #383838;
}
```

---

## 效果与交互

### 阴影系统 (Shadows & Elevation)

MotherDuck 使用**偏移阴影**而非模糊阴影,创造独特的几何风格:

```css
/* 阴影层级 */
--shadow-sm: -5px 5px 0px 0px #383838;   /* 小阴影 - 用于小元素 */
--shadow-md: -6px 6px 0px 0px #383838;   /* 中阴影 - 用于卡片 */
--shadow-lg: -8px 8px 0px 0px #383838;   /* 大阴影 - 用于按钮 */
--shadow-xl: -12px 12px 0px 0px #383838; /* 超大阴影 - 用于重要元素 */
--shadow-none: none;                      /* 无阴影 */
```

#### 使用示例

```css
/* 卡片悬停效果 */
.card {
  box-shadow: none;
  transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
}

.card:hover {
  box-shadow: -6px 6px 0px 0px #383838;
  transform: translate(3px, -3px);
}

/* 按钮悬停效果 */
.button {
  box-shadow: none;
  transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
}

.button:hover {
  box-shadow: -8px 8px 0px 0px #383838;
  transform: translate(4px, -4px);
}

/* 大型元素悬停效果 */
.hero-card:hover {
  box-shadow: -12px 12px 0px 0px #383838;
  transform: translate(6px, -6px);
}
```

### 动画与过渡 (Animations & Transitions)

#### 过渡时长

```css
--transition-fast: 30ms;     /* 快速 - 用于微交互 */
--transition-normal: 120ms;  /* 正常 - 用于大多数交互 */
--transition-slow: 200ms;    /* 慢速 - 用于复杂动画 */
--transition-slower: 500ms;  /* 更慢 - 用于淡入淡出 */
```

#### 缓动函数

```css
--ease-in-out: ease-in-out;  /* 主要缓动函数 */
```

#### 常用过渡

```css
/* 按钮/卡片交互 */
.interactive-element {
  transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
}

/* 快速交互 (小元素) */
.micro-interaction {
  transition: box-shadow 30ms ease-in-out, transform 30ms ease-in-out;
}

/* 位置变化 */
.position-change {
  transition: transform 200ms ease-in-out;
}

/* 双重过渡 */
.dual-transition {
  transition: right 200ms ease-in-out, opacity 500ms ease-in-out;
}

/* 边框过渡 */
.border-transition {
  transition: border-bottom 200ms ease-in-out;
}
```

#### 动画示例

```css
/* 悬停放大效果 */
@keyframes hover-lift {
  from {
    box-shadow: none;
    transform: translate(0, 0);
  }
  to {
    box-shadow: -8px 8px 0px 0px #383838;
    transform: translate(4px, -4px);
  }
}

/* 淡入效果 */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 滑入效果 */
@keyframes slide-in-right {
  from {
    right: -100vw;
    opacity: 0;
  }
  to {
    right: 0;
    opacity: 1;
  }
}
```

### 透明度系统 (Opacity)

```css
--opacity-0: 0;     /* 完全透明 */
--opacity-50: 0.5;  /* 半透明 */
--opacity-60: 0.6;  /* 稍透明 */
--opacity-100: 1;   /* 完全不透明 */
```

#### 使用场景

```css
/* 禁用状态 */
.disabled {
  opacity: 0.5;
}

/* 遮罩层 */
.overlay {
  opacity: 0.6;
  background-color: #383838;
}

/* 隐藏元素 */
.hidden {
  opacity: 0;
  pointer-events: none;
}

/* 可见元素 */
.visible {
  opacity: 1;
  pointer-events: auto;
}
```

### 圆角系统 (Border Radius)

MotherDuck 采用**极简的圆角系统**,以直角为主:

```css
--radius-none: 0px;   /* 无圆角 - 默认 */
--radius-sm: 2px;     /* 小圆角 - 用于按钮、卡片、输入框 */
--radius-md: 4px;     /* 中圆角 - 用于特殊元素 */
--radius-full: 36px;  /* 完全圆角 - 用于标签、徽章 */
```

#### 使用示例

```css
/* 按钮 */
.button {
  border-radius: 2px;
}

/* 卡片 */
.card {
  border-radius: 2px;
}

/* 输入框 */
.input {
  border-radius: 2px;
}

/* 标签/徽章 */
.badge {
  border-radius: 36px;
}

/* 图片 */
.image {
  border-radius: 0px; /* 无圆角 */
}
```

### Z-Index 层级系统

```css
--z-base: 0;        /* 基础层 */
--z-dropdown: 1;    /* 下拉菜单 */
--z-sticky: 10;     /* 粘性元素 */
--z-header: 99;     /* 导航栏 */
--z-modal: 100;     /* 模态框 */
--z-tooltip: 101;   /* 提示框 */
```

---

## 响应式设计

### 断点系统 (Breakpoints)

```css
/* 断点定义 */
--breakpoint-xs: 556px;   /* 小手机 */
--breakpoint-sm: 728px;   /* 平板竖屏 */
--breakpoint-md: 960px;   /* 平板横屏 */
--breakpoint-lg: 1302px;  /* 桌面 */
--breakpoint-xl: 1600px;  /* 大屏桌面 */
```

### 媒体查询使用

```css
/* 移动优先方法 */

/* 基础样式 (移动端) */
.element {
  font-size: 14px;
  padding: 16px;
  gap: 12px;
}

/* 小平板 (≥728px) */
@media (min-width: 728px) {
  .element {
    font-size: 16px;
    padding: 20px;
    gap: 16px;
  }
}

/* 平板横屏 (≥960px) */
@media (min-width: 960px) {
  .element {
    font-size: 18px;
    padding: 24px;
    gap: 24px;
  }
}

/* 桌面 (≥1302px) */
@media (min-width: 1302px) {
  .element {
    font-size: 20px;
    padding: 32px;
    gap: 32px;
  }
}

/* 大屏 (≥1600px) */
@media (min-width: 1600px) {
  .element {
    font-size: 24px;
    padding: 40px;
    gap: 40px;
  }
}
```

### 最大宽度查询

```css
/* 仅在小屏幕显示 */
@media (max-width: calc(728px - 1px)) {
  .mobile-only {
    display: block;
  }
}

/* 仅在移动端 */
@media (max-width: 480px) {
  .mobile-specific {
    /* 移动端特定样式 */
  }
}
```

### 响应式组件示例

#### 响应式网格

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 556px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 728px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

@media (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
}

@media (min-width: 1302px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

#### 响应式导航

```css
.nav {
  /* 移动端: 汉堡菜单 */
  opacity: 0;
  overflow-y: auto;
  pointer-events: none;
  background-color: #F4EFEA;
  position: absolute;
  width: 100%;
  height: calc(100vh - 140px);
  right: -100vw;
  padding: 32px 0 56px;
  transition: right 200ms ease-in-out, opacity 500ms ease-in-out;
}

@media (min-width: 728px) {
  .nav {
    height: calc(100vh - 125px);
  }
}

@media (min-width: 1302px) {
  /* 桌面端: 水平导航 */
  .nav {
    display: flex;
    align-items: center;
    gap: 24px;
    opacity: 1;
    pointer-events: auto;
    position: static;
    width: auto;
    height: auto;
    padding: 0;
  }
}
```

#### 响应式字体

```css
.heading {
  font-size: 24px;
}

@media (min-width: 728px) {
  .heading {
    font-size: 32px;
  }
}

@media (min-width: 960px) {
  .heading {
    font-size: 40px;
  }
}

@media (min-width: 1302px) {
  .heading {
    font-size: 56px;
  }
}
```

### 自定义属性 (CSS Variables)

```css
:root {
  /* 导航高度 */
  --header-mobile: 70px;
  --header-desktop: 90px;
  
  /* 横幅高度 */
  --eyebrow-mobile: 70px;
  --eyebrow-desktop: 55px;
}

/* 使用自定义属性 */
html {
  scroll-padding-top: var(--header-mobile);
}

@media (min-width: 1302px) {
  html {
    scroll-padding-top: var(--header-desktop);
  }
}
```

---

## 布局系统

### Flexbox 布局

#### 居中对齐

```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### 水平分布

```css
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

#### 垂直堆叠

```css
.flex-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

#### 响应式 Flexbox

```css
.flex-responsive {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 960px) {
  .flex-responsive {
    flex-direction: row;
    gap: 32px;
    justify-content: space-between;
  }
}
```

### Grid 布局

#### 两列布局

```css
.grid-two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 728px) {
  .grid-two-col {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

#### 侧边栏布局

```css
.grid-sidebar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 960px) {
  .grid-sidebar {
    grid-template-columns: 280px 1fr;
  }
}

@media (min-width: 1302px) {
  .grid-sidebar {
    grid-template-columns: 380px 1fr;
  }
}
```

#### 响应式网格

```css
.grid-auto {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 556px) {
  .grid-auto {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 728px) {
  .grid-auto {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

@media (min-width: 960px) {
  .grid-auto {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}

@media (min-width: 1302px) {
  .grid-auto {
    grid-template-columns: repeat(6, 1fr);
    gap: 32px;
  }
}
```

### 滚动条样式

```css
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #F1F1F1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

### 滚动边距

```css
html {
  scroll-padding-top: var(--header-mobile);
}

@media (min-width: 1302px) {
  html {
    scroll-padding-top: var(--header-desktop);
  }
}

/* 元素滚动边距 */
@media (min-width: 728px) {
  * {
    scroll-margin-top: var(--eyebrow-desktop);
  }
}
```

---

## 最佳实践

### 样式组织

#### 1. 使用语义化类名

```css
/* ✅ 好的做法 */
.button-primary { }
.card-header { }
.nav-link { }

/* ❌ 避免 */
.btn-1 { }
.box { }
.link { }
```

#### 2. 遵循 BEM 命名规范

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--compact { }
```

#### 3. 使用 CSS 自定义属性

```css
/* 定义变量 */
:root {
  --color-primary: #6FC2FF;
  --spacing-md: 16px;
  --transition-normal: 120ms ease-in-out;
}

/* 使用变量 */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  transition: all var(--transition-normal);
}
```

### 性能优化

#### 1. 减少重绘和重排

```css
/* ✅ 使用 transform 代替 position */
.element {
  transform: translateY(10px);
}

/* ❌ 避免 */
.element {
  top: 10px;
}
```

#### 2. 使用 will-change

```css
.interactive-element {
  will-change: transform, box-shadow;
  transition: transform 120ms ease-in-out, box-shadow 120ms ease-in-out;
}
```

#### 3. 优化字体加载

```html
<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 预加载关键字体 -->
<link rel="preload" href="/fonts/AeonikMono/AeonikMono-Regular.woff2" 
      as="font" type="font/woff2" crossorigin>
```

### 可访问性

#### 1. 确保足够的颜色对比度

```css
/* ✅ 对比度 > 4.5:1 (WCAG AA) */
.text-primary {
  color: #383838;
  background-color: #F4EFEA;
}

/* ✅ 对比度 > 7:1 (WCAG AAA) */
.text-high-contrast {
  color: #000000;
  background-color: #FFDE00;
}
```

#### 2. 提供 focus 状态

```css
.button:focus,
.input:focus {
  outline: 2px solid #2BA5FF;
  outline-offset: 2px;
}

/* 为键盘用户提供清晰的焦点指示 */
.link:focus-visible {
  outline: 2px solid #2BA5FF;
  outline-offset: 2px;
}
```

#### 3. 不仅依赖颜色传达信息

```css
/* ✅ 使用图标 + 颜色 */
.error {
  color: #FF7169;
  &::before {
    content: '⚠️ ';
  }
}

/* ✅ 使用文本 + 颜色 */
.success {
  color: #6FC2FF;
  font-weight: 700;
}
```

### 响应式最佳实践

#### 1. 移动优先

```css
/* ✅ 移动优先 */
.element {
  font-size: 14px;
}

@media (min-width: 728px) {
  .element {
    font-size: 16px;
  }
}

/* ❌ 桌面优先 (避免) */
.element {
  font-size: 16px;
}

@media (max-width: 727px) {
  .element {
    font-size: 14px;
  }
}
```

#### 2. 使用相对单位

```css
/* ✅ 使用 em/rem */
.element {
  padding: 1em;
  font-size: 1.125rem;
}

/* ✅ 使用百分比 */
.container {
  width: 100%;
  max-width: 1302px;
}
```

#### 3. 避免固定高度

```css
/* ✅ 使用 min-height */
.card {
  min-height: 200px;
}

/* ❌ 避免固定高度 */
.card {
  height: 200px;
}
```

### 代码复用

#### 1. 创建实用类

```css
/* 间距实用类 */
.mt-4 { margin-top: 16px; }
.mb-4 { margin-bottom: 16px; }
.p-4 { padding: 16px; }

/* 显示实用类 */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }

/* 文本实用类 */
.text-center { text-align: center; }
.text-uppercase { text-transform: uppercase; }
.font-bold { font-weight: 700; }
```

#### 2. 使用组合类

```css
/* 基础按钮 */
.button-base {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid #383838;
  border-radius: 2px;
  padding: 16.5px 22px;
  font-family: 'Inter', serif;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
  transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
}

/* 变体 */
.button-primary {
  @extend .button-base;
  background-color: #6FC2FF;
  color: #383838;
}

.button-secondary {
  @extend .button-base;
  background-color: #F4EFEA;
  color: #383838;
}
```

### 维护性

#### 1. 添加注释

```css
/**
 * 主要按钮
 * 
 * 用于主要的用户操作,如提交表单、开始流程等
 * 
 * @example
 * <button class="button-primary">
 *   <span>提交</span>
 * </button>
 */
.button-primary {
  /* 样式... */
}
```

#### 2. 保持一致性

```css
/* ✅ 一致的顺序 */
.element {
  /* 布局 */
  display: flex;
  position: relative;
  
  /* 盒模型 */
  width: 100%;
  padding: 16px;
  margin: 0 auto;
  
  /* 外观 */
  background-color: #F4EFEA;
  border: 2px solid #383838;
  border-radius: 2px;
  
  /* 文字 */
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #383838;
  
  /* 其他 */
  cursor: pointer;
  transition: all 120ms ease-in-out;
}
```

#### 3. 避免过度嵌套

```css
/* ✅ 扁平结构 */
.card { }
.card-header { }
.card-title { }
.card-body { }

/* ❌ 过度嵌套 */
.card {
  .card-header {
    .card-title {
      /* ... */
    }
  }
}
```

---

## 代码示例

### 完整页面布局示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MotherDuck 样式示例</title>
  <style>
    /* 全局样式 */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', Arial, sans-serif;
      background-color: #F4EFEA;
      color: #383838;
      min-height: 100vh;
      line-height: 1;
    }

    /* 容器 */
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0 20px;
    }

    @media (min-width: 728px) {
      .container {
        max-width: 728px;
      }
    }

    @media (min-width: 960px) {
      .container {
        max-width: 960px;
        padding: 0 60px;
      }
    }

    @media (min-width: 1302px) {
      .container {
        max-width: 1302px;
        padding: 0 30px;
      }
    }

    /* 区域 */
    .section {
      padding: 64px 0;
    }

    @media (min-width: 960px) {
      .section {
        padding: 90px 0;
      }
    }

    /* 网格 */
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 728px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
      }
    }

    @media (min-width: 960px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* 卡片 */
    .card {
      background-color: #FFFFFF;
      border: 2px solid #383838;
      border-radius: 2px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
    }

    .card:hover {
      box-shadow: -6px 6px 0px 0px #383838;
      transform: translate(3px, -3px);
    }

    .card-title {
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 24px;
      font-weight: 400;
      line-height: 120%;
    }

    .card-content {
      font-size: 16px;
      font-weight: 300;
      line-height: 140%;
      letter-spacing: 0.02em;
    }

    /* 按钮 */
    .button-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: #6FC2FF;
      color: #383838;
      border: 2px solid #383838;
      border-radius: 2px;
      padding: 16.5px 22px;
      font-family: 'Inter', serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 120%;
      text-transform: uppercase;
      cursor: pointer;
      transition: box-shadow 120ms ease-in-out, transform 120ms ease-in-out;
    }

    .button-primary:hover {
      box-shadow: -8px 8px 0px 0px #383838;
      transform: translate(4px, -4px);
    }

    .button-primary:active {
      background-color: #2BA5FF;
    }
  </style>
</head>
<body>
  <main>
    <section class="section">
      <div class="container">
        <h1>欢迎使用 MotherDuck</h1>
        
        <div class="grid">
          <div class="card">
            <h3 class="card-title">功能一</h3>
            <p class="card-content">这是卡片内容描述文本。</p>
            <button class="button-primary">了解更多</button>
          </div>
          
          <div class="card">
            <h3 class="card-title">功能二</h3>
            <p class="card-content">这是卡片内容描述文本。</p>
            <button class="button-primary">了解更多</button>
          </div>
          
          <div class="card">
            <h3 class="card-title">功能三</h3>
            <p class="card-content">这是卡片内容描述文本。</p>
            <button class="button-primary">了解更多</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
```

---

## 附录

### 快速参考

#### 颜色
- 主背景: `#F4EFEA`
- 次要背景: `#F8F8F7`
- 主文本: `#383838`
- 品牌色: `#6FC2FF`
- 品牌深色: `#2BA5FF`
- 强调黄: `#FFDE00`

#### 字体
- 正文: `'Inter', Arial, sans-serif`
- 标题: `'Aeonik Mono', monospace`
- 显示: `'Aeonik Fono', 'Aeonik Mono'`

#### 断点
- 小平板: `728px`
- 平板横屏: `960px`
- 桌面: `1302px`
- 大屏: `1600px`

#### 间距
- 基准单位: `4px`
- 常用间距: `8px, 12px, 16px, 24px, 32px, 48px, 64px`

#### 阴影
- 小: `-5px 5px 0px 0px #383838`
- 中: `-6px 6px 0px 0px #383838`
- 大: `-8px 8px 0px 0px #383838`
- 超大: `-12px 12px 0px 0px #383838`

#### 圆角
- 默认: `2px`
- 标签: `36px`

#### 过渡
- 快速: `30ms ease-in-out`
- 正常: `120ms ease-in-out`
- 慢速: `200ms ease-in-out`

---

## 更新日志

### v1.0.0 (2025-11-08)
- 初始版本
- 基于 motherduck-clone.html 完整分析
- 包含所有主要样式系统和组件

---

**文档维护**: 请在修改设计系统时及时更新此文档,保持文档与代码同步。

**联系方式**: 如有疑问或建议,请联系设计团队。

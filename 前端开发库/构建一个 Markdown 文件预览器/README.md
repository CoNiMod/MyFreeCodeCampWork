# Markdown Previewer

一个使用 React 构建的 Markdown 预览器，支持实时预览 GitHub 风格的 Markdown 语法。

## 功能特性

- ✅ 实时 Markdown 预览
- ✅ GitHub 风格的 Markdown 支持
- ✅ 响应式设计
- ✅ 美观的用户界面
- ✅ 支持所有基本的 Markdown 元素

## 支持的元素

- 标题 (H1, H2, H3...)
- 粗体和斜体文本
- 内联代码和代码块
- 链接
- 图片
- 列表 (有序和无序)
- 引用块
- 表格
- 删除线文本

## 技术栈

- React 17
- Marked.js (Markdown 解析)
- DOMPurify (XSS 防护)
- CSS3 (样式)

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

3. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
src/
├── App.js          # 主应用组件
├── App.css         # 应用样式
├── index.js        # 应用入口
└── index.css       # 全局样式

public/
└── index.html      # HTML 模板
```

## FreeCodeCamp 测试

项目已通过所有 FreeCodeCamp 测试用例：

- ✅ 用户故事 #1: 包含 id="editor" 的 textarea 元素
- ✅ 用户故事 #2: 包含 id="preview" 的元素
- ✅ 用户故事 #3: 实时更新预览
- ✅ 用户故事 #4: GitHub 风格 Markdown 支持
- ✅ 用户故事 #5: 默认包含所有必需元素的 Markdown
- ✅ 用户故事 #6: 默认内容正确渲染

## 许可证

MIT License

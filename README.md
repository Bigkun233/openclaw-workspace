# 个人博客与作品集

一个轻量、纯前端（无后端依赖）的个人站点：**博客 + 作品集 + 关于**。

- 技术栈：React 19 + TypeScript + Vite + Tailwind CSS 4 + React Router
- 内容：Markdown 写文章，`content/posts/*.md` 即发布，无需改代码
- 特性：深浅色主题切换、标签筛选、关键词搜索、响应式布局、代码高亮

---

## 快速开始

```bash
pnpm install
pnpm dev        # 本地预览 http://localhost:5173
pnpm build      # 生产构建，产物在 dist/
pnpm preview    # 预览构建产物
```

---

## 目录结构

```
personal-site/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx              # 入口（HashRouter）
│   ├── App.tsx               # 路由表
│   ├── index.css             # Tailwind + 主题变量 + Markdown 样式
│   ├── types.ts
│   ├── data/
│   │   ├── site.ts           # 站点信息、导航、社交链接（改这里）
│   │   └── projects.ts       # 作品集数据（改这里）
│   ├── content/posts/        # 博客文章（.md，新增即发布）
│   ├── lib/posts.ts          # Markdown 读取 + front-matter 解析
│   ├── hooks/useTheme.ts     # 主题切换
│   ├── components/           # Layout / PostCard / ProjectCard / Icon / ThemeToggle
│   └── pages/                # Home / BlogList / PostDetail / Projects / About / NotFound
```

---

## 怎么改内容

### 1. 改个人信息

编辑 `src/data/site.ts`：站点名、标语、邮箱、社交链接、导航。

### 2. 写新文章

在 `src/content/posts/` 下新建 `.md` 文件，开头写 front-matter：

```md
---
title: 文章标题
date: 2026-09-21
summary: 一句话摘要
tags: [标签1, 标签2]
---

正文内容（支持 Markdown / 表格 / 代码块 / 引用）...
```

> 新增文件会被自动收录，**不用改任何代码**。文件名即 URL 的 slug。

### 3. 改作品集

编辑 `src/data/projects.ts` 里的数组即可。

---

## 部署到公网

产物是纯静态文件（`dist/`），可选任意静态托管：

### 方案 A：GitHub Pages（免费，推荐先试）

1. 仓库 Settings → Pages → Source 选 **GitHub Actions**
2. 新建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4
```

3. 若部署在子路径（如 `https://Bigkun233.github.io/personal-site/`），把 `vite.config.ts` 的 `base` 改成 `'/personal-site/'`

> 本项目使用 **HashRouter**，刷新深层路由不会 404，静态托管零配置即可用。

### 方案 B：CloudBase 静态托管

```bash
tcb hosting deploy dist -e <你的环境ID>
```

（需先绑定 CloudBase 环境）

### 方案 C：Vercel / Netlify

导入仓库即可，构建命令 `pnpm build`，输出目录 `dist`。

---

## 待办 / 可扩展

- [ ] 文章正文图片：放到 `public/` 下用 `/xxx.png` 引用
- [ ] RSS 订阅
- [ ] 评论系统（可接 CloudBase 云函数 + 云数据库）
- [ ] SEO：静态站可考虑改 SSR/SSG（如 Astro / Next.js）

---

## 技术说明

- **为什么用 HashRouter**：纯静态托管免配置，任何刷新/直达链接都不会 404。若你有自定义域名且能配 SPA fallback，可换回 `BrowserRouter`。
- **front-matter 解析**：手写的极简解析器（见 `src/lib/posts.ts`），支持字符串与 `[a, b]` 数组，无额外依赖。

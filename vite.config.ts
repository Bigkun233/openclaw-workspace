// vite.config.ts
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // 部署到 GitHub Pages 子路径时改成 '/仓库名/'；本地预览、自定义域名或根路径部署保持 '/'
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    // 允许通过反向代理 / 隧道域名（如 *.lhr.life）访问，仅影响本地 dev 预览
    allowedHosts: true,
  },
})

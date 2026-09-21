// vite.config.ts
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目页部署在 https://<用户>.github.io/<仓库名>/，必须写成 '/仓库名/'；自定义域名或根路径部署改成 '/'
  base: '/personal-site/',
  plugins: [react(), tailwindcss()],
  server: {
    // 允许通过反向代理 / 隧道域名（如 *.lhr.life）访问，仅影响本地 dev 预览
    allowedHosts: true,
  },
})

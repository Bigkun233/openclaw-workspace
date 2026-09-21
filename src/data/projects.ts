// src/data/projects.ts
import type { Project } from '../types'

// TODO: 替换为你自己的项目
export const projects: Project[] = [
  {
    id: 'personal-site',
    name: '个人博客与作品集',
    description: '你用来自我介绍的门面站点：Markdown 写文章，自动生成列表，深浅色主题切换。',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    repo: 'https://github.com/Bigkun233',
    status: '进行中',
    highlights: [
      'Markdown 文章系统，写 .md 即发布',
      '响应式布局，移动端适配',
      '深浅色主题，跟随系统并可手动切换',
    ],
  },
  {
    id: 'toolbox',
    name: '在线工具箱（示例）',
    description: '一个聚合常用小工具的站点：JSON 格式化、时间戳转换、二维码生成等。',
    tags: ['Vue 3', 'Vite', 'CloudBase'],
    status: '规划中',
    highlights: ['纯前端，无后端依赖', '每个工具独立路由，按需加载'],
  },
  {
    id: 'cloud-api',
    name: '云端 API 服务（示例）',
    description: '基于云函数的无服务器接口服务，用于支撑前端应用的数据读写。',
    tags: ['Node.js', 'CloudBase 云函数', 'NoSQL'],
    status: '规划中',
    highlights: ['免运维，按量计费', '内置鉴权与参数校验'],
  },
]

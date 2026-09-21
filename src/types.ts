// src/types.ts
export interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  cover?: string
  readingMinutes: number
}

export interface Post extends PostMeta {
  content: string
}

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  repo?: string
  demo?: string
  highlights: string[]
  status: '已完成' | '进行中' | '规划中'
}

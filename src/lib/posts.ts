// src/lib/posts.ts — 读取 Markdown 文章 + 极简 front-matter 解析
import type { Post, PostMeta } from '../types'

interface RawModule {
  default: string
}

// 自动收集 content/posts 下所有 .md 文件（新增文件无需改代码）
const modules = import.meta.glob<RawModule>('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** 解析 --- 括起来的 front-matter，返回 [meta, body] */
function parseFrontMatter(raw: string): { meta: Record<string, string | string[]>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { meta: {}, body: raw }

  const meta: Record<string, string | string[]> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (!key) continue
    // 支持 [a, b, c] 形式的数组
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      meta[key] = value.replace(/^["']|["']$/g, '')
    }
  }
  return { meta, body: match[2] ?? '' }
}

function estimateReadingMinutes(text: string): number {
  // 中文按字数 / 400，英文按词数 / 200，取较大者，最少 1 分钟
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length
  const words = (text.match(/[A-Za-z0-9]+/g) ?? []).length
  return Math.max(1, Math.round(Math.max(cjk / 400, words / 200)))
}

function toPost(path: string, raw: string): Post {
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path
  const { meta, body } = parseFrontMatter(raw)
  const tags = Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : []
  return {
    slug,
    title: (meta.title as string) ?? slug,
    date: (meta.date as string) ?? '1970-01-01',
    summary: (meta.summary as string) ?? body.slice(0, 80).replace(/[#*`>\n]/g, ' ').trim(),
    tags,
    cover: meta.cover as string | undefined,
    readingMinutes: estimateReadingMinutes(body),
    content: body,
  }
}

let cache: Post[] | null = null

/** 全部文章，按日期倒序 */
export function getAllPosts(): Post[] {
  if (cache) return cache
  cache = Object.entries(modules)
    .map(([path, mod]) => toPost(path, typeof mod === 'string' ? mod : mod.default))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return cache
}

/** 列表用的元信息（不含正文） */
export function getPostMetas(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta)
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

/** 汇总所有标签及计数 */
export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) map.set(tag, (map.get(tag) ?? 0) + 1)
  }
  return [...map.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count)
}

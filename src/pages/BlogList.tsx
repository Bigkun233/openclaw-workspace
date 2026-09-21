// src/pages/BlogList.tsx — GitHub Issues 列表风格
import { useMemo, useState } from 'react'
import { getPostMetas, getAllTags } from '../lib/posts'
import { PostCard } from '../components/PostCard'
import { Icon } from '../components/Icon'

export function BlogList() {
  const posts = getPostMetas()
  const tags = getAllTags()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [keyword, setKeyword] = useState('')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchTag = !activeTag || p.tags.includes(activeTag)
      const kw = keyword.trim().toLowerCase()
      const matchKw =
        !kw ||
        p.title.toLowerCase().includes(kw) ||
        p.summary.toLowerCase().includes(kw) ||
        p.tags.some((t) => t.toLowerCase().includes(kw))
      return matchTag && matchKw
    })
  }, [posts, activeTag, keyword])

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">
          文章 <span className="gh-counter">{posts.length}</span>
        </h1>
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle"
          />
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索文章…"
            className="gh-input w-full pl-8 sm:w-64"
          />
        </div>
      </div>

      {/* 标签筛选条 */}
      <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-bd pb-3">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`gh-label ${activeTag === null ? '!border-accent !bg-accent !text-white' : 'hover:bg-canvas-subtle'}`}
        >
          全部
        </button>
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
            className={`gh-label ${activeTag === tag ? '!border-accent !bg-accent !text-white' : 'hover:bg-canvas-subtle'}`}
          >
            {tag} <span className="opacity-70">{count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="gh-box">
          <div className="gh-box-body text-center text-sm text-fg-muted">没有找到匹配的文章。</div>
        </div>
      ) : (
        <div className="gh-box">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

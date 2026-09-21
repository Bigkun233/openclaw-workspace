// src/pages/BlogList.tsx
import { useMemo, useState } from 'react'
import { getPostMetas, getAllTags } from '../lib/posts'
import { PostCard } from '../components/PostCard'

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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">博客</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">共 {posts.length} 篇文章，记录技术、思考与生活。</p>
      </header>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              activeTag === null
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            全部
          </button>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
              className={`rounded-full px-3 py-1 text-sm transition ${
                activeTag === tag
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              #{tag} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>

        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索标题或标签…"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:w-64 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-brand-900/40"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          没有找到匹配的文章 🤔
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

// src/components/PostCard.tsx
import { Link } from 'react-router-dom'
import type { PostMeta } from '../types'
import { Icon } from './Icon'

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
      <Link to={`/blog/${post.slug}`} className="block">
        <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-500">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{post.summary}</p>
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Icon name="calendar" /> {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Icon name="clock" /> {post.readingMinutes} 分钟
        </span>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

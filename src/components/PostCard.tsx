// src/components/PostCard.tsx — 列表式文章条目（非卡片网格）
import { Link } from 'react-router-dom'
import type { PostMeta } from '../types'

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group py-6 first:pt-0">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-xl text-ink transition-colors group-hover:text-brand-600 dark:text-night-ink dark:group-hover:text-brand-400">
            {post.title}
          </h3>
          <time className="shrink-0 font-mono text-xs text-ink-faint dark:text-night-soft">{post.date}</time>
        </div>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft dark:text-night-soft">
          {post.summary}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink-faint dark:text-night-soft">
          <span>{post.readingMinutes} 分钟</span>
          {post.tags.length > 0 && <span className="text-line dark:text-night-line">·</span>}
          <span className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-brand-600/80 dark:text-brand-400/80">
                {tag}
              </span>
            ))}
          </span>
        </div>
      </Link>
    </article>
  )
}

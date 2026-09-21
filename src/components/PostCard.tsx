// src/components/PostCard.tsx — GitHub 列表行样式
import { Link } from 'react-router-dom'
import type { PostMeta } from '../types'
import { Icon } from './Icon'

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="gh-row">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Link to={`/blog/${post.slug}`} className="gh-title">
          {post.title}
        </Link>
        <time className="font-mono text-xs text-fg-subtle">{post.date}</time>
      </div>
      <p className="gh-desc">{post.summary}</p>
      <div className="gh-meta">
        <span className="gh-label">
          <Icon name="clock" className="mr-1 inline align-text-bottom" />
          {post.readingMinutes} 分钟
        </span>
        {post.tags.map((tag) => (
          <span key={tag} className="gh-label">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

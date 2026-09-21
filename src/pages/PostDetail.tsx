// src/pages/PostDetail.tsx — GitHub README 风格
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getPostBySlug, getPostMetas } from '../lib/posts'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="gh-box">
        <div className="gh-box-body py-12 text-center">
          <h1 className="text-lg font-semibold">文章不存在</h1>
          <p className="mt-2 text-sm text-fg-muted">链接可能已失效，或者文章被删除了。</p>
          <Link to="/blog" className="gh-btn mt-4">
            返回文章列表
          </Link>
        </div>
      </div>
    )
  }

  const others = getPostMetas().filter((p) => p.slug !== post.slug)
  const prev = others.find((p) => p.date < post.date)
  const next = [...others].reverse().find((p) => p.date > post.date)

  return (
    <article>
      <div className="mb-3">
        <Link to="/blog" className="gh-link text-sm">
          ← 返回文章列表
        </Link>
      </div>

      <header className="mb-4 border-b border-bd pb-4">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-subtle">
          <span className="font-mono">{post.date}</span>
          <span>·</span>
          <span>{post.readingMinutes} 分钟阅读</span>
          {post.tags.length > 0 && <span>·</span>}
          {post.tags.map((tag) => (
            <span key={tag} className="gh-label">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="gh-box">
        <div className="gh-box-body prose-custom">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className="gh-box block p-3 transition-colors hover:bg-canvas-subtle">
            <span className="text-xs text-fg-subtle">← 上一篇</span>
            <p className="mt-1 text-sm font-semibold text-accent">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/blog/${next.slug}`}
            className="gh-box block p-3 text-right transition-colors hover:bg-canvas-subtle"
          >
            <span className="text-xs text-fg-subtle">下一篇 →</span>
            <p className="mt-1 text-sm font-semibold text-accent">{next.title}</p>
          </Link>
        )}
      </nav>
    </article>
  )
}

// src/pages/PostDetail.tsx — 杂志风：衬线大标题 + 舒展正文
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
      <div className="py-24">
        <h1 className="font-display text-2xl text-ink dark:text-night-ink">文章不存在</h1>
        <p className="mt-3 text-ink-soft dark:text-night-soft">链接可能已失效，或者文章被删除了。</p>
        <Link
          to="/blog"
          className="link-underline mt-6 inline-block text-sm text-brand-600 dark:text-brand-400"
        >
          ← 返回文章列表
        </Link>
      </div>
    )
  }

  const others = getPostMetas().filter((p) => p.slug !== post.slug)
  const prev = others.find((p) => p.date < post.date)
  const next = [...others].reverse().find((p) => p.date > post.date)

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        to="/blog"
        className="link-underline text-sm text-ink-faint transition-colors hover:text-brand-600 dark:text-night-soft dark:hover:text-brand-400"
      >
        ← 文章
      </Link>

      <header className="mt-8 mb-10">
        <h1 className="text-[2rem] leading-tight text-ink sm:text-[2.35rem] dark:text-night-ink">
          {post.title}
        </h1>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint dark:text-night-soft">
          <time>{post.date}</time>
          <span className="text-line dark:text-night-line">·</span>
          <span>{post.readingMinutes} 分钟</span>
          {post.tags.length > 0 && <span className="text-line dark:text-night-line">·</span>}
          <span>{post.tags.join(' / ')}</span>
        </p>
      </header>

      <div className="prose-custom">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2 dark:border-night-line">
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className="group">
            <span className="font-mono text-xs text-ink-faint dark:text-night-soft">← 上一篇</span>
            <p className="mt-1 font-display text-ink transition-colors group-hover:text-brand-600 dark:text-night-ink dark:group-hover:text-brand-400">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/blog/${next.slug}`} className="group sm:text-right">
            <span className="font-mono text-xs text-ink-faint dark:text-night-soft">下一篇 →</span>
            <p className="mt-1 font-display text-ink transition-colors group-hover:text-brand-600 dark:text-night-ink dark:group-hover:text-brand-400">
              {next.title}
            </p>
          </Link>
        )}
      </nav>
    </article>
  )
}

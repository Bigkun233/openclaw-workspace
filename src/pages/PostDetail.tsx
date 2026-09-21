// src/pages/PostDetail.tsx
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getPostBySlug, getPostMetas } from '../lib/posts'
import { Icon } from '../components/Icon'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="py-20 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">文章不存在</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">链接可能已失效，或者文章被删除了。</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm text-white transition hover:bg-brand-700"
        >
          <Icon name="arrowLeft" /> 返回博客列表
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
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-500"
      >
        <Icon name="arrowLeft" /> 返回博客列表
      </Link>

      <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl dark:text-white">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Icon name="calendar" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="clock" /> {post.readingMinutes} 分钟阅读
          </span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="prose-custom">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <nav className="mt-12 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-800">
        {prev ? (
          <Link
            to={`/blog/${prev.slug}`}
            className="rounded-lg border border-slate-200 p-4 transition hover:border-brand-300 dark:border-slate-800 dark:hover:border-brand-700"
          >
            <span className="text-xs text-slate-500 dark:text-slate-400">← 上一篇</span>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/blog/${next.slug}`}
            className="rounded-lg border border-slate-200 p-4 text-right transition hover:border-brand-300 sm:col-start-2 dark:border-slate-800 dark:hover:border-brand-700"
          >
            <span className="text-xs text-slate-500 dark:text-slate-400">下一篇 →</span>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{next.title}</p>
          </Link>
        )}
      </nav>
    </article>
  )
}

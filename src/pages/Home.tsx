// src/pages/Home.tsx
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { getPostMetas } from '../lib/posts'
import { PostCard } from '../components/PostCard'
import { ProjectCard } from '../components/ProjectCard'
import { Icon } from '../components/Icon'

export function Home() {
  const posts = getPostMetas()
  const latest = posts.slice(0, 3)
  const featured = projects.slice(0, 2)

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-6">
        <p className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 dark:bg-slate-800 dark:text-brand-500">
          👋 欢迎来到我的小站
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          你好，我是 <span className="text-brand-600 dark:text-brand-500">{site.name}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{site.slogan}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/blog"
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
          >
            阅读博客
          </Link>
          <Link
            to="/projects"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            查看作品
          </Link>
        </div>
      </section>

      {/* 最新文章 */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">最新文章</h2>
          <Link to="/blog" className="text-sm text-brand-600 hover:underline dark:text-brand-500">
            全部文章 →
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">还没有文章，去写第一篇吧～</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 精选作品 */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">精选作品</h2>
          <Link to="/projects" className="text-sm text-brand-600 hover:underline dark:text-brand-500">
            全部作品 →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 联系 */}
      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">想聊聊？</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          有项目合作、技术交流，或者只是想打个招呼，都欢迎联系我。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25"
            >
              <Icon name={s.icon} /> {s.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

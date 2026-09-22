// src/pages/Home.tsx — 导语与博客区=杂志风；精选作品=GitHub 风
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { getPostMetas } from '../lib/posts'
import { PostCard } from '../components/PostCard'
import { ProjectCard } from '../components/ProjectCard'
import { RandomBanner } from '../components/RandomBanner'

export function Home() {
  const posts = getPostMetas()
  const latest = posts.slice(0, 3)
  const featured = projects.slice(0, 2)

  return (
    <div className="space-y-20">
      {/* 随机横幅：每次进入 / 刷新换一张 */}
      <RandomBanner />

      {/* 导语（杂志风） */}
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint dark:text-night-soft">
          {site.location} · 全栈开发
        </p>
        <h1 className="mt-6 max-w-2xl text-[2.15rem] leading-[1.25] text-ink sm:text-[2.6rem] dark:text-night-ink">
          你好，我是 {site.name}。<br />
          {site.slogan}
        </h1>
        <p className="mt-6 max-w-xl text-ink-soft dark:text-night-soft">
          这里放一些写下来的东西——技术笔记、项目复盘，以及偶尔的自我怀疑。
          <Link to="/about" className="link-underline ml-1 text-brand-600 dark:text-brand-400">
            关于我
          </Link>
        </p>
      </section>

      {/* 最新文章（杂志风列表） */}
      <section>
        <div className="mb-4 flex items-baseline justify-between border-b border-line pb-3 dark:border-night-line">
          <h2 className="text-lg text-ink dark:text-night-ink">最新文章</h2>
          <Link to="/blog" className="link-underline text-sm text-ink-soft dark:text-night-soft">
            全部文章
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="text-ink-faint dark:text-night-soft">还没有文章。</p>
        ) : (
          <div className="divide-y divide-line dark:divide-night-line">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 精选作品（GitHub 风） */}
      <section className="gh-scope">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-fg-muted">精选作品</h2>
          <Link to="/projects" className="gh-link text-xs">
            全部
          </Link>
        </div>
        <div className="gh-box">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 联系（杂志风） */}
      <section className="border-t border-line pt-10 dark:border-night-line">
        <h2 className="text-lg text-ink dark:text-night-ink">保持联系</h2>
        <p className="mt-3 max-w-xl text-ink-soft dark:text-night-soft">
          项目合作、技术交流，或者只是想打个招呼，都欢迎。
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-ink transition-colors hover:text-brand-600 dark:text-night-ink dark:hover:text-brand-400"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

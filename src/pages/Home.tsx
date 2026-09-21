// src/pages/Home.tsx — GitHub Profile 风格
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { getPostMetas } from '../lib/posts'
import { PostCard } from '../components/PostCard'
import { ProjectCard } from '../components/ProjectCard'
import { Icon } from '../components/Icon'

export function Home() {
  const posts = getPostMetas()
  const latest = posts.slice(0, 4)
  const featured = projects.slice(0, 2)

  return (
    <div className="space-y-8">
      {/* 个人资料头 */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-bd bg-canvas-subtle text-4xl font-semibold text-fg-muted">
          {site.name.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold">{site.name}</h1>
          <p className="mt-2 max-w-xl text-fg-muted">{site.slogan}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-muted">
            <span className="flex items-center gap-1.5">
              <Icon name="calendar" /> {site.location}
            </span>
            {site.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="gh-link flex items-center gap-1.5">
                <Icon name={s.icon} /> {s.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/blog" className="gh-btn gh-btn-primary">
              阅读文章
            </Link>
            <Link to="/projects" className="gh-btn">
              查看作品
            </Link>
          </div>
        </div>
      </section>

      {/* 文章（Pinned 风格） */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-fg-muted">最新文章</h2>
          <Link to="/blog" className="gh-link text-xs">
            全部
          </Link>
        </div>
        {latest.length === 0 ? (
          <div className="gh-box">
            <div className="gh-box-body text-sm text-fg-muted">还没有文章。</div>
          </div>
        ) : (
          <div className="gh-box">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 作品 */}
      <section>
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

      {/* 联系 */}
      <section className="gh-box">
        <div className="gh-box-header">联系我</div>
        <div className="gh-box-body">
          <p className="text-sm text-fg-muted">项目合作、技术交流，或者只是想打个招呼，都欢迎。</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="gh-btn">
                <Icon name={s.icon} /> {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

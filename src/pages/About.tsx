// src/pages/About.tsx
import { site } from '../data/site'

const skills = [
  { group: '前端', items: ['React / TypeScript', 'Vue 3', 'Tailwind CSS', 'Vite'] },
  { group: '后端', items: ['Node.js', 'Serverless / 云函数', 'REST API', 'MySQL / NoSQL'] },
  { group: '工程', items: ['Git / GitHub', 'CI/CD', '单元测试', '性能优化'] },
]

const timeline = [
  { year: '现在', text: '持续打磨个人项目，深耕全栈开发与工程化实践。' },
  { year: '2024', text: '深入前端工程化，沉淀组件库与构建优化经验。' },
  { year: '2022', text: '开始独立负责完整项目的设计与落地。' },
]

export function About() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10">
        <h1 className="text-3xl text-ink dark:text-night-ink">关于</h1>
      </header>

      <section className="prose-custom mb-14 max-w-none">
        <p>
          你好，我是 <strong>{site.name}</strong>，现居 {site.location}。我关注产品的完整生命周期——
          从需求梳理、界面设计，到前后端实现与部署上线。
        </p>
        <p>
          我相信<strong>「做得出来」比「说得漂亮」更重要</strong>。这个站点本身也是我的一个作品：
          用 React + Vite 搭建，文章用 Markdown 管理，部署在静态托管上。
        </p>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 border-b border-line pb-3 text-lg text-ink dark:border-night-line dark:text-night-ink">
          技能
        </h2>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">
                {s.group}
              </h3>
              <ul className="space-y-1.5 text-sm text-ink-soft dark:text-night-soft">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 border-b border-line pb-3 text-lg text-ink dark:border-night-line dark:text-night-ink">
          时间线
        </h2>
        <ol className="space-y-6">
          {timeline.map((t) => (
            <li key={t.year} className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-6">
              <span className="font-mono text-sm text-ink-faint dark:text-night-soft">{t.year}</span>
              <span className="text-ink-soft dark:text-night-soft">{t.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-6 border-b border-line pb-3 text-lg text-ink dark:border-night-line dark:text-night-ink">
          联系
        </h2>
        <ul className="space-y-2 text-sm">
          {site.socials.map((s) => (
            <li key={s.label} className="flex gap-4">
              <span className="w-16 shrink-0 text-ink-faint dark:text-night-soft">{s.label}</span>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-ink transition-colors hover:text-brand-600 dark:text-night-ink dark:hover:text-brand-400"
              >
                {s.url.replace(/^mailto:/, '')}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// src/pages/About.tsx
import { site } from '../data/site'
import { Icon } from '../components/Icon'

const skills = [
  { group: '前端', items: ['React / TypeScript', 'Vue 3', 'Tailwind CSS', 'Vite'] },
  { group: '后端', items: ['Node.js', '云函数 / Serverless', 'REST API', 'MySQL / NoSQL'] },
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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">关于我</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          一名全栈开发者，喜欢把想法做成能跑起来的东西。
        </p>
      </header>

      <section className="prose-custom mb-12">
        <p>
          你好，我是 <strong>{site.name}</strong>，目前在 {site.location}。我关注产品的完整生命周期——
          从需求梳理、界面设计，到前后端实现与部署上线。
        </p>
        <p>
          我相信<strong>「做得出来」比「说得漂亮」更重要</strong>。所以这个站点本身，就是我的一个作品：
          用 React + Vite 搭建，文章用 Markdown 管理，部署在静态托管上。
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">技能栈</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 font-semibold text-brand-600 dark:text-brand-500">{s.group}</h3>
              <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">时间线</h2>
        <ol className="relative space-y-6 border-l border-slate-200 pl-6 dark:border-slate-800">
          {timeline.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-600 dark:border-slate-950" />
              <p className="font-semibold text-slate-900 dark:text-white">{t.year}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">联系方式</h2>
        <div className="flex flex-wrap gap-3">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:text-slate-200 dark:hover:border-brand-700"
            >
              <Icon name={s.icon} /> {s.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

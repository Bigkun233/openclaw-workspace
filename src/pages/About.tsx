// src/pages/About.tsx — GitHub Profile README 风格
import { site } from '../data/site'
import { Icon } from '../components/Icon'

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
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">关于</h1>

      <div className="gh-box">
        <div className="gh-box-header">
          <Icon name="mark" className="text-base text-fg-muted" />
          README.md
        </div>
        <div className="gh-box-body prose-custom">
          <p>
            你好，我是 <strong>{site.name}</strong>，现居 {site.location}。我关注产品的完整生命周期——
            从需求梳理、界面设计，到前后端实现与部署上线。
          </p>
          <p>
            我相信<strong>「做得出来」比「说得漂亮」更重要</strong>。这个站点本身也是我的一个作品：
            用 React + Vite 搭建，文章用 Markdown 管理，部署在静态托管上。
          </p>
        </div>
      </div>

      <div className="gh-box">
        <div className="gh-box-header">技能</div>
        <div className="gh-box-body grid gap-6 sm:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                {s.group}
              </h3>
              <ul className="space-y-1.5 text-sm text-fg-muted">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-fg-subtle">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="gh-box">
        <div className="gh-box-header">时间线</div>
        <div className="gh-box-body">
          <ul className="space-y-4">
            {timeline.map((t) => (
              <li key={t.year} className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-4">
                <span className="font-mono text-sm text-fg-subtle">{t.year}</span>
                <span className="text-sm text-fg-muted">{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gh-box">
        <div className="gh-box-header">联系</div>
        <div className="gh-box-body space-y-2 text-sm">
          {site.socials.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <Icon name={s.icon} className="text-fg-muted" />
              <span className="w-14 text-fg-muted">{s.label}</span>
              <a href={s.url} target="_blank" rel="noreferrer" className="gh-link">
                {s.url.replace(/^mailto:/, '')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

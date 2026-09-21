// src/pages/Projects.tsx
import { useMemo, useState } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

export function Projects() {
  const allTags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return [...set]
  }, [])
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">作品集</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">我做过的项目与正在折腾的东西。</p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full px-3 py-1 text-sm transition ${
            activeTag === null
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          全部
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
            className={`rounded-full px-3 py-1 text-sm transition ${
              activeTag === tag
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          该分类下暂无项目
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

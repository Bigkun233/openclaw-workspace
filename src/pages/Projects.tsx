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
        <h1 className="text-3xl text-ink dark:text-night-ink">作品</h1>
        <p className="mt-3 text-ink-soft dark:text-night-soft">做过的东西，和正在折腾的。</p>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-5 text-sm dark:border-night-line">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`transition-colors ${
            activeTag === null
              ? 'text-brand-600 dark:text-brand-400'
              : 'text-ink-faint hover:text-ink dark:text-night-soft dark:hover:text-night-ink'
          }`}
        >
          全部
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
            className={`transition-colors ${
              activeTag === tag
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-ink-faint hover:text-ink dark:text-night-soft dark:hover:text-night-ink'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-ink-faint dark:text-night-soft">该分类下暂无项目。</p>
      ) : (
        <div>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

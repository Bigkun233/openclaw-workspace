// src/pages/Projects.tsx — GitHub 风：仓库列表 + 标签筛选
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
    <div className="gh-scope">
      <h1 className="mb-4 text-xl font-semibold">
        作品 <span className="gh-counter">{projects.length}</span>
      </h1>

      <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-bd pb-3">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`gh-label ${activeTag === null ? '!border-accent !bg-accent !text-white' : 'hover:bg-canvas-subtle'}`}
        >
          全部
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
            className={`gh-label ${activeTag === tag ? '!border-accent !bg-accent !text-white' : 'hover:bg-canvas-subtle'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="gh-box">
          <div className="gh-box-body text-center text-sm text-fg-muted">该分类下暂无项目。</div>
        </div>
      ) : (
        <div className="gh-box">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

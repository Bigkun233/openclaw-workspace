// src/components/ProjectCard.tsx — GitHub 仓库列表行样式
import type { Project } from '../types'
import { Icon } from './Icon'

const statusDot: Record<Project['status'], string> = {
  已完成: 'bg-success',
  进行中: 'bg-accent',
  规划中: 'bg-fg-subtle',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="gh-row">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold">
          <Icon name="repo" className="mr-1.5 inline align-text-bottom text-fg-muted" />
          <span className="text-accent">{project.name}</span>
        </h3>
        <span className="gh-label flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${statusDot[project.status]}`} />
          {project.status}
        </span>
      </div>

      <p className="gh-desc">{project.description}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-fg-muted">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-fg-subtle">–</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="gh-meta">
        {project.tags.map((tag) => (
          <span key={tag} className="gh-label">
            {tag}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-4">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="gh-link inline-flex items-center gap-1">
              <Icon name="github" /> 源码
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="gh-link inline-flex items-center gap-1">
              <Icon name="external" /> 演示
            </a>
          )}
        </span>
      </div>
    </article>
  )
}

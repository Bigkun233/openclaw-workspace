// src/components/ProjectCard.tsx — 扁平列表条目，靠分隔线而非卡片描边
import type { Project } from '../types'
import { Icon } from './Icon'

const statusStyle: Record<Project['status'], string> = {
  已完成: 'text-emerald-700 dark:text-emerald-400',
  进行中: 'text-brand-600 dark:text-brand-400',
  规划中: 'text-ink-faint dark:text-night-soft',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border-t border-line py-7 first:border-t-0 first:pt-0 dark:border-night-line">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-xl text-ink dark:text-night-ink">
          {project.name}
        </h3>
        <span className={`shrink-0 text-xs ${statusStyle[project.status]}`}>{project.status}</span>
      </div>

      <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft dark:text-night-soft">
        {project.description}
      </p>

      {project.highlights.length > 0 && (
        <ul className="mt-3 space-y-1 text-[0.9rem] text-ink-soft dark:text-night-soft">
          {project.highlights.map((h) => (
            <li key={h} className="relative pl-4">
              <span className="absolute left-0 top-[0.7em] h-px w-2 bg-brand-500" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <span className="flex flex-wrap gap-2 font-mono text-ink-faint dark:text-night-soft">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
        <span className="flex gap-4">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-brand-600 dark:text-night-soft dark:hover:text-brand-400"
            >
              <Icon name="github" /> 源码
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-brand-600 dark:text-night-soft dark:hover:text-brand-400"
            >
              <Icon name="external" /> 演示
            </a>
          )}
        </span>
      </div>
    </article>
  )
}

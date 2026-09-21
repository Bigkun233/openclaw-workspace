// src/components/ProjectCard.tsx
import type { Project } from '../types'
import { Icon } from './Icon'

const statusStyle: Record<Project['status'], string> = {
  已完成: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  进行中: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  规划中: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.name}</h3>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[project.status]}`}>
          {project.status}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-brand-50 px-2 py-0.5 text-xs text-brand-700 dark:bg-slate-800 dark:text-brand-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.repo || project.demo) && (
        <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-500"
            >
              <Icon name="github" /> 源码
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-500"
            >
              <Icon name="external" /> 演示
            </a>
          )}
        </div>
      )}
    </article>
  )
}

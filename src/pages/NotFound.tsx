// src/pages/NotFound.tsx
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="text-6xl font-bold text-brand-600 dark:text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">页面走丢了</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">你访问的页面不存在，或者已经被移动。</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm text-white transition hover:bg-brand-700"
      >
        回到首页
      </Link>
    </div>
  )
}

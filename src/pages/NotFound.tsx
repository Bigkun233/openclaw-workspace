// src/pages/NotFound.tsx — 杂志风
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="py-24">
      <p className="font-mono text-sm text-ink-faint dark:text-night-soft">404</p>
      <h1 className="mt-4 text-3xl text-ink dark:text-night-ink">页面走丢了</h1>
      <p className="mt-3 text-ink-soft dark:text-night-soft">你访问的页面不存在，或者已经被移动。</p>
      <Link
        to="/"
        className="link-underline mt-6 inline-block text-sm text-brand-600 dark:text-brand-400"
      >
        ← 回到首页
      </Link>
    </div>
  )
}

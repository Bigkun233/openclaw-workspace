// src/pages/NotFound.tsx — GitHub 404 风格
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="font-mono text-5xl font-semibold text-fg-subtle">404</p>
      <h1 className="mt-4 text-xl font-semibold">页面走丢了</h1>
      <p className="mt-2 text-sm text-fg-muted">你访问的页面不存在，或者已经被移动。</p>
      <Link to="/" className="gh-btn gh-btn-primary mt-6">
        回到首页
      </Link>
    </div>
  )
}

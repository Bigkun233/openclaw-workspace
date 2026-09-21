// src/components/Layout.tsx
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { Icon } from './Icon'
import { ThemeToggle } from './ThemeToggle'

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end={to === '/'}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-brand-50 text-brand-600 dark:bg-slate-800 dark:text-brand-500'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // 路由切换时回到顶部（外部系统同步）
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm text-white">叶</span>
            {site.name}
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} />
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="打开菜单"
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-lg text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-slate-200 bg-white px-4 py-2 md:hidden dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-1 py-2">
              {site.nav.map((item) => (
                <NavItem key={item.path} to={item.path} label={item.label} onClick={() => setOpen(false)} />
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <div className="flex items-center gap-4">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition hover:text-brand-600 dark:hover:text-brand-500"
              >
                <Icon name={s.icon} className="text-base" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

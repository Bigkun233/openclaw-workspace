// src/components/Layout.tsx — GitHub 风格：深色顶栏 + 内容容器
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
        `rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
          isActive
            ? 'bg-white/15 text-white'
            : 'text-white/75 hover:bg-white/10 hover:text-white'
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

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-header">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Icon name="mark" className="text-2xl" />
            <span className="text-base font-semibold">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle variant="header" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="打开菜单"
              className="grid h-9 w-9 place-items-center rounded-md text-xl text-white/75 hover:bg-white/10 hover:text-white md:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-white/10 px-4 py-2 md:hidden">
            <div className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <NavItem key={item.path} to={item.path} label={item.label} onClick={() => setOpen(false)} />
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-bd py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 text-xs text-fg-subtle sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <div className="flex items-center gap-4">
            {site.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="gh-link">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

// src/components/ThemeToggle.tsx
import { Icon } from './Icon'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
      title={isDark ? '切换到浅色模式' : '切换到深色模式'}
      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-lg text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  )
}

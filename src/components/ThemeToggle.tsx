// src/components/ThemeToggle.tsx — 极简文字/图标切换
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
      className="grid h-9 w-9 place-items-center text-lg text-ink-soft transition-colors hover:text-brand-600 dark:text-night-soft dark:hover:text-brand-400"
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  )
}

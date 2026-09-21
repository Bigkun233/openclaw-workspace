// src/components/ThemeToggle.tsx
import { Icon } from './Icon'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle({ variant = 'default' }: { variant?: 'default' | 'header' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  const cls =
    variant === 'header'
      ? 'grid h-9 w-9 place-items-center rounded-md text-lg text-white/75 transition-colors hover:bg-white/10 hover:text-white'
      : 'gh-btn !px-2'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
      title={isDark ? '切换到浅色模式' : '切换到深色模式'}
      className={cls}
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  )
}

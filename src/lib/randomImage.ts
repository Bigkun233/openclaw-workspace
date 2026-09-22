// src/lib/randomImage.ts — 随机取图（尽量不与上一次重复）
export const BANNER_INDEX_KEY = 'personal-site:last-banner-index'

/**
 * 从 list 中随机取一个下标。
 * - list 为空 → 返回 -1
 * - 只有一张 → 返回 0
 * - 多张时，若与 lastIndex 相同则顺延一位，避免连续两次看到同一张
 */
export function pickRandomIndex(length: number, lastIndex: number | null): number {
  if (length <= 0) return -1
  if (length === 1) return 0
  const idx = Math.floor(Math.random() * length)
  if (lastIndex !== null && idx === lastIndex) return (idx + 1) % length
  return idx
}

/** 读取上一次的下标（拿不到或非法时返回 null） */
export function readLastIndex(): number | null {
  try {
    const raw = sessionStorage.getItem(BANNER_INDEX_KEY)
    if (raw === null) return null
    const n = Number.parseInt(raw, 10)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

/** 记录本次下标（隐私模式等场景静默失败） */
export function writeLastIndex(index: number): void {
  try {
    sessionStorage.setItem(BANNER_INDEX_KEY, String(index))
  } catch {
    /* ignore */
  }
}

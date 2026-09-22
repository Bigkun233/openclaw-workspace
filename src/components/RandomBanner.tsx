// src/components/RandomBanner.tsx — 首页随机横幅：每次进入 / 刷新随机显示一张
import { useEffect, useMemo, useState } from 'react'
import { bannerImages } from '../data/gallery'
import { pickRandomIndex, readLastIndex, writeLastIndex } from '../lib/randomImage'

export function RandomBanner() {
  // 只在挂载时算一次：避免组件重渲染时图片乱跳。
  // React StrictMode 下开发环境会执行两次，两次结果一致，不会闪烁。
  const index = useMemo(() => pickRandomIndex(bannerImages.length, readLastIndex()), [])

  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (index >= 0) writeLastIndex(index)
  }, [index])

  // 空态：没有配置任何图片时不渲染
  if (index < 0) return null

  return (
    <figure className="relative overflow-hidden rounded-lg border border-line bg-paper-2 dark:border-night-line dark:bg-night-2">
      {/* 加载中骨架 */}
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-paper-2 dark:bg-night-2" aria-hidden="true" />
      )}

      {failed ? (
        <div className="grid aspect-[16/9] place-items-center text-sm text-ink-faint dark:text-night-soft">
          图片加载失败
        </div>
      ) : (
        <img
          src={bannerImages[index]}
          alt="首页横幅"
          loading="eager"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`aspect-[16/9] w-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </figure>
  )
}

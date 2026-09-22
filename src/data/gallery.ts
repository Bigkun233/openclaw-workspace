// src/data/gallery.ts — 首页随机横幅图库
// 想换图/加图：把图片丢进 src/assets/gallery/，在这里 import 并加进 bannerImages 即可。
// 用 import 而非字符串路径，构建时 Vite 会做哈希指纹 + 打包，避免 404。
import banner1 from '../assets/gallery/banner-1.jpg'
import banner2 from '../assets/gallery/banner-2.jpg'
import banner3 from '../assets/gallery/banner-3.jpg'
import banner4 from '../assets/gallery/banner-4.jpg'
import banner5 from '../assets/gallery/banner-5.jpg'
import banner6 from '../assets/gallery/banner-6.jpg'

export const bannerImages: string[] = [banner1, banner2, banner3, banner4, banner5, banner6]

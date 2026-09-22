# scripts/gen-gallery.py — 生成首页随机横幅占位图（替换为真实照片即可）
# 用法: python3 scripts/gen-gallery.py
import math
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 900
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'gallery')

# (文件名, 标题, 起点色, 终点色)
ITEMS = [
    ('banner-1.jpg', '晨光',   (250, 248, 245), (227, 180, 131)),
    ('banner-2.jpg', '山海',   (232, 226, 215), (140, 150, 160)),
    ('banner-3.jpg', '夜色',   (34, 30, 25),    (185, 111, 44)),
    ('banner-4.jpg', '纸张',   (243, 239, 231), (196, 178, 152)),
    ('banner-5.jpg', '书页',   (245, 243, 238), (161, 130, 96)),
    ('banner-6.jpg', '远行',   (222, 216, 207), (125, 66, 26)),
]


def font(size):
    for p in (
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    ):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def gradient(a, b):
    img = Image.new('RGB', (W, H))
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        d.line([(0, y), (W, y)], fill=tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3)))
    return img


def main():
    os.makedirs(OUT, exist_ok=True)
    f_big = font(150)
    f_sub = font(46)
    for i, (name, title, c1, c2) in enumerate(ITEMS, 1):
        img = gradient(c1, c2)
        d = ImageDraw.Draw(img, 'RGBA')
        # 柔和的圆形装饰，制造留白感
        for k in range(3):
            cx = W * (0.18 + 0.32 * k)
            cy = H * (0.28 + 0.18 * (k % 2))
            r = 180 + 70 * k
            d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 255, 255, 40), width=3)
        # 文字
        dark = sum(c2) < 380
        fg = (245, 243, 238, 235) if dark else (43, 39, 35, 220)
        d.text((90, H - 300), f'{i:02d}', font=f_big, fill=fg)
        d.text((96, H - 130), title, font=f_sub, fill=fg)
        # 细线
        d.line([(96, H - 60), (W - 96, H - 60)], fill=fg, width=2)
        img.save(os.path.join(OUT, name), quality=88)
        print('generated', name)


if __name__ == '__main__':
    main()

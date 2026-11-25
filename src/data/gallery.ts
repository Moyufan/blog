/**
 * 相册配置
 *
 * 添加自己的照片：
 * 1. 把图片放进 public/gallery/ 目录
 * 2. 在下面加一项，width / height 填图片原始像素尺寸（灯箱需要）
 * 3. category 用于页面上的分类筛选按钮
 */
export interface Photo {
  src: string;
  title: string;
  caption: string;
  category: string;
  width: number;
  height: number;
}

export const photos: Photo[] = [
  {
    src: "/images/banner.webp",
    title: "夜桌全景",
    caption: "烛光、苹果与摊开的旧笔记本",
    category: "静物",
    width: 1536,
    height: 1024,
  },
  {
    src: "/gallery/scene-book.webp",
    title: "未写完的一页",
    caption: "皮革封面与泛黄的纸页",
    category: "静物",
    width: 836,
    height: 600,
  },
  {
    src: "/gallery/scene-candle.webp",
    title: "烛火",
    caption: "烟雾在暗处慢慢散开",
    category: "氛围",
    width: 416,
    height: 410,
  },
  {
    src: "/gallery/scene-apple.webp",
    title: "深红",
    caption: "桌角的一颗苹果",
    category: "静物",
    width: 320,
    height: 290,
  },
  {
    src: "/gallery/scene-feather.webp",
    title: "羽毛笔",
    caption: "落在笔记上的黑色羽毛",
    category: "氛围",
    width: 690,
    height: 410,
  },
  {
    src: "/gallery/scene-desk.webp",
    title: "木纹与红线",
    caption: "书签垂在桌沿",
    category: "氛围",
    width: 740,
    height: 490,
  },
  {
    src: "/gallery/portrait.webp",
    title: "执笔者",
    caption: "原创头像 · 暗黑笔记本风格",
    category: "人物",
    width: 600,
    height: 600,
  },
];

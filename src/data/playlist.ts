/**
 * 歌单配置
 *
 * 添加自己的歌曲：
 * 1. 把 mp3 文件放进 public/music/ 目录
 * 2. 在下面的列表里加一项，src 写 "/music/你的文件名.mp3"
 *
 * cover 留空时会使用默认的笔记本图标。
 */
export interface Track {
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

export const playlist: Track[] = [
  {
    title: "示例音 · 替换成你的歌",
    artist: "把 mp3 放进 public/music 后修改 src",
    src: "/music/sample-ambient.wav",
    cover: "/images/notebook.png",
  },
];

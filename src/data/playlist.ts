/**
 * 歌单配置（本地氛围曲 + R2 外链模式）
 *
 * 第一首是站内自带的原创暗黑氛围曲，打开页面自动播放（静音起播，
 * 首次点击页面任意位置后出声），音量默认较低。
 *
 * 使用步骤：
 * 1. 在 Cloudflare R2 建一个公开 bucket，把 local-music/ 里的文件上传
 * 2. 开启 bucket 的公开访问（r2.dev 子域或绑定自定义域名）
 * 3. 把下面的 R2_BASE 改成你的公开域名，例如 https://pub-xxxx.r2.dev/music
 * 4. 保存后重新构建部署即可
 *
 * 说明：
 * - R2_BASE 留空时播放器只有第一首氛围曲，不会出现一堆 404
 * - 文件名会自动做 URL 编码，中文和空格不用手动处理
 * - APE 格式浏览器不支持，未列入歌单；FLAC 在 Chrome/Edge 可播，Safari 可能不行
 */
const R2_BASE = "";

interface RawTrack {
  title: string;
  artist: string;
  file: string;
}

const RAW_TRACKS: RawTrack[] = [
  { title: "4 Real", artist: "Avril Lavigne", file: "Avril Lavigne-4 Real.mp3" },
  { title: "Alice (Extended Version)", artist: "Avril Lavigne", file: "Avril Lavigne-Alice (Extended Version).mp3" },
  { title: "Bad Reputation", artist: "Avril Lavigne", file: "Avril Lavigne-Bad Reputation.mp3" },
  { title: "Black Star", artist: "Avril Lavigne", file: "Avril Lavigne-Black Star.mp3" },
  { title: "Darlin'", artist: "Avril Lavigne", file: "Avril Lavigne-Darlin'.mp3" },
  { title: "Everybody Hurts", artist: "Avril Lavigne", file: "Avril Lavigne-Everybody Hurts.mp3" },
  { title: "Goodbye", artist: "Avril Lavigne", file: "Avril Lavigne-Goodbye.mp3" },
  { title: "I Love You", artist: "Avril Lavigne", file: "Avril Lavigne-I Love You.mp3" },
  { title: "Knockin' On Heaven's Door (Studio Version)", artist: "Avril Lavigne", file: "Avril Lavigne-Knockin' On Heaven's Door (Studio Version).mp3" },
  { title: "Not Enough", artist: "Avril Lavigne", file: "Avril Lavigne-Not Enough.mp3" },
  { title: "Push (Acoustic Version)", artist: "Avril Lavigne", file: "Avril Lavigne-Push (Acoustic Version).mp3" },
  { title: "Push", artist: "Avril Lavigne", file: "Avril Lavigne-Push.mp3" },
  { title: "Remember When", artist: "Avril Lavigne", file: "Avril Lavigne-Remember When.mp3" },
  { title: "Smile", artist: "Avril Lavigne", file: "Avril Lavigne-Smile.mp3" },
  { title: "Stop Standing There", artist: "Avril Lavigne", file: "Avril Lavigne-Stop Standing There.mp3" },
  { title: "What The Hell (Acoustic Version)", artist: "Avril Lavigne", file: "Avril Lavigne-What The Hell (Acoustic Version).mp3" },
  { title: "What The Hell", artist: "Avril Lavigne", file: "Avril Lavigne-What The Hell.mp3" },
  { title: "Wish You Were Here (Acoustic Version)", artist: "Avril Lavigne", file: "Avril Lavigne-Wish You Were Here (Acoustic Version).mp3" },
  { title: "Wish You Were Here", artist: "Avril Lavigne", file: "Avril Lavigne-Wish You Were Here.mp3" },
  { title: "don`t tell me", artist: "Avril Lavigne", file: "avril lavigne - don`t tell me - 艾薇儿.mp3" },
  { title: "fall to pieces - 艾薇儿 mvp", artist: "Avril Lavigne", file: "avril lavigne - fall to pieces - 艾薇儿 mvp.mp3" },
  { title: "falling down", artist: "Avril Lavigne", file: "avril lavigne - falling down.mp3" },
  { title: "falling into history", artist: "Avril Lavigne", file: "avril lavigne - falling into history.mp3" },
  { title: "fuel - 艾薇儿 极速青春 live", artist: "Avril Lavigne", file: "avril lavigne - fuel - 艾薇儿 极速青春 live.mp3" },
  { title: "get over it", artist: "Avril Lavigne", file: "avril lavigne - get over it - 艾薇儿.mp3" },
  { title: "headset", artist: "Avril Lavigne", file: "avril lavigne - headset.mp3" },
  { title: "how does it feel", artist: "Avril Lavigne", file: "avril lavigne - how does it feel - 艾薇儿.mp3" },
  { title: "i don't give a damn", artist: "Avril Lavigne", file: "avril lavigne - i don't give a damn - 艾薇儿.mp3" },
  { title: "i'm with you", artist: "Avril Lavigne", file: "avril lavigne - i'm with you.mp3" },
  { title: "imagine", artist: "Avril Lavigne", file: "avril lavigne - imagine.mp3" },
  { title: "let go", artist: "Avril Lavigne", file: "avril lavigne - let go.mp3" },
  { title: "make up", artist: "Avril Lavigne", file: "avril lavigne - make up.mp3" },
  { title: "my happy ending - 艾薇儿 mvp", artist: "Avril Lavigne", file: "avril lavigne - my happy ending - 艾薇儿 mvp.mp3" },
  { title: "my world - 艾薇儿我的小小世界", artist: "Avril Lavigne", file: "avril lavigne - my world - 艾薇儿我的小小世界.mp3" },
  { title: "naked - 艾薇儿 赤裸裸", artist: "Avril Lavigne", file: "avril lavigne - naked - 艾薇儿 赤裸裸.mp3" },
  { title: "slipped away", artist: "Avril Lavigne", file: "avril lavigne - slipped away.mp3" },
  { title: "take it", artist: "Avril Lavigne", file: "avril lavigne - take it - 艾薇儿.mp3" },
  { title: "temple of life", artist: "Avril Lavigne", file: "avril lavigne - temple of life.mp3" },
  { title: "the colour of the night", artist: "Avril Lavigne", file: "avril lavigne - the colour of the night.mp3" },
  { title: "think about it", artist: "Avril Lavigne", file: "avril lavigne - think about it.mp3" },
  { title: "tomorrow you didn't", artist: "Avril Lavigne", file: "avril lavigne - tomorrow you didn't - 艾薇儿.mp3" },
  { title: "two rivers - bandaids", artist: "Avril Lavigne", file: "avril lavigne - two rivers - bandaids.mp3" },
  { title: "who knows - 爆发力超强的", artist: "Avril Lavigne", file: "avril lavigne - who knows - 爆发力超强的.mp3" },
  { title: "why", artist: "Avril Lavigne", file: "avril lavigne - why - 艾微儿.mp3" },
  { title: "动机", artist: "Avril Lavigne", file: "avril lavigne - 动机.mp3" },
  { title: "敲天堂之门", artist: "Avril Lavigne", file: "avril lavigne - 敲天堂之门.mp3" },
  { title: "艾薇儿 - not the only one", artist: "Avril Lavigne", file: "avril lavigne - 艾薇儿 - not the only one.mp3" },
  { title: "、stay - be the one", artist: "Avril Lavigne", file: "avril lavigne、stay - be the one.mp3" },
  { title: "分 裂", artist: "周杰伦", file: "周杰伦 - 分 裂.flac" },
  { title: "半 兽 人", artist: "周杰伦", file: "周杰伦 - 半 兽 人.flac" },
  { title: "半 岛铁 盒", artist: "周杰伦", file: "周杰伦 - 半 岛铁 盒.flac" },
  { title: "回到 过 去", artist: "周杰伦", file: "周杰伦 - 回到 过 去.flac" },
  { title: "暗 号", artist: "周杰伦", file: "周杰伦 - 暗 号.flac" },
  { title: "最后 的 战 役", artist: "周杰伦", file: "周杰伦 - 最后 的 战 役 .flac" },
  { title: "火车 叨 位 去", artist: "周杰伦", file: "周杰伦 - 火车 叨 位 去.flac" },
  { title: "爷 爷泡 的 茶", artist: "周杰伦", file: "周杰伦 - 爷 爷泡 的 茶.flac" },
  { title: "米兰 的小 铁 匠", artist: "周杰伦", file: "周杰伦 - 米兰 的小 铁 匠.flac" },
  { title: "龙 拳", artist: "周杰伦", file: "周杰伦 - 龙 拳.flac" }
];

export interface Track {
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

const externalTracks: Track[] = R2_BASE
  ? RAW_TRACKS.map((track) => ({
      title: track.title,
      artist: track.artist,
      src: `${R2_BASE.replace(/\/$/, "")}/${encodeURIComponent(track.file)}`,
      cover: "/images/notebook.png",
    }))
  : [];

export const playlist: Track[] = [
  // 站内自带的原创氛围曲（非任何作品原声），打开页面自动播放
  {
    title: "暗黑笔记 · 氛围曲（原创）",
    artist: "Death Note 风格 · 自动播放",
    src: "/music/dark-notebook-ambient.wav",
    cover: "/images/notebook.png",
  },
  ...externalTracks,
];

音乐文件已改为 Cloudflare R2 外链模式。

本地原始音频保存在项目根目录的 local-music/（已加入 .gitignore，不会进仓库，
也不会被 Astro 复制进 dist）。

部署步骤：
1. 登录 Cloudflare Dashboard -> R2 -> Create bucket，例如 blog-music
2. 把 local-music/ 里的文件全部上传到该 bucket
3. 开启公开访问：bucket -> Settings -> Public access -> Allow Access
   （会得到一个类似 https://pub-xxxx.r2.dev 的地址）
4. 打开 src/data/playlist.ts，把 R2_BASE 改成你的公开地址，例如：
     const R2_BASE = "https://pub-xxxx.r2.dev/music";
   如果文件直接上传到 bucket 根目录，就写 "https://pub-xxxx.r2.dev"
5. 重新构建部署

注意：
- dark-notebook-ambient.wav 是站内自带的原创暗黑氛围曲（非任何作品原声），
  打开页面自动静音起播，首次点击页面任意位置后出声，默认音量 25%。
  想换成真正的主题曲，把你拥有授权的文件放进本目录，并改 src/data/playlist.ts
  第一项的 src 和 title 即可。
- R2_BASE 留空时播放器只有这首氛围曲，不会出现一堆 404
- 文件名里的空格和中文会自动 URL 编码，不用手动改
- APE 浏览器不支持，未列入歌单
- FLAC 在 Chrome/Edge 可播，Safari 可能不行；想兼容所有浏览器就转成 mp3
- 这些是商业唱片，公开放到网上有版权风险，请自行确认授权情况

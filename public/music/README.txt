本地音乐目录说明
================

把 mp3 / wav / m4a / ogg / flac 直接放进本目录即可。
播放器在构建时会自动扫描这个目录，无需修改任何代码。

歌名和歌手从文件名解析，推荐格式：
    歌手 - 歌名.mp3
例如「南拳妈妈 - 牡丹江.mp3」会显示为：歌手「南拳妈妈」，歌名「牡丹江」。
没有 " - " 分隔的文件名会整段作为歌名，歌手显示为「本地音乐」。

浏览器限制：
- 打开页面会自动静音起播，首次点击页面任意位置后出声，默认音量 25%
- APE 浏览器不支持，不要放进这里
- FLAC 在 Chrome/Edge 可播，Safari 可能不行；想兼容所有浏览器就用 mp3
- Cloudflare Pages 单个静态文件上限 25MiB，超过会导致部署失败

可选：Cloudflare R2 外链
========================
项目根目录的 local-music/ 里还有一批音频（已加入 .gitignore，不进仓库、
不进 dist）。如果想把它们也加入歌单：
1. Cloudflare Dashboard -> R2 -> Create bucket，例如 blog-music
2. 上传 local-music/ 里的文件
3. Settings -> Public access -> Allow Access，拿到类似 https://pub-xxxx.r2.dev 的地址
4. 打开 src/data/playlist.ts，把 R2_BASE 改成该地址
5. 重新构建部署

注意：
- 文件名里的空格和中文会自动 URL 编码，不用手动改
- 这些是商业唱片，公开放到网上有版权风险，请自行确认授权情况

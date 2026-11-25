---
title: "博客使用说明：写文章、发照片和换音乐"
description: "从思源笔记转到这个 Astro 博客后，如何写文章、发照片、换音乐，并推送到线上。"
pubDate: "2026-11-25"
updatedDate: "2026-11-25"
tags: ["博客", "使用说明", "Astro"]
categories: ["教程"]
cover: "/images/banner.webp"
---

> 站点：<https://moyuyf.cn>  
> 源码目录：`D:\blog`  
> GitHub：<https://github.com/Moyufan/blog>

这份说明按“我以前用思源笔记，现在怎么发文章和照片”的思路写。你不需要懂 Astro，照着做就行。

---

## 先理解：它和思源笔记有什么不一样

| 思源笔记里 | 这个博客里 |
| --- | --- |
| 打开软件，在编辑器里直接写 | 用 VS Code / 记事本编辑一个 `.md` 文件 |
| 内容存在笔记工作库里 | 内容就是项目里的普通文本文件 |
| 点“发布”或同步 | `git push` 到 GitHub，Cloudflare Pages 自动重建网站 |
| 图片拖进笔记自动管理 | 图片要手动放进 `public/`，再在文章里写路径 |
| 一篇文档就是一个块结构 | 一个 `.md` / `.mdx` 文件就是一篇文章 |

一句话：**写文章 = 新建 Markdown 文件；发布 = 推送到 GitHub；Cloudflare 自动帮你生成网站。**  
不要直接改 `dist` 目录，那是自动生成的成品，每次构建都会被覆盖。

---

## 1. 写文章

### 1.1 新建文章文件

进入：

```text
D:\blog\src\content\blog\
```

新建一个文件，例如：

```text
my-new-post.md
```

命名建议：

- 用英文小写、数字和连字符，例如 `summer-dusk-notes.md`
- 不要用中文、空格和特殊符号
- 文件名的开头不要加下划线 `_`，加了下划线会被当成草稿，不发布

文章地址就是：

```text
https://moyuyf.cn/blog/my-new-post
```

也就是 `/blog/文件名（不带 .md）`。

### 1.2 复制这个模板

把下面内容粘贴到新文件里，再改标题和正文：

````markdown
---
title: "文章标题"
description: "一句话摘要，会显示在列表和分享卡片里"
pubDate: "2026-11-25"
updatedDate: "2026-11-25"
tags: ["随笔", "二次元"]
categories: ["日常"]
cover: "/images/banner.webp"
---

这里是正文。

## 小标题

正常写 Markdown 就行：

- **加粗**
- *斜体*
- [链接](https://example.com)
- `行内代码`

代码块：

```js
console.log("Hello, Moyu's Blog");
```

图片：

![图片说明](/images/posts/my-photo.webp)
````

> 注意：最上面两条 `---` 之间的内容是文章的“身份证”，不能删。`title`、`description`、`pubDate` 是必填项。

### 1.3 常用字段说明

| 字段 | 必填 | 作用 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `description` | 是 | 摘要，首页和搜索里会用到 |
| `pubDate` | 是 | 发布日期，也决定首页排序 |
| `updatedDate` | 否 | 最后修改日期 |
| `tags` | 否 | 标签，会生成标签页 |
| `categories` | 否 | 分类，会生成分类页 |
| `cover` | 否 | 文章封面，图片放 `public/images/` 或 `public/works/`，填 `/images/xxx.webp`；会显示在首页卡片、文章页顶部横幅和微信/微博分享图里，不填用默认横幅 |
| `comment` | 否 | 是否显示评论区，当前评论系统未开启 |
| `toc` | 否 | 是否显示文章目录 |
| `sponsor` | 否 | 单篇打赏开关；默认显示，填 `false` 关闭 |

日期建议写成 `"2026-11-25"` 这种格式，并保留英文引号。

封面推荐用 1200×630 左右的横图，转成 webp 放到 `public/images/`（或 `public/works/`），然后在 frontmatter 里写绝对路径，例如：

```yaml
cover: "/works/health-dashboard.webp"
```

保存后重新构建，首页卡片、文章页顶部横幅、社交分享预览图会一起换掉。

### 1.4 在文章里插入图片

1. 把图片放到：

   ```text
   D:\blog\public\images\posts\
   ```

   没有 `posts` 文件夹就自己建一个。

2. 在文章里写：

   ```markdown
   ![图片说明](/images/posts/my-photo.webp)
   ```

   规律是：`public/images/posts/my-photo.webp` 对应网址 `/images/posts/my-photo.webp`。

3. 图片建议用 `.webp` 或 `.jpg`，文件名用英文小写和连字符。

文章里的图片点击后会自动放大查看。

### 1.5 从思源笔记搬文章过来

如果你以前是用思源写的：

1. 在思源里导出为 **Markdown**，并勾选导出资源/图片
2. 把导出的 `.md` 放进 `src/content/blog/`
3. 把导出的图片放进 `public/images/posts/`
4. 把文章里的 `![](assets/xxx.png)` 改成 `![](/images/posts/xxx.png)`
5. 按上面的模板补上开头那一段 `---` 配置

思源不会自动帮你做这些，需要手动改一次路径。

### 1.6 本地预览

在项目目录 `D:\blog` 打开终端，运行：

```bash
pnpm dev
```

然后浏览器打开：

```text
http://localhost:4321
```

改文件后页面会自动刷新。确认没问题后再发布。

---

## 2. 发布文章

本地看好了，就可以发布到线上。

在项目目录执行：

```bash
git add .
git commit -m "新增文章：文章标题"
git push
```

也可以用 GitHub Desktop 图形界面：勾选改动 → 写说明 → Commit → Push。

推送成功后：

1. 打开 <https://github.com/Moyufan/blog> 确认文件已经更新
2. 打开 Cloudflare Pages → 项目 `blog` → Deployments，等 1～2 分钟构建完成
3. 打开 <https://moyuyf.cn> 看新文章

如果线上没变化：先看 GitHub 文件有没有更新，再看 Cloudflare 构建是不是成功，最后按 `Ctrl + F5` 强制刷新浏览器。

---

## 3. 发布照片

照片有两种发法，别搞混：

- 想在“相册”页面展示 → 用第 3.1 节
- 想在某篇文章里插图 → 用第 1.4 节

### 3.1 发到“相册”页面

第一步，把图片放进：

```text
D:\blog\public\gallery\
```

第二步，打开：

```text
D:\blog\src\data\gallery.ts
```

在 `photos` 数组里加一项：

```ts
{
  src: "/gallery/my-trip.webp",
  title: "我的照片标题",
  caption: "一句话说明，比如：某个傍晚的街角",
  category: "日常",
  width: 1600,
  height: 900,
},
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `src` | 图片路径，`public/gallery/xxx.webp` 对应 `/gallery/xxx.webp` |
| `title` | 照片标题 |
| `caption` | 照片下面的小字说明 |
| `category` | 分类。写什么就自动多一个筛选按钮，比如“日常”“风景” |
| `width` | 图片原始宽度（像素） |
| `height` | 图片原始高度（像素） |

宽高怎么看：在 Windows 里右键图片 → 属性 → 详细信息，能看到“宽度”和“高度”。宽高填错不影响显示，但点击放大时比例可能不对。

第三步，按第 2 节的方法 `git push` 发布。

相册地址：<https://moyuyf.cn/gallery>

### 3.2 删除照片

- 从 `public/gallery/` 删掉图片文件
- 从 `src/data/gallery.ts` 删掉对应的那一段
- 推送即可

---

## 4. 换背景音乐

音乐播放器在页面右下角，会自动扫描 `public/music` 目录，**不需要改代码**。

直接把 `.mp3` 放进：

```text
D:\blog\public\music\
```

推荐文件名格式：

```text
歌手 - 歌名.mp3
```

例如 `南拳妈妈 - 牡丹江.mp3`，播放器会显示歌手“南拳妈妈”、歌名“牡丹江”。

注意：

- 支持 `mp3`、`m4a`、`ogg`、`wav`、`flac`；最稳的是 `mp3`
- 不支持 `ape`
- Cloudflare Pages 单个文件上限是 **25MiB**，超了会部署失败
- 浏览器限制不能自动出声，所以页面打开后是静音起播；你第一次点击页面任意位置后才会出声，默认音量 25%

推送后新歌就会出现。

---

## 5. 改站点名称和菜单（偶尔用）

站点信息在：

```text
D:\blog\src\config.ts
```

常见修改：

| 想改什么 | 改哪里 |
| --- | --- |
| 站点标题、副标题、描述 | `site.title` / `site.subtitle` / `site.description` |
| 头像 | `sidebar.avatar`，对应 `public/images/avatar.webp` |
| 顶部横幅 | `banner` 和 `banner_srcset` |
| 导航菜单 | `menu`，目前是首页、归档、相册、关于 |
| 社交链接 | `social` |
| 打赏收款码 | 替换 `public/sponsor/wechat.png` / `alipay.png`，开关在 `sponsor.enable` |
| 关于页面正文 | `src/pages/about.mdx` |

菜单显示的名字来自语言文件，比如中文在：

```text
D:\blog\src\languages\zh-cn.ts
```

如果你新增菜单项但没在语言文件里加名字，页面上会显示一个奇怪的键名。

---

## 6. 常见问题

**Q：新文章没出现？**  
检查：文件名是不是以 `_` 开头；`title` / `description` / `pubDate` 有没有写；Cloudflare 构建是否成功。

**Q：文章排序不对？**  
首页按 `pubDate` 排，不按文件名。把日期改成你想显示的日期。

**Q：图片裂了？**  
检查路径是不是 `/images/...` 或 `/gallery/...`；`public` 里的路径前面不要再加 `public`。文件名大小写要完全一致。

**Q：相册灯箱点开放大比例不对？**  
`src/data/gallery.ts` 里那张图的 `width` / `height` 填错了，改成原始像素尺寸。

**Q：音乐没出现？**  
确认文件直接在 `public/music/` 里，格式受支持，并且单首不超过 25MiB。

**Q：线上还是旧的？**  
按这个顺序查：GitHub 文件更新了吗 → Cloudflare Deployments 成功了吗 → 浏览器强刷了吗。

---

## 7. 最短发布清单

每次发文章或照片，记住这套就行：

```text
1. 改文件：src/content/blog/ 或 public/gallery/ 或 public/music/
2. 本地看一眼：pnpm dev
3. 发布：git add . && git commit -m "说明" && git push
4. 等 Cloudflare 自动构建
5. 打开 moyuyf.cn 检查
```

不要改 `dist`，不要手动进 Cloudflare 点发布。推送即发布。

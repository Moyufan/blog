---
title: "用 Astro + Cloudflare Pages 搭建个人博客并绑定域名"
description: "记录今天从选主题、改版、加功能到部署上线，并把 moyuyf.cn 指到博客的完整过程和踩坑。"
pubDate: "2026-11-25"
updatedDate: "2026-11-25"
tags: ["Astro", "Cloudflare", "建站记录"]
categories: ["折腾记录"]
cover: "/images/banner.webp"
---

今天做了一件一直想做但没动手的事：把自己的个人博客搭起来了。  
最终结果是：源码放在 GitHub，站点由 Cloudflare Pages 自动构建，域名用 `moyuyf.cn`，主题是原创的暗黑笔记本风格，还加了相册和全站音乐播放器。

这篇记录一下整个过程，方便以后复盘，也顺便给想做同样事情的人一个参考。

---

## 一、选型：为什么是这套组合

一开始定的目标很简单：

1. 写文章要像写笔记一样舒服，最好支持 Markdown；
2. 不想自己维护服务器；
3. 代码放在 GitHub，以后换电脑也能继续写；
4. 用自己的域名 `moyuyf.cn`；
5. 主题要能改，不要一眼看就是默认模板。

最后选了：

| 部分 | 选择 |
| --- | --- |
| 静态站点框架 | Astro |
| 主题 | Astro Theme Reimu |
| 代码托管 | GitHub：`Moyufan/blog` |
| 部署平台 | Cloudflare Pages |
| 域名 | `moyuyf.cn` |
| 本地目录 | `D:\blog` |

Astro 的好处是默认输出静态文件，部署到 Pages 很省事；文章内容就是 `src/content/blog/` 里的 Markdown 文件，迁移和备份都简单。

---

## 二、先把项目跑起来

最开始按主题文档初始化项目，安装依赖后本地能跑，但配置里还有几处是示例内容。

主要改了这些：

1. `astro.config.mjs` 里的 `site` 从 `https://example.com` 改成 `https://moyuyf.cn`；
2. `src/config.ts` 改回主题真实读取的结构，补上站点标题、副标题、头像、菜单；
3. `src/content.config.ts` 去掉一个不存在的包引用，恢复成 Astro 官方的 Content Collections 写法；
4. 补 `public/robots.txt` 和 sitemap；
5. `src/pages/about.mdx` 换成自己的介绍；
6. `.github/workflows/build.yml` 固定 Node 22 和 pnpm 9.6.0，避免线上环境飘。

后来把整个项目从工作区移到 `D:\blog`。跨盘移动后 pnpm 的软链接断掉了，本地报过一次：

```text
Cannot find module D:\blog\node_modules\astro\astro.js
```

解决办法是重新装依赖、修好 `node_modules` 里的链接。这个问题不是代码问题，是 pnpm 跨盘移动后的典型坑。

---

## 三、主题改成暗黑笔记本风格

原主题是偏粉色/红色的二次元风格，我不太想要默认感，所以做了一套原创的暗黑笔记本氛围：

- 重新生成横幅、头像、透明笔记本图标和 favicon；
- 把加载动画、回到顶部、页脚里的原主题图案换成笔记本图标；
- 配色从红色系改成黑白灰；
- 变量里保留了 `--red-*` 的名字以兼容旧组件，但值全部换成中性灰；
- 暗色模式下图片稍微去色，让整体更统一。

整个过程刻意避开了任何原作角色和 Logo，只保留“夜桌、笔记本、烛光、羽毛笔”这类原创氛围元素。

---

## 四、加功能：相册和音乐播放器

### 相册

相册页在 `/gallery`，实现思路是：

- 图片放进 `public/gallery/`；
- 在 `src/data/gallery.ts` 里登记标题、说明、分类和原始宽高；
- 页面用 PhotoSwipe 做点击放大；
- 分类按钮根据数据里的 `category` 自动生成。

这样以后发照片不用改页面代码，只要加图片和一条数据。

### 音乐播放器

全站右下角加了一个悬浮播放器：

- 打开页面自动静音起播；
- 第一次点击页面任意位置后解除静音；
- 默认音量 25%，不会突然吓人一跳；
- 切页时播放器保持状态，不会每页重新加载；
- 构建时自动扫描 `public/music/`，把里面的音频加入歌单；
- 文件名按 `歌手 - 歌名.mp3` 解析。

中途试过 Cloudflare R2 外链方案，但最后还是改回本地静态文件：对我来说直接把歌丢进 `public/music` 更简单。

这里踩到一个硬限制：**Cloudflare Pages 单个静态文件上限是 25MiB**。有些无损格式和 APE 文件会超，而且 APE 浏览器本来也不支持，所以最后留下的是体积合适的 mp3。

---

## 五、部署：GitHub + Cloudflare Pages

部署流程本身不复杂：

1. GitHub 新建仓库 `Moyufan/blog`；
2. 本地代码推送到 `main` 分支；
3. Cloudflare Pages 连接这个仓库；
4. 构建命令用 `pnpm build`，输出目录 `dist`；
5. 之后每次 `git push`，Cloudflare 自动重新构建。

实际推送时网络不太稳，遇到过：

```text
schannel handshake failed
CONNECT tunnel failed, response 502
```

后来改用 GitHub API 提交文件才把几次改动推上去。还有一次因为 Windows 的 `core.autocrlf=true`，本地和远端同样的内容算出了不同 SHA，本地显示 ahead，但远端内容是对的，不影响线上构建。

本机构建还遇到字体拆分包 `cn-font-split` 缺原生 DLL 的问题。本地验证时临时绕过了字体插件，Cloudflare 那边环境正常，线上构建一直是成功的。

---

## 六、绑定 moyuyf.cn 域名

域名是在腾讯云买的，目标是交给 Cloudflare 托管并绑定到 Pages。

步骤大致如下：

1. 在 Cloudflare 添加站点 `moyuyf.cn`；
2. Cloudflare 给出两个 NS 地址：

   ```text
   miguel.ns.cloudflare.com
   selah.ns.cloudflare.com
   ```

3. 到腾讯云域名管理页，把 DNS 服务器改成这两个地址；
4. 等 NS 生效，确认 `moyuyf.cn` 的权威 DNS 已经由 Cloudflare 接管；
5. 在 Cloudflare Pages 项目里进入 **Custom domains**，添加 `moyuyf.cn`；
6. 如果想让 `www.moyuyf.cn` 也能访问，再单独加一条 `www` 的记录。

中间有一次以为“Cloudflare 不更新”，后来排查发现 Pages 其实已经成功部署了，真正的问题是 Cloudflare DNS 里还没有 `moyuyf.cn` 的记录，所以自定义域名打不开。

判断顺序应该是：

```text
GitHub 文件更新了吗
→ Cloudflare Deployments 构建成功了吗
→ DNS 有对应记录了吗
→ 浏览器是不是缓存了旧页面
```

不要一上来就怀疑构建没跑。

---

## 七、最终成果

现在的状态：

- 站点：<https://moyuyf.cn>
- 兜底域名：`blog-907.pages.dev`
- 源码：<https://github.com/Moyufan/blog>
- 相册：`/gallery`
- 音乐：右下角悬浮播放器
- 文章：放在 `src/content/blog/`，Markdown 或 MDX 都可以
- 发布方式：`git push` 后 Cloudflare 自动部署

我还专门写了一篇《博客使用说明：写文章、发照片和换音乐》，以后要发东西照着那篇操作就行。

---

## 八、这次的几个经验

1. **静态博客的核心不是框架，是工作流。** 文章是文件，发布是 push，这个习惯建立起来之后就很简单。
2. **图片和附件要提前规划目录。** `public/images`、`public/gallery`、`public/music` 分开放，后面不会乱。
3. **Cloudflare Pages 的 25MiB 单文件限制要记住。** 大音频、大图都会让部署失败。
4. **域名问题和构建问题要分开查。** DNS 没记录时，页面再怎么构建成功也打不开。
5. **不要直接改 `dist`。** 那是产物，每次构建都会覆盖。
6. **主题可以大改，但先保证默认配置能跑。** 一开始配置结构写错，比改样式更麻烦。

整体来说，这套组合挺适合个人博客：写起来是 Markdown，托管不用花钱，域名和部署都在一个面板里，后续想加功能也有足够自由度。

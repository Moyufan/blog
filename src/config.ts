import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  title: "Moyu's Blog",
  subtitle: "二次元随笔 | 番剧与随笔",
  description: "Moyu 的个人博客，二次元、随笔、杂记",
  author: "Moyu",
  avatar: "/avatar.png",
  site: "https://moyuyf.cn",
  ogImage: "/og.png",
  lightbox: true,
  comment: {
    provider: "giscus",
    giscus: {
      repo: "Moyufan/blog",
      repoId: "",
      category: "Announcements",
      categoryId: "",
      mapping: "pathname",
      strict: false,
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: "bottom",
      theme: "preferred_color_scheme",
      lang: "zh-CN",
    },
  },
  search: {
    provider: "pagefind",
  },
  favicon: "/favicon.ico",
};

export const menuLinks = [
  { name: "首页", path: "/" },
  { name: "文章", path: "/posts" },
  { name: "相册", path: "/gallery" },
  { name: "说说", path: "/tweets" },
  { name: "友链", path: "/friends" },
  { name: "关于", path: "/about" },
];

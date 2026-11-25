export default {
  site: {
    title: "Moyu's Blog",
    subtitle: "暗黑笔记 | 二次元随笔",
    description: "Moyu 的个人博客，暗黑笔记本风格，二次元、随笔、杂记",
    keywords: "Moyu, 二次元, 博客, 番剧, 随笔",
    author: "Moyu",
    language: "zh-CN",
  },

  sidebar: {
    avatar: "/images/avatar.webp",
    position: "right",
  },

  widgets: ["recent_posts", "category", "tag", "tagcloud"],

  // 菜单名必须是 src/languages/*.ts 中存在的翻译键
  menu: [
    { name: "home", url: "/" },
    { name: "archives", url: "/archives" },
    { name: "gallery", url: "/gallery" },
    { name: "about", url: "/about" },
  ],

  banner: "/images/banner.webp",
  banner_srcset: {
    enable: true,
    srcset: [
      { src: "/images/banner-600w.webp", media: "(max-width: 479px)" },
      { src: "/images/banner-800w.webp", media: "(max-width: 799px)" },
      { src: "/images/banner.webp", media: "(min-width: 800px)" },
    ],
  },

  footer: {
    since: 2026,
    powered: true,
    count: true,
    busuanzi: true,
    icp: {
      icpnumber: "",
      beian: "",
      recordcode: "",
    },
    moe_icp: {
      icpnumber: "",
    },
  },

  analytics: {
    baidu_analytics: false,
    google_analytics: false,
    clarity: false,
  },

  social: {
    // email: "mailto:you@example.com",
    github: "https://github.com/Moyufan",
    // bilibili: "https://space.bilibili.com/yourname",
  },

  valine: {
    enable: false,
    appId: "",
    appKey: "",
    pageSize: 10,
    avatar: "mp",
    lang: "zh-cn",
    placeholder: "Just go go",
    guest_info: "nick,mail,link",
    recordIP: true,
    highlight: true,
    visitor: false,
    serverURLs: "",
  },

  waline: {
    enable: false,
    serverURL: "",
    lang: "zh-CN",
    locale: {},
    emoji: [
      "https://unpkg.com/@waline/emojis@1.2.0/weibo",
      "https://unpkg.com/@waline/emojis@1.2.0/alus",
      "https://unpkg.com/@waline/emojis@1.2.0/bilibili",
      "https://unpkg.com/@waline/emojis@1.2.0/qq",
      "https://unpkg.com/@waline/emojis@1.2.0/tieba",
      "https://unpkg.com/@waline/emojis@1.2.0/tw-emoji",
    ],
    meta: ["nick", "mail", "link"],
    requiredMeta: ["nick", "mail"],
    wordLimit: 0,
    pageSize: 10,
    pageview: true,
  },

  gitalk: {
    enable: false,
    clientID: "",
    clientSecret: "",
    repo: "",
    owner: "",
    admin: [],
  },

  // 启用前需先在 GitHub 打开 Discussions、安装 giscus app，
  // 再去 https://giscus.app 取得 repoId / categoryId 后把 enable 改为 true。
  giscus: {
    enable: false,
    repo: "Moyufan/blog",
    repoId: "",
    category: "Announcements",
    categoryId: "",
    mapping: "pathname",
    strict: 0,
    reactionsEnabled: 1,
    emitMetadata: 0,
    inputPosition: "bottom",
  },

  utterances: {
    enable: false,
    repo: "Moyufan/blog",
    issue_term: "pathname",
    theme: "preferred-color-scheme",
  },

  twikoo: {
    enable: false,
    envId: "",
    region: "",
  },

  disqus: {
    enable: false,
    shortname: "",
    count: true,
  },

  friend: [],

  copyright: {
    enable: true,
    content: {
      author: true,
      link: true,
      title: true,
      date: false,
      updated: false,
      license: true,
      license_type: "by-nc-sa",
    },
  },

  preloader: {
    enable: true,
    text: "正在书写笔记...",
    rotate: true,
  },

  firework: {
    enable: true,
    disable_on_mobile: false,
    options: {
      excludeElements: ["a", "button"],
      particles: [
        {
          shape: "circle",
          move: ["emit"],
          easing: "easeOutExpo",
          colors: [
            "var(--red-1)",
            "var(--red-2)",
            "var(--red-3)",
            "var(--red-4)",
          ],
          number: 20,
          duration: [1200, 1800],
          shapeOptions: {
            radius: [16, 32],
            alpha: [0.3, 0.5],
          },
        },
        {
          shape: "circle",
          move: ["diffuse"],
          easing: "easeOutExpo",
          colors: ["var(--red-0)"],
          number: 1,
          duration: [1200, 1800],
          shapeOptions: {
            radius: 20,
            alpha: [0.2, 0.5],
            lineWidth: 6,
          },
        },
      ],
    },
  },

  home_categories: {
    enable: false,
    content: [{ categories: "" }],
  },

  triangle_badge: {
    enable: false,
    type: "github",
    link: "https://github.com/Moyufan/blog",
  },

  outdate: {
    enable: false,
    daysAgo: 180,
  },

  share: ["weibo", "twitter", "facebook", "linkedin", "reddit", "qq", "weixin"],

  sponsor: {
    enable: false,
    qr: [],
  },
};

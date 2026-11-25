/**
 * 作品集配置
 *
 * 添加一个作品：
 * 1. 把封面图放进 public/works/（推荐 webp，宽度 1200px 左右即可）
 * 2. 在下面数组里加一项，id 用英文小写加连字符（例如 my-tool）
 * 3. preview 填在线预览 / 试玩 / Demo 的完整网址（http 开头），没有就不填
 * 4. links 里填下载、源码、演示或文章链接；没有就留空数组
 * 5. status 常用值：开发中 / 已发布 / 持续更新 / 内部使用
 */
export interface WorkLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface Work {
  id: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  category: string;
  status: string;
  stack: string[];
  updated: string;
  /** 在线预览地址；填了之后封面可点击，并显示「在线预览」入口 */
  preview?: string;
  links: WorkLink[];
}

export const works: Work[] = [
  {
    id: "summerdusk",
    name: "SummerDusk",
    tagline: "一部关于夏末与黄昏的视觉小说",
    description:
      "水彩厚涂风格的角色立绘与落日橙色调背景，用 Ren'Py 搭建 branching 叙事。资源管线是 Krea2 img2img 加角色 LoRA，背景早期由 Blender 渲染。",
    cover: "/works/summerdusk.webp",
    category: "游戏",
    status: "开发中",
    stack: ["Ren'Py", "Krea2", "LoRA", "Blender"],
    updated: "2026-11",
    preview: "https://blog-907.pages.dev/gallery/",
    links: [{ label: "开发日志", url: "/devlog", external: false }],
  },
  {
    id: "health-dashboard",
    name: "基层医防融合数据平台",
    tagline: "慢病管理与村居对比的内网分析系统",
    description:
      "把 PHIS 的居民档案、高血压、糖尿病和老年人管理数据迁到 Postgres，用 DRF 提供接口、Vue3 呈现大屏，并接入本地大模型做辅助解读。",
    cover: "/works/health-dashboard.webp",
    category: "工具",
    status: "内部使用",
    stack: ["Django REST", "Vue3", "Postgres", "Ollama"],
    updated: "2026-11",
    links: [
      {
        label: "建站记录",
        url: "/blog/build-blog-with-astro-cloudflare/",
        external: false,
      },
    ],
  },
  {
    id: "his-governance",
    name: "HIS 历史数据治理",
    tagline: "科室、医生与门诊数据的清洗迁移",
    description:
      "针对清涧卫生院编码 140882001003 的历史医嘱与费用明细做拆分、去重和残留复验，累计修正九千余行数据。",
    cover: "/works/his-governance.webp",
    category: "工具",
    status: "已完成",
    stack: ["Oracle", "Python", "SQL"],
    updated: "2026-11",
    links: [],
  },
  {
    id: "clinic-miniprogram",
    name: "卫生院服务小程序",
    tagline: "连接微信小程序与内网公卫数据库",
    description:
      "采用 frp 内网穿透加前置机的架构，让微信小程序安全地读取内网 Oracle 公卫数据，避免数据库直接暴露。",
    cover: "/works/clinic-miniprogram.webp",
    category: "小程序",
    status: "开发中",
    stack: ["微信小程序", "frp", "Oracle"],
    updated: "2026-11",
    links: [],
  },
  {
    id: "this-blog",
    name: "Moyu's Blog",
    tagline: "这个暗黑笔记本风格的个人博客",
    description:
      "用 Astro Theme Reimu 搭建，托管在 Cloudflare Pages 并绑定 moyuyf.cn。包含相册、音乐播放器、作品集和开发日志。",
    cover: "/images/banner.webp",
    category: "网站",
    status: "持续更新",
    stack: ["Astro", "Cloudflare Pages", "GitHub"],
    updated: "2026-11",
    preview: "https://blog-907.pages.dev/",
    links: [
      {
        label: "建站全过程",
        url: "/blog/build-blog-with-astro-cloudflare/",
        external: false,
      },
      {
        label: "使用说明",
        url: "/blog/blog-usage-guide/",
        external: false,
      },
    ],
  },
];

export const workCategories = [
  "全部",
  ...Array.from(new Set(works.map((work) => work.category))),
];

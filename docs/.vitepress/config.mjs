import { defineConfig } from 'vitepress';
import { readReviews } from '../../scripts/journal.mjs';

export default defineConfig({
  lang: 'zh-CN',
  title: 'My English Journal',
  description: 'A little progress, every day. 每日英语口语复盘与练习档案。',
  base: '/english-journal/',
  cleanUrls: false,
  head: [['meta', { name: 'theme-color', content: '#2e6654' }]],
  themeConfig: {
    logo: '/journal.svg',
    siteTitle: 'English Journal',
    nav: [
      { text: '首页', link: '/' },
      { text: '每日归档', link: '/daily/' },
      { text: '如何发布', link: '/guide' }
    ],
    sidebar: { '/daily/': [{ text: '每日复盘', items: readReviews().map(r => ({ text: `${r.date} · ${r.title}`, link: r.url })) }] },
    search: { provider: 'local', options: { locales: { root: { translations: { button: { buttonText: '搜索复盘', buttonAriaLabel: '搜索复盘' } } } } } },
    outline: { label: '这篇复盘', level: [2, 3] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/puppymoney/english-journal' }],
    editLink: { pattern: 'https://github.com/puppymoney/english-journal/edit/main/docs/:path', text: '在 GitHub 编辑此页' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '复盘目录',
    footer: { message: 'A little progress, every day.', copyright: 'My English Journal · 记录每一次开口的进步' }
  }
});

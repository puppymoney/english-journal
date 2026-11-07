# My English Journal

A little progress, every day. 基于 VitePress 的每日英语口语复盘网站。

**网站：** https://puppymoney.github.io/english-journal/

## 已提供

- 按日期归档、关键词搜索、主题筛选、篇数与核心表达统计。
- 手机适配、深色模式、VitePress 全文搜索。
- `docs/daily/2026-11-07.md`：根据既有复盘摘要整理的首篇示例。
- 推送到 `main` 后，由 GitHub Actions 构建并部署 GitHub Pages。
- `publish-review` Issue 标签发布入口，仅接受仓库所有者本人创建的 Issue。

**ChatGPT 每天 19:00 的复盘自动写入 GitHub 尚未接通或验证。** 网站部署成功不代表内容生成与提交已自动化。

## 本地预览

需要 Node.js 22 或以上。

```sh
npm ci
npm run docs:dev
```

提交前检查：

```sh
npm test
npm run docs:build
```

构建输出：`docs/.vitepress/dist/`，不提交生成文件或 `node_modules`。

## GitHub Pages

仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。部署流程在 `.github/workflows/deploy.yml`，使用内置 `GITHUB_TOKEN`，无需额外密钥。

`base` 已设为 `/english-journal/`。变更仓库名称或使用独立域名时，需要同步调整 `docs/.vitepress/config.mjs`。

## 新增复盘

把一篇带有 `title`、带引号的 `date`、`summary`、`topics`、`expressions` 的 Markdown 放到 `docs/daily/YYYY-MM-DD.md`，提交后自动更新网站。详细步骤与模板见 [发布指南](docs/guide.md)。同一日期只保留一篇。

可选择将完整 Markdown 放在本人创建的 Issue 正文中，再添加 `publish-review` 标签。此入口尚需一次实际发布验证。它会提交文件后复用部署流程，因为 `GITHUB_TOKEN` 提交默认不会再次触发 push 工作流。

## 接通每天的自动复盘，还需要

1. 确认原有 19:00 任务有权访问当天的实际语音转写。
2. 在该任务的运行环境中授权向本仓库写入每日 Markdown，或创建并标记发布 Issue。
3. 做一次真实的端到端测试，检查文件内容、提交记录、Actions 结果和线上页面。
4. 约定没有练习、转写缺失和写入失败时如何处理，避免虚构内容或静默漏发。

不要把访问令牌写进 Markdown 或仓库。网站和仓库均为公开内容；首篇示例已省略家庭活动细节。

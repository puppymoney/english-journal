# 如何发布每日复盘

网站会把仓库中的 Markdown 构建成网页。新增复盘后，首页、主题筛选、搜索、统计和日期归档会一起更新。

## 最简单：在 GitHub 新增一篇

1. 打开 [docs/daily 目录](https://github.com/puppymoney/english-journal/tree/main/docs/daily)。
2. 点击 **Add file → Create new file**，文件名使用 `YYYY-MM-DD.md`。
3. 参考下面的格式填写内容，提交到 `main`。
4. 在 [Actions](https://github.com/puppymoney/english-journal/actions) 查看部署结果。

```markdown
---
title: "A Small Win Today"
date: "2026-11-08"
summary: "用两三句话描述今天练习的内容。"
topics: ["Daily Life", "Past Tense"]
expressions: 3
---

# A Small Win Today

## 1. 今日话题
填写当天实际练习的话题。

## 2. 原句与地道表达
只记录实际出现过的句子；没有转写时请注明来源限制。

## 3. 今日核心词汇
填写词汇、释义和例句。expressions 填本篇核心表达数量。

## 4. 今日语法重点
填写最值得复习的一点。

## 5. 英文跟读稿
根据当天内容整理，并标明这是练习稿。

## 6. 明日复习任务
- [ ] 完成一次不看稿的复述。
```

日期需要引号，文件名与 `date` 一致；每个日期一篇。修改已有复盘时，直接编辑相应文件。

## 用 Issue 发布

也可以创建 Issue，把**完整 Markdown（包含顶部元数据）**直接放入正文，再给这个 Issue 添加 `publish-review` 标签。

发布流程只接受仓库所有者本人创建的 Issue，并拒绝覆盖已有日期。成功后会提交文件并直接调用部署流程。若标签尚不存在，先在 Issues → Labels 中创建同名标签。首次部署时应先确认这个流程可运行，再依赖它发布。

## 自动化目前到哪一步

| 环节 | 状态 |
| --- | --- |
| 已提交 Markdown → 构建网站 → GitHub Pages | 由仓库部署流程执行，运行结果见 Actions |
| 仓库所有者的 Issue → Markdown → 网站 | 已提供发布流程，需要实际发布验证 |
| ChatGPT 每晚复盘 → 自动写入 GitHub | **尚未接通或验证** |

本项目没有设置每天编造一篇复盘的定时任务，也不包含读取 ChatGPT 对话的凭据。

要接通每天 19:00 的复盘，还需要：确认该任务能读取当天实际的语音转写；让任务在授权环境中写入这个仓库；完成一次「真实复盘 → 文件提交 → 网站更新」测试。没有当天对话时，应明确记录未练习或跳过，而不是生成虚构内容。

## 公开内容

此仓库与网站公开可访问。发布前请删去不想公开的姓名、地点和其他个人细节。首篇示例已省去家庭活动细节。

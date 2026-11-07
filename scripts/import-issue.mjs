import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parseReview, dailyDir } from './journal.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
if (event.issue?.author_association !== 'OWNER' || event.issue?.user?.login !== process.env.GITHUB_REPOSITORY_OWNER) {
  throw new Error('仅仓库所有者创建的 Issue 可以发布');
}
let source = (event.issue.body || '').trim();
if (source.startsWith('```markdown\n') && source.endsWith('\n```')) source = source.slice(12, -4).trim();
const review = parseReview(source);
const path = `${dailyDir}/${review.date}.md`;
if (existsSync(path)) throw new Error(`${review.date} 已存在；请在仓库内编辑，避免覆盖已有复盘`);
writeFileSync(path, `${source}\n`, { flag: 'wx' });
console.log(`已导入 ${review.date}.md`);

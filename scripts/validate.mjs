import { readdirSync } from 'node:fs';
import { dailyDir, readReviews } from './journal.mjs';

for (const name of readdirSync(dailyDir)) {
  if (name.endsWith('.md') && name !== 'index.md' && !/^\d{4}-\d{2}-\d{2}\.md$/.test(name)) {
    throw new Error(`每日复盘文件名无效：${name}`);
  }
}
console.log(`已验证 ${readReviews().length} 篇每日复盘。`);

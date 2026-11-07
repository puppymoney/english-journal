import matter from 'gray-matter';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const dailyDir = fileURLToPath(new URL('../docs/daily/', import.meta.url));

export function parseReview(source, filename) {
  const { data, content } = matter(source);
  const date = data.date;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('date 必须是带引号的 YYYY-MM-DD 字符串');
  }
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new Error(`无效日期：${date}`);
  }
  if (filename && filename !== `${date}.md`) throw new Error('文件名必须与 date 相同');
  for (const key of ['title', 'summary']) {
    if (typeof data[key] !== 'string' || !data[key].trim()) throw new Error(`缺少 ${key}`);
  }
  if (!Array.isArray(data.topics) || !data.topics.length || data.topics.some(t => typeof t !== 'string' || !t.trim())) {
    throw new Error('topics 必须是非空字符串数组');
  }
  if (!Number.isInteger(data.expressions) || data.expressions < 0) throw new Error('expressions 必须是非负整数');
  if (!content.trim()) throw new Error('复盘正文不能为空');
  return { date, title: data.title, summary: data.summary, topics: [...new Set(data.topics)], expressions: data.expressions, content };
}

export function readReviews() {
  return readdirSync(dailyDir).filter(name => /^\d{4}-\d{2}-\d{2}\.md$/.test(name)).map(name => {
    try {
      return { ...parseReview(readFileSync(`${dailyDir}/${name}`, 'utf8'), name), url: `/daily/${name.replace('.md', '.html')}` };
    } catch (error) {
      throw new Error(`${name}: ${error.message}`);
    }
  }).sort((a, b) => b.date.localeCompare(a.date));
}

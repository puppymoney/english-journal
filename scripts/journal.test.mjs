import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReview } from './journal.mjs';

const review = date => `---\ntitle: "A practice day"\ndate: "${date}"\nsummary: "Past tense practice"\ntopics: ["Daily Life"]\nexpressions: 2\n---\n# Review\nA real practice note.\n`;
test('接受闰日，拒绝不存在的日期和路径', () => {
  assert.equal(parseReview(review('2024-02-29'), '2024-02-29.md').date, '2024-02-29');
  assert.throws(() => parseReview(review('2026-02-29')), /无效日期/);
  assert.throws(() => parseReview(review('../../x')), /date/);
  assert.throws(() => parseReview(review('2026-11-07'), '2026-11-08.md'), /文件名/);
});
test('拒绝缺少元数据的复盘', () => {
  assert.throws(() => parseReview(review('2026-11-07').replace('expressions: 2', 'expressions: -1')), /expressions/);
  assert.throws(() => parseReview(review('2026-11-07').replace('topics: ["Daily Life"]', 'topics: []')), /topics/);
});

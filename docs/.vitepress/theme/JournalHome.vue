<script setup>
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import { data as reviews } from './reviews.data.mjs';

defineProps({ archive: Boolean });
const query = ref('');
const topic = ref('全部');
const topics = computed(() => ['全部', ...new Set(reviews.flatMap(r => r.topics))]);
const expressionCount = computed(() => reviews.reduce((sum, r) => sum + r.expressions, 0));
const filtered = computed(() => reviews.filter(r => {
  const haystack = [r.title, r.summary, r.content, ...r.topics].join(' ').toLocaleLowerCase();
  return (topic.value === '全部' || r.topics.includes(topic.value)) && haystack.includes(query.value.trim().toLocaleLowerCase());
}));
const groups = computed(() => {
  const months = new Map();
  for (const review of filtered.value) {
    const month = review.date.slice(0, 7);
    if (!months.has(month)) months.set(month, []);
    months.get(month).push(review);
  }
  return [...months];
});
</script>

<template>
  <div class="journal-shell">
    <section v-if="!archive" class="journal-hero">
      <div class="hero-copy">
        <p class="eyebrow">MY ENGLISH JOURNAL / 每日口语复盘</p>
        <h1>A little progress,<br><em>every day.</em></h1>
        <p class="hero-description">把每一次开口，变成看得见的进步。<br>留住今天的表达，让明天说得更自然。</p>
        <a v-if="reviews.length" class="primary-link" :href="withBase(reviews[0].url)">阅读最新复盘 <span aria-hidden="true">↗</span></a>
      </div>
      <div class="practice-note" aria-label="今日练习卡">
        <span class="note-label">A NOTE TO MYSELF</span>
        <div class="note-rule"></div>
        <p>Don't wait for perfect.<br>Just keep speaking.</p>
        <span class="note-caption">不必等到完美，先勇敢开口。</span>
        <span class="note-number" aria-hidden="true">Aa.</span>
      </div>
    </section>
    <section v-else class="archive-heading">
      <p class="eyebrow">THE PRACTICE ARCHIVE</p>
      <h1>每日复盘</h1>
      <p>沿着日期，回看一点一滴的积累。</p>
    </section>

    <div class="journal-stats" aria-label="学习统计">
      <div><strong>{{ String(reviews.length).padStart(2, '0') }}</strong><span>篇复盘</span></div>
      <div><strong>{{ String(expressionCount).padStart(2, '0') }}</strong><span>个核心表达</span></div>
      <div><strong>{{ topics.length - 1 }}</strong><span>个练习主题</span></div>
      <p>Small steps.<br>Real progress.</p>
    </div>

    <section class="journal-library" aria-labelledby="library-heading">
      <div class="library-title"><div><p class="eyebrow">DAILY SPEAKING JOURNAL</p><h2 id="library-heading">{{ archive ? '按月归档' : '学习的每一天' }}</h2></div><span>从生活出发，用英语记录</span></div>
      <div class="journal-filters">
        <label class="journal-search"><span>搜索</span><input v-model="query" type="search" placeholder="搜索词汇、句子或话题…" aria-label="搜索学习记录"></label>
        <div class="topic-list" aria-label="按主题筛选"><button v-for="item in topics" :key="item" type="button" :class="{ active: topic === item }" :aria-pressed="topic === item" @click="topic = item">{{ item }}</button></div>
      </div>
      <p class="result-count" aria-live="polite">共 {{ filtered.length }} 篇复盘</p>
      <div v-for="[month, entries] in groups" :key="month" class="month-group">
        <h3>{{ month.replace('-', ' / ') }}</h3>
        <a v-for="entry in entries" :key="entry.date" :href="withBase(entry.url)" class="review-card">
          <time :datetime="entry.date"><strong>{{ entry.date.slice(8) }}</strong><span>{{ entry.date.slice(0, 7) }}</span></time>
          <div class="review-content"><div class="review-topics"><span v-for="tag in entry.topics" :key="tag">{{ tag }}</span></div><h4>{{ entry.title }}</h4><p>{{ entry.summary }}</p><span class="review-meta">{{ entry.expressions }} 个核心表达 · 阅读复盘</span></div>
          <span class="card-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <div v-if="!filtered.length" class="empty-state">没有找到匹配的复盘。试试其他关键词，或选择「全部」。</div>
    </section>
  </div>
</template>

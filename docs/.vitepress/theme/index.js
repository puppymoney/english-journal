import DefaultTheme from 'vitepress/theme';
import JournalHome from './JournalHome.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) { app.component('JournalHome', JournalHome); }
};

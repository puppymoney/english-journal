import { readReviews } from '../../../scripts/journal.mjs';

export default {
  watch: ['../../daily/*.md'],
  load() { return readReviews(); }
};

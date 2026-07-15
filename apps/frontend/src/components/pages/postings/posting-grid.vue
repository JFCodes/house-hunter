<script setup lang="ts">
import type { T_Posting } from '@house-hunter/types'
// App
// Components
import PostingGridItem from '@/components/pages/postings/posting-grid-item.vue'

defineProps<{ postings: Array<T_Posting> }>()

</script>

<template>
  <div class="grid">
    <PostingGridItem
      v-for="posting in postings"
      :posting="posting"
      :key="posting.id" />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
  gap: var(--s-sm);
  max-height: 100%;
  overflow-y: auto;
  display: grid;
}
</style>

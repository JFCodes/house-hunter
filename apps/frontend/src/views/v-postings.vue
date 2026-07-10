<script setup lang="ts">
import { onBeforeMount } from 'vue'
// App
import { usePostingsStore } from '@/stores/postings'
// Components
import PostingItem from '@/components/pages/postings/posting-item.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'

const postingsStore = usePostingsStore()

onBeforeMount(postingsStore.searchPostings)
</script>

<template>
  <CompUiLoading v-if="postingsStore.isLoading" />

  <div class="postings">
    <PostingItem
      v-for="posting in postingsStore.postings"
      :posting="posting"
      :key="posting.id" />
  </div>
</template>

<style lang="scss" scoped>
.postings {
  justify-content: space-evenly;
  gap: var(--spacing-sm);
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
}
</style>
<script setup lang="ts">
// App
import { usePostingsStore } from '@/stores/postings'
// Components
import PostingsListPage from '@/components/pages/postings/list-page.vue'

const postingsStore = usePostingsStore()
</script>

<template>
  <PostingsListPage :postings="postingsStore.postings" />
</template>

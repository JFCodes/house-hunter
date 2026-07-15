<script setup lang="ts">
import { computed } from 'vue'
// App
import { useRouterUtils } from '@/composables/router-utils'
import { usePostingsStore } from '@/stores/postings'
import { E_ROUTER_PARAMS } from '@/router/enums'
// Components
import PostingsListPage from '@/components/pages/postings/list-page.vue'
import type { T_Posting } from '@house-hunter/types'

const { computedStringParam } = useRouterUtils()
const postingsStore = usePostingsStore()

const activeStatus = computedStringParam(E_ROUTER_PARAMS.POSTING_STATUS)

const filteredPostings = computed<Array<T_Posting>>(() => {
  if (!activeStatus.value) return []

  const filter = (posting: T_Posting) => posting._houseHunterFields.userStatus === activeStatus.value
  return postingsStore.postings.filter(filter)
})
</script>

<template>
  <PostingsListPage :postings="filteredPostings" />
</template>

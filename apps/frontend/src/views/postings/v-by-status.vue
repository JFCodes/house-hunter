<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
// App
import type { IconToggleItem } from '@/components/ui/types'
import { useRouterUtils } from '@/composables/router-utils'
import { usePostingsStore } from '@/stores/postings'
import { E_ROUTER_PARAMS, E_ROUTER_QUERIES } from '@/router/enums'
// Components
import PostingsTable from '@/components/pages/postings/posting-table.vue'
import PostingsGrid from '@/components/pages/postings/posting-grid.vue'
import CompUiIconToggle from '@/components/ui/ui-icon-toggle.vue'
import { Grid3X3, List } from '@lucide/vue'
import type { T_Posting } from '@house-hunter/types'

type GridType = 'table' | 'grid'

const { writableToggleQuery, computedStringParam } = useRouterUtils()
const postingsStore = usePostingsStore()

const activeStatus = computedStringParam(E_ROUTER_PARAMS.POSTING_STATUS)
const tableView = writableToggleQuery(E_ROUTER_QUERIES.viewTable)
const toggleItems = computed<Array<IconToggleItem<GridType>>>(() => ([
  { icon: Grid3X3, isActive: !tableView.value, key: 'grid' },
  { icon: List, isActive: tableView.value, key: 'table' },
]))

const filteredPostings = computed<Array<T_Posting>>(() => {
  if (!activeStatus.value) return []

  return postingsStore.postings.filter(p => p._houseHunterFields.userStatus === activeStatus.value)
})

onBeforeMount(postingsStore.searchPostings)
</script>

<template>
  <div class="hh-group hh-mb-md">
    <CompUiIconToggle
      :items="toggleItems"
      @item-click="key => tableView = key === 'table'" />
  </div>

  <PostingsTable v-if="tableView" :postings="filteredPostings" />
  <PostingsGrid v-else :postings="filteredPostings" />
</template>

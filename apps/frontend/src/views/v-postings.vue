<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
// App
import type { IconToggleItem } from '@/components/ui/types'
import { useRouterUtils } from '@/composables/router-utils'
import { usePostingsStore } from '@/stores/postings'
import { E_ROUTER_QUERIES } from '@/router/enums'
// Components
import PostingsGrid from '@/components/pages/postings/posting-grid.vue'
import CompUiIconToggle from '@/components/ui/ui-icon-toggle.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { Grid3X3, List } from '@lucide/vue'

type GridType = 'table' | 'grid'

const { writableToggleQuery } = useRouterUtils()
const postingsStore = usePostingsStore()

const tableView = writableToggleQuery(E_ROUTER_QUERIES.viewTable)

const toggleItems = computed<Array<IconToggleItem<GridType>>>(() => ([
  { icon: Grid3X3, isActive: !tableView.value, key: 'grid' },
  { icon: List, isActive: tableView.value, key: 'table' },
]))

onBeforeMount(postingsStore.searchPostings)
</script>

<template>
  <CompUiLoading v-if="postingsStore.isLoading" />

  <div class="hh-group hh-mb-md">
    <CompUiIconToggle
      :items="toggleItems"
      @item-click="key => tableView = key === 'table'" />
  </div>

  <div v-if="tableView"> table view</div>
  <PostingsGrid v-else :postings="postingsStore.postings" />
</template>

<style lang="scss" scoped>
.grid {
  justify-content: space-evenly;
  gap: var(--spacing-sm);
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
}
</style>
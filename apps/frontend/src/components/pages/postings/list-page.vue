<script setup lang="ts">
import type { T_Posting } from '@house-hunter/types'
import { computed } from 'vue'
// App
import type { IconToggleItem } from '@/components/ui/types'
import { useRouterUtils } from '@/composables/router-utils'
import { E_ROUTER_QUERIES } from '@/router/enums'
// Components
import PostingsTable from '@/components/pages/postings/posting-table.vue'
import PostingsGrid from '@/components/pages/postings/posting-grid.vue'
import CompUiIconToggle from '@/components/ui/ui-icon-toggle.vue'
import { Grid3X3, List } from '@lucide/vue'

type GridType = 'table' | 'grid'

defineProps<{ postings: Array<T_Posting> }>()

const { writableToggleQuery } = useRouterUtils()

const tableView = writableToggleQuery(E_ROUTER_QUERIES.viewTable)
const toggleItems = computed<Array<IconToggleItem<GridType>>>(() => ([
  { icon: Grid3X3, isActive: !tableView.value, key: 'grid' },
  { icon: List, isActive: tableView.value, key: 'table' },
]))
</script>

<template>
  <div class="content">
    <div>
      <CompUiIconToggle
        :items="toggleItems"
        @item-click="key => tableView = key === 'table'" />
    </div>

    <div class="content__container --pb-lg">
      <PostingsTable v-if="tableView" :postings="postings" />
      <PostingsGrid v-else :postings="postings" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  grid-template-rows: auto 1fr;
  gap: var(--spacing-md);
  overflow: hidden;
  display: grid;
  height: 100%;

  &__container {
    overflow-y: auto;
  }
}
</style>
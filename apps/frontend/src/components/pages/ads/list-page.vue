<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
import { computed } from 'vue'
// App
import type { IconToggleItem } from '@/components/ui/types'
import { useRouterUtils } from '@/composables/router-utils'
import { E_ROUTER_QUERIES } from '@/router/enums'
// Components
import CompUiIconToggle from '@/components/ui/ui-icon-toggle.vue'
import AdsTable from '@/components/pages/ads/ad-table.vue'
import AdsGrid from '@/components/pages/ads/ad-grid.vue'
import { Grid3X3, List } from '@lucide/vue'

type GridType = 'table' | 'grid'

defineProps<{ ads: Array<T_Ad> }>()

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
      <AdsTable v-if="tableView" :ads="ads" />
      <AdsGrid v-else :ads="ads" />
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
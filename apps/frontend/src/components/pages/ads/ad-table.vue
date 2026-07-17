<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
// Components
import AdTableItem from '@/components/pages/ads/ad-table-item.vue'

defineProps<{ ads: Array<T_Ad> }>()
</script>

<template>
  <div class="table">

    <table class="--base-table">
      <thead>
        <tr class="--font-light">
          <th></th>
          <th>{{ $t('global.description') }}</th>
          <th>{{ $t('global.askingPrice') }}</th>
          <th>{{ $t('global.year') }}</th>
          <th>{{ $t('global.typology') }}</th>
          <th>{{ $t('global.area') }}</th>
          <th>{{ $t('global.status') }}</th>

          <th class="--text-center">{{ $t('global.actions') }}</th>
        </tr>
      </thead>

      <tbody>
        <AdTableItem v-for="ad in ads" :ad="ad" :key="ad.id" />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table {
  overflow-y: auto;
  height: 100%;
}
</style>

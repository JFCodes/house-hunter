<script setup lang="ts">
import type { T_Posting } from '@house-hunter/types'
// Components
import PostingTableItem from '@/components/pages/postings/posting-table-item.vue'

defineProps<{ postings: Array<T_Posting> }>()
</script>

<template>
  <div class="table">

    <table class="hh-base-table">
      <thead>
        <tr>
          <th></th>
          <th>{{ $t('global.description') }}</th>
          <th>{{ $t('global.askingPrice') }}</th>
          <th>{{ $t('global.year') }}</th>
          <th>{{ $t('global.typology') }}</th>
          <th>{{ $t('global.area') }}</th>
          <th>{{ $t('global.status') }}</th>

          <th class="hh-text-center">{{ $t('global.actions') }}</th>
        </tr>
      </thead>

      <tbody>
        <PostingTableItem
          v-for="posting in postings"
          :posting="posting"
          :key="posting.id" />
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

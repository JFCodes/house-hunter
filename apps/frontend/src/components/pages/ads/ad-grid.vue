<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
// App
// Components
import AdGridItem from '@/components/pages/ads/ad-grid-item.vue'

defineProps<{ ads: Array<T_Ad> }>()

</script>

<template>
  <div class="grid">
    <AdGridItem v-for="ad in ads" :ad="ad" :key="ad.id" />
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

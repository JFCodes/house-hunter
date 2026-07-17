<script setup lang="ts">
// App
import { useAdsStore } from '@/stores/ads'
// Components
import AdsListPage from '@/components/pages/ads/list-page.vue'

const adsStore = useAdsStore()
</script>

<template>
  <AdsListPage :ads="adsStore.ads" />
</template>

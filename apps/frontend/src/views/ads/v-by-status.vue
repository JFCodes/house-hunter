<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
import { computed } from 'vue'
// App
import { useRouterUtils } from '@/composables/router-utils'
import { E_ROUTER_PARAMS } from '@/router/enums'
import { useAdsStore } from '@/stores/ads'
// Components
import AdsListPage from '@/components/pages/ads/list-page.vue'

const { computedStringParam } = useRouterUtils()
const adsStore = useAdsStore()

const activeStatus = computedStringParam(E_ROUTER_PARAMS.AD_STATUS)

const filteredAds = computed<Array<T_Ad>>(() => {
  if (!activeStatus.value) return []

  const filter = (ad: T_Ad) => ad.status === activeStatus.value
  return adsStore.ads.filter(filter)
})
</script>

<template>
  <AdsListPage :ads="filteredAds" />
</template>

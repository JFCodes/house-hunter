<script setup lang="ts">
import { E_AD_STATUS } from '@house-hunter/data-model'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
// App
import type { UiPageTabRoute } from '@/components/ui/types'
import { E_ROUTER_PAGES } from '@/router/enums'
import { useAdsStore } from '@/stores/ads'
// Components
import { GalleryHorizontalEnd, LayoutDashboard } from '@lucide/vue'
import CompLayoutTopTabs from '@/components/layouts/top-tabs.vue'

const adsStore = useAdsStore()
const { t } = useI18n()

const tabs = computed<Array<UiPageTabRoute>>(() => {
  const newAdsCount = adsStore
    .ads
    .filter(p => p.status === E_AD_STATUS.NEW)
    .length

  return [
    {
      to: { name: E_ROUTER_PAGES.HOME_DASHBOARD },
      key: E_ROUTER_PAGES.HOME_DASHBOARD,
      label: t('global.dashboard'),
      icon: LayoutDashboard,
    },
    {
      badge: newAdsCount > 0 ? String(newAdsCount) : '',
      to: { name: E_ROUTER_PAGES.HOME_SWIPE },
      key: E_ROUTER_PAGES.HOME_SWIPE,
      icon: GalleryHorizontalEnd,
      label: t('global.swipe'),
    },
  ]
})
</script>

<template>
  <CompLayoutTopTabs :tabs="tabs">
    <RouterView />
  </CompLayoutTopTabs>
</template>

<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
// App
import type { UiPageTabRoute } from '@/components/ui/types'
import { usePostingsStore } from '@/stores/postings'
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import { GalleryHorizontalEnd, LayoutDashboard } from '@lucide/vue'
import CompLayoutTopTabs from '@/components/layouts/top-tabs.vue'

const postingsStore = usePostingsStore()
const { t } = useI18n()

const tabs = computed<Array<UiPageTabRoute>>(() => {
  const newPostingsCount = postingsStore
    .postings
    .filter(p => p._houseHunterFields.userStatus === E_POSTING_USER_STATUS.NEW)
    .length

  return [
    {
      to: { name: E_ROUTER_PAGES.HOME_DASHBOARD },
      key: E_ROUTER_PAGES.HOME_DASHBOARD,
      label: t('global.dashboard'),
      icon: LayoutDashboard,
    },
    {
      badge: newPostingsCount > 0 ? String(newPostingsCount) : '',
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

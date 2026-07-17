<script setup lang="ts">
import { E_AD_STATUS } from '@house-hunter/data-model'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// App
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
import type { UiPageTabRoute } from '@/components/ui/types'
import { AD_STATUS_ICONS } from '@/components/constants'
import { useAdsStore } from '@/stores/ads'
// Components
import CompLayoutTopTabs from '@/components/layouts/top-tabs.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { IdCard } from '@lucide/vue'

const orderedStatus: Array<E_AD_STATUS> = [
  E_AD_STATUS.NEW,
  E_AD_STATUS.INTERESTING,
  E_AD_STATUS.CONTACT_MADE,
  E_AD_STATUS.PROPOSAL_MADE,
  E_AD_STATUS.PROPOSAL_ACCEPTED,
  E_AD_STATUS.COMPLETED,
  E_AD_STATUS.PROPOSAL_REJECTED,
  E_AD_STATUS.DELETED,
]

const adsStore = useAdsStore()
const { t } = useI18n()

const statusCounters = computed<Record<E_AD_STATUS, number>>(() => {
  return adsStore.ads.reduce((acc, ad) => {
    acc[ad.status]++
    return acc
  }, {
    [E_AD_STATUS.NEW]: 0,
    [E_AD_STATUS.INTERESTING]: 0,
    [E_AD_STATUS.CONTACT_MADE]: 0,
    [E_AD_STATUS.PROPOSAL_MADE]: 0,
    [E_AD_STATUS.PROPOSAL_ACCEPTED]: 0,
    [E_AD_STATUS.PROPOSAL_REJECTED]: 0,
    [E_AD_STATUS.COMPLETED]: 0,
    [E_AD_STATUS.DELETED]: 0,
  })
})

const tabs = computed<Array<UiPageTabRoute>>(() => ([
  {
    to: { name: E_ROUTER_PAGES.ADS_ALL },
    key: E_ROUTER_PAGES.ADS_ALL,
    label: t('pages.ads.tabs.all'),
    icon: IdCard,
  },
  ...orderedStatus.map(status => ({
    key: `${E_ROUTER_PAGES.ADS_BY_STATUS}-${status}`,
    label: `${t(`enums.adStatus.${status}`)}`,
    badge: statusCounters.value[status] ? `${statusCounters.value[status]}` : '',
    icon: AD_STATUS_ICONS[status],
    to: {
      params: { [E_ROUTER_PARAMS.AD_STATUS]: status },
      name: E_ROUTER_PAGES.ADS_BY_STATUS,
    },
  }))
]))
</script>

<template>
  <CompUiLoading v-if="adsStore.isLoading" />
  <CompLayoutTopTabs :tabs="tabs">
    <RouterView />
  </CompLayoutTopTabs>
</template>

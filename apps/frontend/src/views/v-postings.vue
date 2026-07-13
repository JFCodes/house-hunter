<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
import { onBeforeMount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
// App
import type { UiPageTabRoute } from '@/components/ui/types'
import { usePostingsStore } from '@/stores/postings'
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
// Components
import { POSTING_USER_STATUS_ICONS } from '@/components/constants'
import CompUiPageTags from '@/components/ui/ui-page-tabs.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { IdCard } from '@lucide/vue'

const orderedStatus: Array<E_POSTING_USER_STATUS> = [
  E_POSTING_USER_STATUS.NEW,
  E_POSTING_USER_STATUS.INTERESTING,
  E_POSTING_USER_STATUS.CONTACT_MADE,
  E_POSTING_USER_STATUS.PROPOSAL_MADE,
  E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED,
  E_POSTING_USER_STATUS.PROPOSAL_REJECTED,
  E_POSTING_USER_STATUS.BOUGHT,
  E_POSTING_USER_STATUS.DISMISS,
]

const postingsStore = usePostingsStore()
const { t } = useI18n()

const statusCounters = computed<Record<E_POSTING_USER_STATUS, number>>(() => {
  return postingsStore.postings.reduce((acc, posting) => {
    acc[posting._houseHunterFields.userStatus]++
    return acc
  }, {
    [E_POSTING_USER_STATUS.NEW]: 0,
    [E_POSTING_USER_STATUS.INTERESTING]: 0,
    [E_POSTING_USER_STATUS.CONTACT_MADE]: 0,
    [E_POSTING_USER_STATUS.PROPOSAL_MADE]: 0,
    [E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED]: 0,
    [E_POSTING_USER_STATUS.PROPOSAL_REJECTED]: 0,
    [E_POSTING_USER_STATUS.BOUGHT]: 0,
    [E_POSTING_USER_STATUS.DISMISS]: 0,
  })
})


const tabs = computed<Array<UiPageTabRoute>>(() => ([
  {
    to: { name: E_ROUTER_PAGES.POSTINGS_ALL },
    key: E_ROUTER_PAGES.POSTINGS_ALL,
    label: t('pages.postings.tabs.all'),
    icon: IdCard,
  },
  ...orderedStatus.map(status => ({
    label: `${t(`enums.postingStatus.${status}`)} (${statusCounters.value[status]})`,
    key: `${E_ROUTER_PAGES.POSTINGS_BY_STATUS}-${status}`,
    icon: POSTING_USER_STATUS_ICONS[status],
    to: {
      params: { [E_ROUTER_PARAMS.POSTING_STATUS]: status },
      name: E_ROUTER_PAGES.POSTINGS_BY_STATUS,
    },
  }))
]))

onBeforeMount(postingsStore.searchPostings)
</script>

<template>
  <CompUiLoading v-if="postingsStore.isLoading" />
  <div class="layout">
    <CompUiPageTags :tabs="tabs" />

    <div class="layout__content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  flex-direction: column;
  gap: var(--spacing-sm);
  overflow: hidden;
  display: flex;
  height: 100%;

  &__content {
    overflow-y: hidden;
    flex: 1;
  }
}
</style>
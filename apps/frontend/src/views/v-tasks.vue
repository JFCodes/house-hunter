<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// App
import type { UiPageTabRoute } from '@/components/ui/types'
import { E_ROUTER_PAGES } from '@/router/enums'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompLayoutTopTabs from '@/components/layouts/top-tabs.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import { ClipboardClock, Cctv } from '@lucide/vue'

const tasksStore = useTasksStore()
const { t } = useI18n()

const tabs: Array<UiPageTabRoute> = [
  {
    to: { name: E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS },
    key: E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS,
    label: t('global.tasks'),
    icon: Cctv,
  },
  {
    to: { name: E_ROUTER_PAGES.TASKS_LOGS },
    key: E_ROUTER_PAGES.TASKS_LOGS,
    label: t('global.history'),
    icon: ClipboardClock,
  }
]
</script>

<template>
  <CompUiLoading v-if="tasksStore.isLoading" />
  <CompLayoutTopTabs v-else :tabs="tabs">
    <RouterView />
  </CompLayoutTopTabs>
</template>

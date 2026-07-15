<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
// App
import { useServerStatusStore } from '@/stores/server-status'
import { unsubscribeSocket } from '@/websocket/instance'
import { usePostingsStore } from '@/stores/postings'
import { websocket } from '@/websocket/client'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompGlobalTooltipAnchor from '@/components/global/g-tooltip-anchor.vue'
import CompGlobalToastsAnchor from '@/components/global/g-toasts-anchor.vue'
import CompGlobalModalAnchor from '@/components/global/g-modal-anchor.vue'
import CompGlobalTeleports from '@/components/global/g-teleports.vue'
import CompGlobalPage from '@/components/global/g-page.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import ViewOffline from '@/views/v-offline.vue'

const serverStatusStore = useServerStatusStore()
const postingsStore = usePostingsStore()
const tasksStore = useTasksStore()

onMounted(() => {
  tasksStore.searchCrawlNewPostingTasks()
  postingsStore.searchPostings()
  websocket.connect()
})

onUnmounted(() => {
  unsubscribeSocket()
  websocket.disconnect()
})
</script>

<template>
  <CompGlobalTooltipAnchor />
  <CompGlobalToastsAnchor />
  <CompGlobalModalAnchor />
  <CompGlobalTeleports />

  <CompUiLoading v-if="serverStatusStore.isInitializing" />
  <ViewOffline v-if="!serverStatusStore.serverOk" />

  <CompGlobalPage v-else>
    <template #content>
      <RouterView />
    </template>
  </CompGlobalPage>
</template>

<script setup lang="ts">
// App
import { useServerStatusStore } from '@/stores/server-status'
// Components
import CompGlobalTeleports from '@/components/global/g-teleports.vue'
import CompTooltipAnchor from '@/components/tooltips/t-anchor.vue'
import CompGlobalPage from '@/components/global/g-page.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import ViewOffline from '@/views/v-offline.vue'

const serverStatusStore = useServerStatusStore()

</script>

<template>
  <CompTooltipAnchor />
  <CompGlobalTeleports />

  <CompUiLoading v-if="serverStatusStore.isInitializing" />
  <ViewOffline v-if="!serverStatusStore.serverOk" />

  <CompGlobalPage v-else>
    <template #content>
      <RouterView />
    </template>
  </CompGlobalPage>
</template>

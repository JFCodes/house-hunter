<script setup lang="ts">
// App
import { useServerStatusStore } from '@/stores/server-status'
// Components
import CompUiLoading from '@/components/ui/ui-loading.vue'

const serverStatusStore = useServerStatusStore()

</script>

<template>
  <CompUiLoading v-if="serverStatusStore.isInitializing" />
  <template v-if="!serverStatusStore.serverOk">
    app down, please make sure all resources are up and running
  </template>

  <template v-else>
    server is up
  </template>
</template>

<style scoped></style>

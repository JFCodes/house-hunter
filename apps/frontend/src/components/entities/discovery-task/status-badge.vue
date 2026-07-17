<script setup lang="ts">
import type { E_DISCOVERY_TASK_STATUS } from '@house-hunter/data-model'

defineProps<{ status: E_DISCOVERY_TASK_STATUS }>()
</script>

<template>
  <div>task status {{ status }}</div>
</template>

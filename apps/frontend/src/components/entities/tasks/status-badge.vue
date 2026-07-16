<script setup lang="ts">
import type { E_TASK_STATUS } from '@house-hunter/types'

defineProps<{ status: E_TASK_STATUS }>()
</script>

<template>
  <div>task status {{ status }}</div>
</template>

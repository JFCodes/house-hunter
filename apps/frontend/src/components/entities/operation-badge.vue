<script setup lang="ts">
import type { T_PostingOperation } from '@house-hunter/types'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ postingOperation: T_PostingOperation }>()
</script>

<template>
  <CompUiTypeBadge type="warning">
    {{ $t(`enums.postingOperation.${postingOperation}`) }}
  </CompUiTypeBadge>
</template>

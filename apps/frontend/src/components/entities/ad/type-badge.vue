<script setup lang="ts">
import type { T_AdType } from '@house-hunter/data-model'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ adType: T_AdType }>()
</script>

<template>
  <CompUiTypeBadge type="warning">
    {{ $t(`enums.adType.${adType}`) }}
  </CompUiTypeBadge>
</template>

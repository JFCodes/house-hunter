<script setup lang="ts">
import type { T_PostingType } from '@house-hunter/types'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ postingTypes: Array<T_PostingType> }>()
</script>

<template>
  <CompUiTypeBadge
    v-for="(postingType, index) in postingTypes"
    type="light"
    :key="`${postingType}-${index}`">
    {{ $t(`enums.postingType.${postingType}`) }}
  </CompUiTypeBadge>
</template>

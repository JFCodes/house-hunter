<script setup lang="ts">
import type { T_PostingType } from '@house-hunter/types'
// Components
import CompUiBadge from '@/components/ui/ui-badge.vue'

defineProps<{ postingTypes: Array<T_PostingType> }>()
</script>

<template>
  <CompUiBadge
    v-for="(postingType, index) in postingTypes"
    text-color="var(--color-info)"
    border-color="var(--color-info)"
    :key="`${postingType}-${index}`">
    {{ $t(`enums.postingType.${postingType}`) }}
  </CompUiBadge>
</template>

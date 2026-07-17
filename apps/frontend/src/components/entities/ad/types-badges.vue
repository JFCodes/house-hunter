<script setup lang="ts">
import type { T_AdBuildingType } from '@house-hunter/data-model'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ buildingTypes: Array<T_AdBuildingType> }>()
</script>

<template>
  <CompUiTypeBadge
    v-for="(buildingType, index) in buildingTypes"
    type="light"
    :key="`${postingType}-${index}`">
    {{ $t(`enums.adBuildingType.${buildingType}`) }}
  </CompUiTypeBadge>
</template>

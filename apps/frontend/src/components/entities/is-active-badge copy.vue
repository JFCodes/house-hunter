<script setup lang="ts" generic="T extends { isActive: boolean }">
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

withDefaults(
  defineProps<{
    entity: T
    inactiveLabelKey?: string
    activeLabelKey?: string
  }>(),
  {
    inactiveLabelKey: 'global.stopped',
    activeLabelKey: 'global.active',
  }
)
</script>

<template>
  <CompUiTypeBadge :type="entity.isActive ? 'success' : 'danger'">
    {{ entity.isActive ? $t(activeLabelKey) : $t(inactiveLabelKey) }}
  </CompUiTypeBadge>
</template>

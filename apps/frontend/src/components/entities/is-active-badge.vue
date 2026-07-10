<script setup lang="ts" generic="T extends { isActive: boolean }">
// Components
import CompUiBadge from '@/components/ui/ui-badge.vue'

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
  <CompUiBadge
    :border-color="entity.isActive ? 'var(--color-success)' : 'var(--color-danger)'"
    :text-color="entity.isActive ? 'var(--color-success)' : 'var(--color-danger)'">

    {{ entity.isActive ? $t(activeLabelKey) : $t(inactiveLabelKey) }}

  </CompUiBadge>
</template>

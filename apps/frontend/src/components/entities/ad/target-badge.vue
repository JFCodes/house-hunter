<script setup lang="ts">
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ target: string }>()
</script>

<template>
  <CompUiTypeBadge filled type="info">
    {{ target }}
  </CompUiTypeBadge>
</template>

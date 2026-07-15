<script setup lang="ts">
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ source: string }>()
</script>

<template>
  <CompUiTypeBadge filled type="info">
    {{ source }}
  </CompUiTypeBadge>
</template>

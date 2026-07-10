<script setup lang="ts">
// Components
import CompUiBadge from '@/components/ui/ui-badge.vue'

defineProps<{ source: string }>()
</script>

<template>
  <CompUiBadge
    class="hh-font-bold"
    back-ground-color="var(--color-border-active)"
    border-color="var(--color-border-active)"
    text-color="var(--color-background)">
    {{ source }}
  </CompUiBadge>
</template>

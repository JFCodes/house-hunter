<script setup lang="ts">
import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  icon: Component
  linkTo?: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink v-if="linkTo" :to="linkTo" class="hh-base-button icon-button">
    <component :is="icon" size="18" color="var(--color-text-muted)" />
  </RouterLink>

  <button v-else class="hh-base-button icon-button" type="button">
    <component :is="icon" size="18" color="var(--color-text-muted)" />
  </button>
</template>

<style lang="scss" scoped>
.icon-button {
  width: 32px;
}
</style>

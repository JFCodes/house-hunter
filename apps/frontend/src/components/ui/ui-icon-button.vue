<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'

defineProps<{
  icon: Component
  linkTo?: RouteLocationRaw
  isActive: boolean
}>();
</script>

<template>
  <component
    type="button"
    :class="{ 'icon-button--active': isActive }"
    :is="linkTo ? RouterLink : 'button'"
    :to="linkTo ?? undefined"
    class="hh-base-button icon-button">
    <component
      :color="isActive ? 'var(--color-text-base)' : 'var(--color-text-muted)'"
      :is="icon"
      size="18" />
  </component>
</template>

<style lang="scss" scoped>
.icon-button {
  width: 32px;

  &--active {
    border-color: var(--color-text-base);
  }
}
</style>

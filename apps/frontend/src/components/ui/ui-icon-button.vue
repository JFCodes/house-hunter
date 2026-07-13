<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { computed, type Component } from 'vue'

const props = defineProps<{
  icon: Component
  linkTo?: RouteLocationRaw
  isActive: boolean
  href?: string
}>()

const bindProps = computed(() => {
  if (props.linkTo) {
    // RouterLink props
    return {
      to: props.linkTo
    }
  } else if (props.href) {
    // Anchor props
    return {
      rel: 'nofollow noopener noreferrer external',
      href: props.href,
      target: '_blank',
    }
  } else {
    // Button props
    return {}
  }
})

</script>

<template>
  <component
    type="button"
    class="hh-base-button icon-button"
    :class="{ 'icon-button--active': isActive }"
    :is="linkTo ? RouterLink : (href ? 'a' : 'button')"
    v-bind="bindProps">
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

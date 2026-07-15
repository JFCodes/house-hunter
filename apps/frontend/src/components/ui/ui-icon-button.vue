<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { computed, type Component } from 'vue'
// App
import type { UiButtonType } from '@/components/ui/types'

const props = withDefaults(
  defineProps<{
    icon: Component
    linkTo?: RouteLocationRaw
    type?: UiButtonType
    href?: string
  }>(),
  { type: 'link' }
)

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
    return {
      type: props.type
    }
  }
})

</script>

<template>
  <component
    type="button"
    class="--base-button icon-button"
    :is="linkTo ? RouterLink : (href ? 'a' : 'button')"
    :class="[`--base-button--${type}`]"
    v-bind="bindProps">

    <component
      :is="icon"
      :size="22" />

  </component>
</template>

<style lang="scss" scoped>
.icon-button {
  width: 36px;
}
</style>

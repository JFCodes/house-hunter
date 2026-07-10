<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  color?: string
}>()

const styleString = computed(() => {
  const styles: Array<string> = []
  if (props.color) {
    styles.push(`border-color:${props.color}`)
    styles.push(`color:${props.color}`)
  }
  return styles.join(';')
})
</script>

<template>
  <span class="badge hh-text-2xs hh-font-light" :style="styleString">
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.badge {
  border: solid 1px var(--color-text-base);
  border-radius: var(--radius-sm);
  padding: 0 var(--spacing-xs);
  align-items: center;
  line-height: 24px;
  display: flex;
  height: 24px;
}
</style>

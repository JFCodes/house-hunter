<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  backGroundColor?: string
  borderColor?: string
  textColor?: string
  height?: number
  width?: number | string
}>()

const styleString = computed(() => {
  const styles: Array<string> = []

  if (props.backGroundColor) styles.push(`background-color:${props.backGroundColor}`)
  if (props.borderColor) styles.push(`border-color:${props.borderColor}`)
  if (props.textColor) styles.push(`color:${props.textColor}`)

  if (props.width) {
    typeof props.width === 'number'
      ? styles.push(`width:${props.width}px`)
      : styles.push(`width:${props.width}`)
  }

  if (props.height) {
    styles.push(`line-height:${props.height}px`)
    styles.push(`height:${props.height}px`)
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
  width: fit-content;
  line-height: 24px;
  display: flex;
  height: 24px;
}
</style>

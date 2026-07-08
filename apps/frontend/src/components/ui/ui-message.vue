<script setup lang="ts">
import { computed } from 'vue'
// Components
import { CircleAlert, CircleCheck, CircleX, Info } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'success' | 'warning' | 'danger'
    maxWidth?: number
    message?: string
  }>(),
  { type: 'info' },
)

const styleString = computed<string>(() => {
  const styles: Array<string> = []

  if (props.maxWidth) styles.push(`max-width:${props.maxWidth}px`)

  console.log({ styles: styles.join(';') })
  return styles.join(';')
})
</script>

<template>
  <div class="message" :class="`message--${type}`" :style="styleString">
    <slot name="icon">
      <Info v-if="type === 'info'" color="var(--color-info-text)" :size="20" />
      <CircleCheck v-else-if="type === 'success'" color="var(--color-success-text)" :size="20" />
      <CircleAlert v-else-if="type === 'warning'" color="var(--color-warning-text)" :size="20" />
      <CircleX v-else-if="type === 'danger'" color="var(--color-danger-text)" :size="20" />
    </slot>
    <div>
      <slot name="message">
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  border-radius: var(--radius-md);
  border: solid 1px transparent;
  padding: var(--spacing-xs);
  gap: var(--spacing-xs);
  display: flex;
  width: 100%;

  &--info {
    background-color: var(--color-info-muted);
    border-color: var(--color-info);
  }

  &--success {
    background-color: var(--color-success-muted);
    border-color: var(--color-success);
  }

  &--warning {
    background-color: var(--color-warning-muted);
    border-color: var(--color-warning);
  }

  &--danger {
    background-color: var(--color-danger-muted);
    border-color: var(--color-danger);
  }
}
</style>
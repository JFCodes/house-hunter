<script setup lang="ts">
const slots = defineSlots<{
  default(): void
  header(): void
  footer(): void
}>()

defineProps<{ noPadding?: boolean }>()
</script>

<template>
  <div class="card">
    <div v-if="slots['header']" class="card__header">
      <slot name="header"></slot>
    </div>

    <div class="card__content" :class="{ 'card__content--no-padding': noPadding }">
      <slot></slot>
    </div>

    <div v-if="slots['footer']" class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: solid 1px var(--color-border);
  border-radius: var(--radius-md);
  flex-direction: column;
  overflow: hidden;
  display: flex;

  &__header {
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: solid 1px var(--color-border);
  }

  &__content {
    padding: var(--spacing-sm) var(--spacing-md);
    flex: 1;

    &--no-padding {
      padding: 0;
    }
  }

  &__footer {
    padding: var(--spacing-sm) var(--spacing-md);
    border-top: solid 1px var(--color-border);
  }
}
</style>

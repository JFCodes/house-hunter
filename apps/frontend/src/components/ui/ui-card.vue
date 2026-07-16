<script setup lang="ts">
const slots = defineSlots<{
  default(): void
  header(): void
  footer(): void
}>()

defineProps<{
  noPadding?: boolean
  highlight?: boolean
}>()
</script>

<template>
  <div class="card" :class="{ 'card--highlight': highlight }">
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
  box-shadow: 0 0 4px rgba(229, 231, 235, 0.04);
  border: solid 1px var(--c-card-border-color);
  background-color: var(--c-card-background);
  border-radius: var(--radius-md);
  flex-direction: column;
  overflow: hidden;
  display: flex;

  &__header {
    padding: var(--s-sm) var(--s-md);
    border-bottom: solid 1px var(--c-card-border-color);
  }

  &__content {
    padding: var(--s-sm) var(--s-md);
    //   flex: 1;

    //   &--no-padding {
    //     padding: 0;
    //   }
  }

  &__footer {
    border-top: solid 1px var(--c-card-border-color);
    padding: var(--s-sm) var(--s-md);
  }

  &--highlight {
    border-color: var(--c-card-active-border-color);
  }
}
</style>

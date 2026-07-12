<script setup lang="ts">
defineProps<{ label: string }>()
defineSlots<{
  default(props: { id: string }): void
  'before-label'(): void
  'after-label'(): void
}>()

const internalId = crypto.randomUUID()
</script>

<template>
  <div class="form-field">
    <label class="form-field__label hh-font-bold" :for="internalId">
      <slot name="before-label"></slot>
      {{ label }}
      <slot name="after-label"></slot>
    </label>

    <slot :id="internalId"></slot>
  </div>
</template>
<style lang="scss" scoped>
.form-field {
  padding: var(--spacing-xs);

  &__label {
    margin-bottom: var(--spacing-2xs);
    padding-left: var(--spacing-xs);
    font-size: var(--spacing-sm);
    text-transform: uppercase;
    gap: var(--spacing-xs);
    align-items: center;
    display: flex;
  }
}
</style>
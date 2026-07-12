<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
// Components
import CompFormsFormField from '@/components/forms/f-form-field.vue'

defineSlots<{
  'before-label'(): void
  'after-label'(): void
}>()

defineProps<{ label: string, attributes?: InputHTMLAttributes }>()

const value = defineModel<string>({ default: '' })
</script>

<template>
  <CompFormsFormField :label="label">
    <template #before-label>
      <slot name="before-label"></slot>
    </template>

    <template #after-label>
      <slot name="after-label"></slot>
    </template>

    <template #default="{ id }">
      <input v-model="value" class="input" :id="id" />
    </template>
  </CompFormsFormField>
</template>
<style lang="scss" scoped>
.input {
  background-color: var(--color-background-emphasis);
  border: solid 1px var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-base);
  padding: 0 var(--spacing-xs);
  line-height: 28px;
  height: 36px;
  width: 100%;

  &:focus-within {
    border-color: var(--color-border-active);
    outline: none;
  }
}
</style>
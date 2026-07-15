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
      <input v-model="value" class="--base-input input" :id="id" />
    </template>
  </CompFormsFormField>
</template>

<style lang="scss">
.input {
  height: 40px;
}
</style>

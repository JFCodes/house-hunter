<script setup lang="ts">
// App
import type { UiSelectOption } from '../ui/types'
// Components
import { X } from '@lucide/vue'

defineProps<{
  option: UiSelectOption
  isActive: boolean
}>()
</script>

<template>
  <div
    class="select-option hh-py-2xs hh-px-xs hh-pointer"
    :class="{ 'select-option--active': isActive }">
    <p>{{ option.label }}</p>
    <X v-if="isActive" class="select-option__delete" :size="22" />
  </div>
</template>
<style lang="scss" scoped>
.select-option {
  border: solid 1px transparent;
  border-bottom-color: var(--color-border);
  position: relative;

  &__delete {
    transform: translateY(-50%);
    right: var(--spacing-xs);
    position: absolute;
    top: 50%;
  }

  &--active {
    background-color: var(--color-border-active);
  }

  &:hover {
    background-color: var(--color-text-muted);
  }
}
</style>
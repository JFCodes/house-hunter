<script setup lang="ts">
// App
import type { UiSelectOption } from '../ui/types'

defineProps<{
  option: UiSelectOption
  isActive: boolean
}>()
</script>

<template>
  <div
    class="select-option hh-py-2xs hh-px-xs hh-pointer"
    :class="{ 'select-option--active': isActive }">
    {{ option.label }}
  </div>
</template>
<style lang="scss" scoped>
.select-option {
  border: solid 1px transparent;

  &--active {
    border-color: bsa;
  }

  &:hover {
    background-color: var(--color-text-muted);
  }
}
</style>
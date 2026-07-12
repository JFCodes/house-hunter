<script setup lang="ts">
// Components
import { X } from '@lucide/vue'

const emits = defineEmits<{ 'remove-value': [] }>()
defineProps<{ value: string }>()
</script>

<template>
  <div class="select-pill">
    {{ value }}
    <X
      class="hh-ml-sm hh-pointer"
      :size="12"
      @click.stop="emits('remove-value')" />
  </div>
</template>
<style lang="scss" scoped>
.select-pill {
  align-items: center;
  display: flex;
  border: solid 1px var(--color-white);
  font-size: var(--spacing-sm);
  padding: 0 var(--spacing-xs);
  border-radius: var(--radius-sm);
  line-height: 22px;
  cursor: default;
  height: 22px;
}
</style>
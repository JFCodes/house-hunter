<script setup lang="ts" generic="K extends string">
import type { IconToggleItem } from '@/components/ui/types'

const emits = defineEmits<{ 'item-click': [key: string] }>()
defineProps<{ items: Array<IconToggleItem<K>> }>()

</script>

<template>
  <div v-if="items.length > 1" class="icon-toggle">
    <div
      v-for="(item, index) in items"
      class="icon-toggle__item hh-pointer"
      :class="{ 'icon-toggle__item--active': item.isActive }"
      :key="`icon-${index}`"
      @click="emits('item-click', item.key)">
      <component :is="item.icon" :size="20" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-toggle {

  &__item {
    display: inline-block;
    padding: var(--spacing-2xs);
    border: solid 1px var(--color-white);

    &--active {
      border-color: var(--color-border-active);
      color: var(--color-border-active);
    }

    &:first-child {
      border-bottom-left-radius: var(--radius-md);
      border-top-left-radius: var(--radius-md);
    }

    &:last-child {
      border-bottom-right-radius: var(--radius-md);
      border-top-right-radius: var(--radius-md);
    }
  }
}
</style>
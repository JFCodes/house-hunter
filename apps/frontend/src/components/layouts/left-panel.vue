<script setup lang="ts">
defineProps<{ panelWidth: number }>()
</script>

<template>
  <div class="left-panel" :style="`grid-template-columns: ${panelWidth}px 1fr;`">
    <div>
      <slot name="left"></slot>
    </div>
    <div class="left-panel__main">
      <slot name="main"></slot>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.left-panel {
  gap: var(--s-md);
  overflow: hidden;
  display: grid;
  height: 100%;

  &__main {
    overflow-y: auto;
    max-height: 100%;
  }
}
</style>
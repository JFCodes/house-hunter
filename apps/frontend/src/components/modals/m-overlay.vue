<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{ 'overlay-click': [] }>()

const overlayRef = ref<null | HTMLDivElement>(null)

const onOverlayClick = (event: MouseEvent): void => {
  if (!overlayRef.value) return
  if (!event.target) return

  const targetIsOverlay = overlayRef.value.isSameNode(event.target as HTMLDivElement)
  if (targetIsOverlay) emits('overlay-click')
}
</script>

<template>
  <div ref="overlayRef" class="modal-overlay" @click="onOverlayClick">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  background-color: var(--color-border-active-90);
  padding: var(--spacing-2xl);
  justify-content: center;
  align-items: center;
  position: fixed;
  display: flex;
  z-index: 8000;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
</style>

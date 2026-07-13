<script setup lang="ts">
import type { Component } from 'vue'
// Components
import type { T_UI_Toast } from '@/components/ui/types'
import { OctagonAlert, CircleCheck, CircleX, Info, X } from '@lucide/vue'

const emits = defineEmits<{ 'dismiss': [] }>()
defineProps<{ toast: T_UI_Toast }>()

const ICONS: Record<T_UI_Toast['type'], Component> = {
  'warning': OctagonAlert,
  'success': CircleCheck,
  'danger': CircleX,
  'info': Info,
}

</script>

<template>
  <div
    class="toast"
    :class="`toast--${toast.type}`">

    <div class="toast__dismiss hh-pointer" @click="emits('dismiss')">
      <X :size="18" />
    </div>

    <div>
      <component :is="ICONS[toast.type]" :size="22" />
    </div>

    <div>
      <p>{{ toast.title }}</p>
      <p
        v-for="(message, index) in toast.messages"
        :key="index">
        {{ message }}
      </p>
    </div>

  </div>
</template>

<style lang="scss">
.toast {
  padding: var(--spacing-2xs) var(--spacing-xs);
  background-color: var(--color-text-muted);
  border: solid 1px var(--color-text-muted);
  padding-right: var(--spacing-lg);
  border-radius: var(--radius-sm);
  gap: var(--spacing-sm);
  position: relative;
  width: 320px;
  display: flex;

  &__dismiss {
    padding: var(--spacing-2xs);
    right: var(--spacing-2xs);
    top: var(--spacing-2xs);
    position: absolute;
  }

  &--info {
    background-color: var(--color-info-text);
    border-color: var(--color-info);
  }

  &--success {
    background-color: var(--color-success-text);
    border-color: var(--color-success);
  }

  &--warning {
    background-color: var(--color-warning-text);
    border-color: var(--color-warning);
  }

  &--danger {
    background-color: var(--color-danger);
    border-color: var(--color-danger-text);
  }
}
</style>
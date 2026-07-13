<script setup lang="ts">
import type { T_TaskExecution } from '@house-hunter/types'
import { RotateCcw } from '@lucide/vue'

defineProps<{ execution: T_TaskExecution }>()
</script>

<template>
  <div class="task-execution hh-text-3xs hh-uppercase hh-font-bold">
    <RotateCcw class="task-execution__icon" :size="17" />
    {{ $t('global.activeTask') }}: {{ execution.task.source }} ({{ $t(`enums.taskType.${execution.task.type}`) }})
  </div>
</template>

<style lang="scss" scoped>
.task-execution {
  background-color: var(--color-border-active-90);
  border: solid 1px var(--color-border-active);
  border-radius: var(--radius-sm);
  padding: 0 var(--spacing-sm);
  gap: var(--spacing-xs);
  align-items: center;
  line-height: 30px;
  display: flex;
  height: 32px;

  &__icon {
    animation: linear 1s spin infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
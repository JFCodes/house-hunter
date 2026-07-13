<script setup lang="ts">
import type { T_TaskExecution, T_TaskExecutionResult } from '@house-hunter/types'
import { SearchCheck, SearchX } from '@lucide/vue'

defineProps<{
  result: Omit<T_TaskExecutionResult, 'postings'>
  execution: T_TaskExecution
}>()
</script>

<template>
  <div
    class="task-execution hh-text-3xs hh-uppercase hh-font-bold"
    :class="{ 'task-execution--error': result.outcome !== 'success' }">

    <SearchCheck v-if="result.outcome === 'success'" :size="17" />
    <SearchX v-else :size="17" />

    {{ $t('global.activeTask') }}: {{ execution.task.source }} ({{ $t(`enums.taskType.${execution.task.type}`) }})
  </div>
</template>

<style lang="scss" scoped>
.task-execution {
  background-color: var(--color-success-muted);
  border: solid 1px var(--color-success-text);
  border-radius: var(--radius-sm);
  padding: 0 var(--spacing-sm);
  gap: var(--spacing-xs);
  align-items: center;
  line-height: 30px;
  display: flex;
  height: 32px;

  &--error {
    background-color: var(--color-danger-muted);
    border: solid 1px var(--color-danger);
  }
}
</style>
<script setup lang="ts">
import type { T_TaskExecution, T_TaskExecutionResult } from '@house-hunter/types'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
// Components
import CompUiTaskBadge from '@/components/ui/ui-task-badge.vue'
import { SearchCheck, SearchX } from '@lucide/vue'

const props = defineProps<{
  result: Omit<T_TaskExecutionResult, 'postings'>
  execution: T_TaskExecution
}>()

const { t } = useI18n()

const label = computed<string>(() => {
  const { source, type } = props.execution.task
  const taskType = t(`enums.taskType.${type}`)
  const activeTask = t('global.activeTask')
  return `${activeTask}: ${source} ${taskType}`
})
</script>

<template>
  <CompUiTaskBadge
    :icon="result.outcome === 'success' ? SearchCheck : SearchX"
    :type="result.outcome === 'success' ? 'success' : 'error'"
    :label="label" />

</template>

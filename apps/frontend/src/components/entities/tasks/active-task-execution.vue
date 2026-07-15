<script setup lang="ts">
import type { T_TaskExecution } from '@house-hunter/types'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
// Components
import CompUiTaskBadge from '@/components/ui/ui-task-badge.vue'
import { RotateCcw } from '@lucide/vue'

const props = defineProps<{ execution: T_TaskExecution }>()

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
    type="running"
    :icon="RotateCcw"
    :label="label" />

  <div class="task-execution --text-xs -uppercase --font-bold">
    <RotateCcw class="task-execution__icon" :size="17" />
    {{ $t('global.activeTask') }}: {{ execution.task.source }} ({{ $t(`enums.taskType.${execution.task.type}`) }})
  </div>
</template>

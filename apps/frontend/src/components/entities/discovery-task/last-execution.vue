<script setup lang="ts">
import type { T_Execution, T_DiscoveryTask, T_ExecutionResult } from '@house-hunter/data-model'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
// Components
import CompUiTaskBadge from '@/components/ui/ui-task-badge.vue'
import { SearchCheck, SearchX } from '@lucide/vue'

const props = defineProps<{
  result: Omit<T_ExecutionResult, 'data'>
  execution: T_Execution<T_DiscoveryTask>
}>()

const { t } = useI18n()

const label = computed<string>(() => {
  const { target } = props.execution.task
  const activeTask = t('global.activeTask')
  return `${activeTask}: ${target}`
})
</script>

<template>
  <CompUiTaskBadge
    :icon="result.outcome === 'success' ? SearchCheck : SearchX"
    :type="result.outcome === 'success' ? 'success' : 'error'"
    :label="label" />

</template>

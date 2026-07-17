<script setup lang="ts">
import type { T_Execution, T_DiscoveryTask } from '@house-hunter/data-model'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
// Components
import CompUiTaskBadge from '@/components/ui/ui-task-badge.vue'
import { RotateCcw } from '@lucide/vue'

const props = defineProps<{ execution: T_Execution<T_DiscoveryTask> }>()

const { t } = useI18n()

const label = computed<string>(() => {
  const { target } = props.execution.task
  const activeTask = t('global.activeTask')
  return `${activeTask}: ${target} 'discover ads'`
})
</script>

<template>
  <CompUiTaskBadge
    type="running"
    :icon="RotateCcw"
    :label="label" />
</template>

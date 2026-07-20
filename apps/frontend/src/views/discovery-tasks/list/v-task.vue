<script setup lang="ts">
import type { T_DiscoveryTask } from '@house-hunter/data-model'
import { computed, watch, ref } from 'vue'
// App
import { useDiscoveryTasksStore } from '@/stores/discovery-tasks'
import { useRouterUtils } from '@/composables/router-utils'
import { useApi } from '@/composables/api'
import { E_ROUTER_PARAMS } from '@/router/enums'
// Components
import CompEntityDiscoveryTaskFieldBuildingType from '@/components/entities/discovery-task/fields/field-building-type.vue'
import CompEntityDiscoveryTaskFieldLocation from '@/components/entities/discovery-task/fields/field-location.vue'
import CompEntityDiscoveryTaskStatusBadge from '@/components/entities/discovery-task/status-badge.vue'
import CompUiButton from '@/components/ui/ui-button.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

const { computedStringParam } = useRouterUtils()
const { discoveryTasks: apiDiscoveryTasks } = useApi()
const discoveryTasksStore = useDiscoveryTasksStore()

const taskId = computedStringParam(E_ROUTER_PARAMS.TASK_ID)
const editableTask = ref<null | T_DiscoveryTask>(null)
const isLaunchingTask = ref(false)
const isUpdating = ref(false)

const task = computed<null | T_DiscoveryTask>(() => {
  if (!taskId.value) return null
  return discoveryTasksStore.tasks.find(t => t.id === taskId.value) ?? null
})

const isExecutingTask = computed(() => {
  return false
  // if (!task.value) return false
  // if (!tasksStore.activeTaskExecution) return false
  // return tasksStore.activeTaskExecution.task.id === task.value.id
})

const hasChanges = computed(() => {
  if (!task.value || !editableTask.value) return false
  return JSON.stringify(task.value) !== JSON.stringify(editableTask.value)
})

const canSave = computed(() => {
  if (!editableTask.value) return false

  if (editableTask.value.options.buildingTypes.length === 0) return false
  if (!editableTask.value.options.location) return false

  return true
})

const cloneTask = (task: T_DiscoveryTask | null): void => {
  editableTask.value = task !== null
    ? JSON.parse(JSON.stringify(task))
    : null
}

const schedule = (): void => {
  if (!task.value) return

  isLaunchingTask.value = true
  apiDiscoveryTasks
    .schedule(task.value.id)
    .finally(() => isLaunchingTask.value = false)
}

const save = (): void => {
  if (!taskId.value) return
  if (!editableTask.value) return

  isUpdating.value = true
  discoveryTasksStore
    .patch(taskId.value, { options: editableTask.value?.options })
    .then(result => {
      if (result) cloneTask(result)
    })
    .finally(() => isUpdating.value = false)
}

watch(task, cloneTask, { immediate: true })
</script>

<template>
  <CompUiEmpty v-if="!editableTask">
    <p class="--text-md">{{ $t('notFound.task') }}</p>
  </CompUiEmpty>

  <CompUiCard v-else :is-loading="isUpdating">
    <template #header>
      <header class="header">
        <div class="--group">
          <CompEntityDiscoveryTaskStatusBadge :status="editableTask.status" />
          <p class="--font-bold --text-lg">
            {{ editableTask.target.replaceAll('-', ' ') }}
          </p>
        </div>
        <div class="--group">
          <CompUiButton
            filled
            type="primary"
            :is-loading="isLaunchingTask || isExecutingTask"
            :label="$t('pages.task.discoveryTask.trigger')"
            @click="schedule" />
        </div>
      </header>
    </template>

    <div>
      <CompEntityDiscoveryTaskFieldLocation v-model="editableTask.options.location" class="--mb-sm" />
      <CompEntityDiscoveryTaskFieldBuildingType v-model="editableTask.options.buildingTypes" />
    </div>

    <template #footer>
      <div class="--group --group--end">
        <CompUiButton
          type="success"
          :label="$t('global.save')"
          :disabled="!canSave || !hasChanges"
          @click="() => save()" />
      </div>
    </template>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.header {
  justify-content: space-between;
  gap: var(--spacing-xs);
  align-items: center;
  display: flex;
}
</style>

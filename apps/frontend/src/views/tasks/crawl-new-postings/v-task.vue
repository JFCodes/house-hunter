<script setup lang="ts">
import type { T_Task, T_TaskCrawlNewPostingsWithStatus } from '@house-hunter/types'
import { computed, watch, ref } from 'vue'
// App
import { useRouterUtils } from '@/composables/router-utils'
import { useApi } from '@/composables/api'
import { E_ROUTER_PARAMS } from '@/router/enums'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityCrawlTaskLocationField from '@/components/entities/crawling-task/ct-location-field.vue'
import CompEntityCrawlTaskTypeField from '@/components/entities/crawling-task/ct-type-field.vue'
import CompEntityActiveBadge from '@/components/entities/is-active-badge.vue'
import CompUiButton from '@/components/ui/ui-button.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

const { computedStringParam } = useRouterUtils()
const { tasks: apiTasks } = useApi()
const tasksStore = useTasksStore()

const taskId = computedStringParam(E_ROUTER_PARAMS.TASK_ID)
const editableTask = ref<null | T_TaskCrawlNewPostingsWithStatus>(null)
const isLaunchingTask = ref(false)

const task = computed<null | T_TaskCrawlNewPostingsWithStatus>(() => {
  if (!taskId.value) return null
  return tasksStore.crawlNewPostingTasks.find(t => t.id === taskId.value) ?? null
})


const isExecutingTask = computed(() => {
  if (!task.value) return false
  if (!tasksStore.activeTaskExecution) return false
  return tasksStore.activeTaskExecution.task.id === task.value.id
})

const cloneTask = (task: T_Task | null): void => {
  editableTask.value = task !== null
    ? JSON.parse(JSON.stringify(task))
    : null
}

const scheduleCrawl = (): void => {
  if (!task.value) return

  isLaunchingTask.value = true
  apiTasks.crawlNewPostings
    .schedule(task.value.id)
    .finally(() => isLaunchingTask.value = false)
}

watch(task, cloneTask, { immediate: true })
</script>

<template>
  <CompUiEmpty v-if="!editableTask">
    <p class="--text-md">{{ $t('notFound.task') }}</p>
  </CompUiEmpty>

  <CompUiCard v-else>
    <template #header>
      <header class="header">
        <div class="--group">
          <CompEntityActiveBadge :entity="editableTask" />
          <p class="--font-bold --text-lg">
            {{ editableTask.source.replaceAll('-', ' ') }}
          </p>
        </div>
        <div class="--group">
          <CompUiButton
            filled
            type="primary"
            :is-loading="isLaunchingTask || isExecutingTask"
            :label="$t('pages.task.crawling.triggerCrawl')"
            @click="scheduleCrawl" />
        </div>
      </header>
    </template>

    <div>
      <CompEntityCrawlTaskLocationField v-model="editableTask.options.location" class="--mb-sm" />
      <CompEntityCrawlTaskTypeField v-model="editableTask.options.postingTypes" />
    </div>
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
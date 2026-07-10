<script setup lang="ts">
import type { T_TaskCrawlNewPostingsWithStatus } from '@house-hunter/types'
import { computed } from 'vue'
// App
import { useRouterUtils } from '@/composables/router-utils'
import { E_ROUTER_PARAMS } from '@/router/enums'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityActiveBadge from '@/components/entities/is-active-badge.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

const { computedStringParam } = useRouterUtils()
const tasksStore = useTasksStore()

const taskId = computedStringParam(E_ROUTER_PARAMS.TASK_ID)
const task = computed<null | T_TaskCrawlNewPostingsWithStatus>(() => {
  if (!taskId.value) return null
  return tasksStore.crawlNewPostingTasks.find(t => t.id === taskId.value) ?? null
})
</script>

<template>
  <CompUiEmpty v-if="!task">
    <p class="hh-text-muted hh-text-md">{{ $t('notFound.task') }}</p>
  </CompUiEmpty>

  <CompUiCard v-else>
    <template #header>
      <div class="hh-group">
        <CompEntityActiveBadge :entity="task" />

        <p class="hh-font-bold hh-text-lg">
          {{ task.source.replaceAll('-', ' ') }}
        </p>
      </div>
    </template>

    <pre>{{ task }}</pre>
  </CompUiCard>
</template>

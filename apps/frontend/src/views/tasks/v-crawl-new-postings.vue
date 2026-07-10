<script setup lang="ts">
import { useRouter } from 'vue-router'
import { watch } from 'vue'
// App
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
import { useRouterUtils } from '@/composables/router-utils'
import { useTasksStore } from '@/stores/tasks'
// Components
import TaskCrawlNewPostingsItem from '@/components/pages/tasks/crawl-new-postings-item.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

const { computedStringParam } = useRouterUtils()
const tasksStore = useTasksStore()
const router = useRouter()

const taskId = computedStringParam(E_ROUTER_PARAMS.TASK_ID)

const selectFirstTask = (taskId: null | string) => {
  if (taskId) return

  const firstTask = tasksStore.crawlNewPostingTasks[0]
  if (!firstTask) return

  router.replace({
    params: { [E_ROUTER_PARAMS.TASK_ID]: firstTask.id },
    name: E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS_TASK
  })
}

watch(taskId, selectFirstTask, { immediate: true, flush: 'post' })
</script>

<template>
  <div class="layout">
    <CompUiCard no-padding>
      <TaskCrawlNewPostingsItem
        v-for="task in tasksStore.crawlNewPostingTasks"
        class="task-item"
        :highlight="task.id === taskId"
        :task="task"
        :key="task.id" />
    </CompUiCard>

    <div>
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  grid-template-columns: 520px auto;
  padding: var(--spacing-lg) 0;
  gap: var(--spacing-sm);
  display: grid;
  height: 100%;
}
</style>

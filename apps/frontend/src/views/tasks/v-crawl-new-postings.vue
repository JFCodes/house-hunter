<script setup lang="ts">
import { useRouter } from 'vue-router'
import { watch } from 'vue'
// App
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
import { useRouterUtils } from '@/composables/router-utils'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompLayoutLeftPanel from '@/components/layouts/left-panel.vue'
import TaskCrawlNewPostingsItem from '@/components/pages/tasks/crawl-new-postings-item.vue'

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
  <CompLayoutLeftPanel :panel-width="520">
    <template #left>
      <div class="--group-v">
        <TaskCrawlNewPostingsItem
          v-for="task in tasksStore.crawlNewPostingTasks"
          class="task-item"
          :highlight="task.id === taskId"
          :task="task"
          :key="task.id" />
      </div>
    </template>

    <template #main>
      <RouterView />
    </template>
  </CompLayoutLeftPanel>
</template>

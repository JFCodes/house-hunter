<script setup lang="ts">
import { useRouter } from 'vue-router'
import { watch } from 'vue'
// App
import { useDiscoveryTasksStore } from '@/stores/discovery-tasks'
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
import { useRouterUtils } from '@/composables/router-utils'
// Components
import DiscoveryTypeListItem from '@/components/pages/discovery-tasks/b-list-item.vue'
import CompLayoutLeftPanel from '@/components/layouts/left-panel.vue'

const { computedStringParam } = useRouterUtils()
const discoveryTasksStore = useDiscoveryTasksStore()
const router = useRouter()

const taskId = computedStringParam(E_ROUTER_PARAMS.TASK_ID)

const selectFirstTask = (taskId: null | string) => {
  if (taskId) return

  const firstTask = discoveryTasksStore.tasks[0]
  if (!firstTask) return

  router.replace({
    params: { [E_ROUTER_PARAMS.TASK_ID]: firstTask.id },
    name: E_ROUTER_PAGES.DISCOVERY_TASKS_LIST_TASK
  })
}

watch(taskId, selectFirstTask, { immediate: true, flush: 'post' })
</script>

<template>
  <CompLayoutLeftPanel :panel-width="520">
    <template #left>
      <div class="--group-v">
        <DiscoveryTypeListItem
          v-for="task in discoveryTasksStore.tasks"
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

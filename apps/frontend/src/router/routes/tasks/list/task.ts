import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/tasks/crawl-new-postings/v-task.vue'

const name = E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS_TASK

export const route: RouteRecordRaw = {
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
}

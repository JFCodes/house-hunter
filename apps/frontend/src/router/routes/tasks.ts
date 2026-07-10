import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-tasks.vue'
// Sub routes
import { route as TasksList } from './tasks/list'
import { route as TasksLogs } from './tasks/logs'

const name = E_ROUTER_PAGES.TASKS

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS },
  children: [TasksList, TasksLogs],
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
}

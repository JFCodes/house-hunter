import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/tasks/v-crawl-new-postings.vue'
// Sub routes
import { route as TaskRoute } from './list/task'

const name = E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS

export const route: RouteRecordRaw = {
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  children: [TaskRoute],
  name,
}

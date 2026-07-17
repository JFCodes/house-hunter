import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/discovery-tasks/v-list.vue'
// Sub routes
import { route as TaskRoute } from '@/router/routes/discovery-tasks/list/task'

const name = E_ROUTER_PAGES.DISCOVERY_TASKS_LIST

export const route: RouteRecordRaw = {
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  children: [TaskRoute],
  name,
}

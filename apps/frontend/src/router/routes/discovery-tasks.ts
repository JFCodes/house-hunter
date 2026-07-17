import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-discovery-tasks.vue'
// Sub routes
import { route as ListRoute } from '@/router/routes/discovery-tasks/list'

const name = E_ROUTER_PAGES.DISCOVERY_TASKS

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.DISCOVERY_TASKS_LIST },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  children: [ListRoute],
  name,
}

import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-home.vue'
// Sub routes
import { route as DashboardRoute } from '@/router/routes/home/dashboard'
import { route as SwipeRoute } from '@/router/routes/home/swipe'

const name = E_ROUTER_PAGES.HOME

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.HOME_DASHBOARD },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
  children: [
    DashboardRoute,
    SwipeRoute
  ],
}

import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-ads.vue'
// Sub Routes
import { route as ByStatusRoute } from '@/router/routes/ads/by-status'
import { route as AllRoute } from '@/router/routes/ads/all'

const name = E_ROUTER_PAGES.ADS

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.ADS_ALL },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
  children: [
    AllRoute,
    ByStatusRoute,
  ],
}

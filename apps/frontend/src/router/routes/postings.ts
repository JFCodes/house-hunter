import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-postings.vue'
// Sub Routes
import { route as ByStatusRoute } from './postings/by-status'
import { route as AllRoute } from './postings/all'

const name = E_ROUTER_PAGES.POSTINGS

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.POSTINGS_ALL },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
  children: [
    AllRoute,
    ByStatusRoute,
  ],
}

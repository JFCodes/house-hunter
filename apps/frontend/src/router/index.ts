import { createRouter, createWebHistory } from 'vue-router'
// Routes
import { route as DiscoveryTasksRoute } from '@/router/routes/discovery-tasks'
import { route as NotificationsRoute } from './routes/notifications'
import { route as SettingsRoute } from '@/router/routes/settings'
import { route as HomeRoute} from '@/router/routes/home'
import { route as AdsRoute } from '@/router/routes/ads'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    DiscoveryTasksRoute,
    NotificationsRoute,
    SettingsRoute,
    AdsRoute,
    HomeRoute,
  ],
})

export default router

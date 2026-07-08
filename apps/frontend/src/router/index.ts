import { createRouter, createWebHistory } from 'vue-router'
// Routes
import { route as SettingsRoute } from '@/router/routes/settings'
import { route as HomeRoute} from '@/router/routes/home'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    SettingsRoute,
    HomeRoute
  ],
})

export default router

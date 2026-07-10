import { createRouter, createWebHistory } from 'vue-router'
// Routes
import { route as NotificationsRoute } from './routes/notifications'
import { route as PostingsRoute } from '@/router/routes/postings'
import { route as SettingsRoute } from '@/router/routes/settings'
import { route as TasksRoute } from '@/router/routes/tasks'
import { route as HomeRoute} from '@/router/routes/home'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    NotificationsRoute,
    PostingsRoute,
    SettingsRoute,
    TasksRoute,
    HomeRoute
  ],
})

export default router

import { Router, type Router as RouterType } from 'express'
// Routes
import { router as PostingsRouter } from './routes/postings'
import { router as TasksRouter } from './routes/tasks'
// Controllers
import { controller as TestStuffController } from '../controllers/test-stuff'
import { controller as PingController } from '../controllers/ping'

export const router: RouterType = Router()

router.use('/postings', PostingsRouter)
router.use('/tasks', TasksRouter)

router.get('/test-stuff', TestStuffController)
router.get('/ping', PingController)

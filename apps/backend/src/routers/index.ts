import { Router, type Router as RouterType } from 'express'
// Routes
import { router as DiscoveryTasksRouter } from './routes/discovery-tasks'
import { router as AdsRouter } from './routes/ads'
// Controllers
import { controller as TestStuffController } from '../controllers/test-stuff'
import { controller as PingController } from '../controllers/ping'

export const router: RouterType = Router()

router.use('/discovery-tasks', DiscoveryTasksRouter)
router.use('/ads', AdsRouter)

router.get('/test-stuff', TestStuffController)
router.get('/ping', PingController)

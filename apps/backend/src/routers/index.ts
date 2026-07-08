import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as TestStuffController } from '../controllers/test-stuff'
import { controller as PingController } from '../controllers/ping'

export const router: RouterType = Router()

router.get('/test-stuff', TestStuffController)
router.get('/ping', PingController)

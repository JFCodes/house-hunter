import { Router, type Router as RouterType } from 'express'
import { controller as PingController } from '../controllers/ping'

export const router: RouterType = Router()

router.get('/ping', PingController)

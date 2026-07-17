import { Router, type Router as RouterType } from 'express'
// Routes
import { controller as GetController } from '../../controllers/discovery-tasks/get'

export const router: RouterType = Router()

router.get('', GetController)


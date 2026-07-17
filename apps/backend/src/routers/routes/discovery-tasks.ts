import { Router, type Router as RouterType } from 'express'
// Routes
import { controller as GetController } from '../../controllers/discovery-tasks/get'
import { controller as ScheduleController } from '../../controllers/discovery-tasks/schedule'

export const router: RouterType = Router()

router.post('/:taskId/schedule', ScheduleController)
router.get('', GetController)

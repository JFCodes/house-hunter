import { Router, type Router as RouterType } from 'express'
// Routes
import { controller as ScheduleController } from '../../controllers/discovery-tasks/schedule'
import { controller as PatchController} from '../../controllers/discovery-tasks/patch'
import { controller as GetController } from '../../controllers/discovery-tasks/get'

export const router: RouterType = Router()

router.post('/:taskId/schedule', ScheduleController)
router.patch('/:taskId', PatchController)
router.get('', GetController)

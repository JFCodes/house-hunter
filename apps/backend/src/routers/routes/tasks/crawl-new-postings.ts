import { Router, type Router as RouterType } from 'express'
// Controllers
import { controller as ScheduleController } from '../../../controllers/tasks/crawl-new-postings/schedule'
import { controller as SearchController } from '../../../controllers/tasks/crawl-new-postings/search'

export const router: RouterType = Router()

router.get('/search', SearchController)

router.post('/:taskId/schedule', ScheduleController)

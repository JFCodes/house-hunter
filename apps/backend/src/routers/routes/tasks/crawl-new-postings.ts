import { Router, type Router as RouterType } from 'express'
// Controllers
import { controller as SearchController } from '../../../controllers/tasks/crawl-new-postings/search'

export const router: RouterType = Router()

router.get('/search', SearchController)

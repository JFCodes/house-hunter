import { Router, type Router as RouterType } from 'express'
// Controllers
import { controller as SearchController } from '../../controllers/postings/search'
import { controller as PathHunterFields } from '../../controllers/postings/patch-hunter-fields'

export const router: RouterType = Router()

router.get('/search', SearchController)

router.patch('/:postingId/hunter-fields', PathHunterFields)


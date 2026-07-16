import { Router, type Router as RouterType } from 'express'
// Controllers
import { controller as SearchController } from '../../controllers/postings/search'
import { controller as PatchController } from '../../controllers/postings/patch'

export const router: RouterType = Router()

router.get('/search', SearchController)

router.patch('/:adId/hunter-fields', PatchController)

import { Router, type Router as RouterType } from 'express'
// Routes
import { controller as SearchController } from '../../controllers/ads/search'
import { controller as PatchController } from '../../controllers/ads/patch'

export const router: RouterType = Router()

router.patch('/:adId', PatchController)
router.get('', SearchController)

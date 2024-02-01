import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

const router = Router()

router.post('/', MovieController.create)
router.patch('/:id', MovieController.update)
router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getById)
router.delete('/:id', MovieController.delete)

export default router

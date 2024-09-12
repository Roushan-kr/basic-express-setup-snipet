import {Router} from 'express'
import {createFeedback, getFeedback, getFeedbackById, updateFeedback, deleteFeedback} from '../../controllers/feedback/feedback.controller.js'
import {auth} from '../../middlewares/auth.js'
const router = Router()

router.post('/', auth, createFeedback)
router.get('/', auth, getFeedback)
router.get('/:id', auth, getFeedbackById)
router.put('/:id', auth, updateFeedback)
router.delete('/:id', auth, deleteFeedback) 

export default router
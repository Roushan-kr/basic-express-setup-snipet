import User from '../../models/user/User.model.js'
import {Router} from 'express'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    })

router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

export default router

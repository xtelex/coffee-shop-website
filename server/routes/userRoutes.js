import express from 'express'
import {
  registerUser,
  loginUser,
  getUserProfile,
  addToFavorites,
  removeFromFavorites,
  getFavorites
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUserProfile)
router.post('/favorites/:coffeeId', protect, addToFavorites)
router.delete('/favorites/:coffeeId', protect, removeFromFavorites)
router.get('/favorites', protect, getFavorites)

export default router

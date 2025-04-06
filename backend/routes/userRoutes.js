import express from 'express'
import prisma from '../prisma/client.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router

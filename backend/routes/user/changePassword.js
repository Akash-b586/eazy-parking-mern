import express from 'express';
import auth from '../../middlewares/auth.js';
import prisma from '../../prisma/client.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const router = express.Router();
router.post('/', auth, async (req, res) => {
  const userId = req.userId
  const { currentPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if(!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newhashPassword = await bcrypt.hash(newPassword, 10);
  const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
    }
    if (currentPassword === newPassword) {
        return res.status(400).json({ message: 'New password cannot be the same as current password' });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 8 characters long' });
    }
  try {
    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newhashPassword,
      },
    });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})
export default router;

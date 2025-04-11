import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../../middlewares/auth.js'; 

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/user/profile
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        regDate: true,
        // profileImage is removed since not in schema
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add dummy image URL
    const userWithImage = {
      ...user,
      profileImage: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png', 
    };

    res.json(userWithImage);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

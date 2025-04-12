import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../../middlewares/auth.js'; 

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/user/profile
router.get('/getuserprofile', auth, async (req, res) => {
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

router.patch('/setuserprofile', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email, mobileNumber } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        mobileNumber,
      },
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
      },
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

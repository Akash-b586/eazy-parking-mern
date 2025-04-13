import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../../middlewares/auth.js'; 

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', auth, async (req, res) => {
  try {
    const isAdmin = req.isAdmin;
    const adminId = req.userId;

    if (!isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        adminName: true,
        email: true,
        mobileNumber: true,
        adminRegDate: true,
      },
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const adminWithImage = {
      ...admin,
      profileImage: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png', 
    };

    res.status(200).json(adminWithImage);
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/', auth, async (req, res) => {
  try {
    const adminId = req.userId;
    const isAdmin = req.isAdmin;
    if(!isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { adminName, email, mobileNumber } = req.body;

    const existingAdmin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: {
        adminName,
        email,
        mobileNumber,
      },
    });

    res.status(200).json({
      message: 'Admin profile updated successfully',
      admin: {
        adminName: updatedAdmin.adminName,
        email: updatedAdmin.email,
        mobileNumber: updatedAdmin.mobileNumber,
      },
    });
  } catch (err) {
    console.error('Error updating admin profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

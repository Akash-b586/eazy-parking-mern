import express from 'express';
import prisma from '../../prisma/client.js';
import dotenv from 'dotenv';
import auth from '../../middlewares/auth.js';

const router = express.Router();
dotenv.config();

router.get('/', auth, async (req, res) => {
    try {
        const isAdmin = req.isAdmin; 

        if (!isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const parkingLots = await prisma.parkingLot.findMany({
            select: {
                id: true,
                imgUrl: true,
                price: true,
                bookedSlot: true,
                totalSlot: true,
                location: true,
            },
        });
        
        return res.status(200).json(parkingLots);

    } catch (error) {
        console.error('Error fetching parking lots:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;

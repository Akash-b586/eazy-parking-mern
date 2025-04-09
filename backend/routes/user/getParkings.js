// get all parkinglots for user to book
import express from 'express';
import auth from '../../middlewares/auth.js';
import prisma from '../../prisma/client.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Get all parking lots for user to book
router.get('/', auth, async (req, res) => {
    try {
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
        res.status(200).json(parkingLots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

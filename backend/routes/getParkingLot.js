import express from 'express';
import prisma from '../prisma/client.js';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';

const router = express.Router();
dotenv.config();

// Get Locations Route
router.get('/',auth, async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            const locations = await prisma.parkingLot.findMany();
            //send just the parking lot id, imgUrl ,location
            const res = locations.map((lot) => ({
                id: lot.id,
                name: lot.name,
                locations: lot.locations,
                imgUrl: lot.imgUrl,
            }));
            res.status(200).json(locations);
        }
        else{
            const parkingLot = await prisma.parkingLot.findMany();
            const locations = parkingLot.map((lot) => ({
                id: lot.id,
                name: lot.name,
                locations: lot.locations,
                imgUrl: lot.imgUrl,
                totalSlots: lot.totalSlots,
                bookedSlots: lot.bookedSlots,
                price: lot.price,
            }));
            res.status(200).json(locations);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
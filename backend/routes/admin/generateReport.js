// generate report between two dates
import express from 'express';
import prisma from '../../prisma/prismaClient.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// generate report between two dates
router.post('/', auth, async (req, res) => {
    // Check if the user is an admin
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const { startDate, endDate } = req.body;
        const report = await prisma.booking.findMany({
            where: {
                bookingDate: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
            include: {
                parkingLotId: true,
                userId: true,
                bookId: true,
            },
        });
        res.status(200).json(report);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
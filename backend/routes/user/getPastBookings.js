import express from 'express';
import prisma from '../../prisma/client.js';
import dotenv from 'dotenv';
import auth from '../../middlewares/auth.js';

const router = express.Router();

dotenv.config();

// Get Past Bookings Route
router.get('/', auth, async (req, res) => {
    try {
        const userId = req.userId;
        //date format --> 2025-04-06T14:30:00.000Z
        const currentDate = req.query.uptoDate ? new Date(req.query.currentDate) : new Date();

        const bookings = await prisma.booking.findMany({
            where: {
                userId,
                vehicle: {
                    outTime: {
                        lt: currentDate // past bookings only
                    }
                }
            },
            include: {
                parkingLot: true,
                vehicle: true
            }
        });

        const formattedBookings = bookings.map(booking => ({
            id: booking.bookId,
            parkingLot: {
                id: booking.parkingLotId.id,
                location: booking.parkingLotId.location,
                totalSlot: booking.parkingLotId.totalSlot,
                bookedSlot: booking.parkingLotId.bookedSlot,
                price: booking.parkingLotId.price,
                imgUrl: booking.parkingLotId.imgUrl
            },
            vehicleDetails: booking.vehicle ? {
                id: booking.vehicle.id,
                vehicleCategory: booking.vehicle.vehicleCategory,
                vehicleCompanyName: booking.vehicle.vehicleCompanyName,
                registrationNumber: booking.vehicle.registrationNumber,
                inTime: booking.vehicle.inTime,
                outTime: booking.vehicle.outTime,
                parkingCharge: booking.vehicle.parkingCharge,
                remark: booking.vehicle.remark,
                status: booking.vehicle.status
            } : null,
            paymentId: booking.paymentId
        }));

        res.status(200).json(formattedBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
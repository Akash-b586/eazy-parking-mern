import express from 'express';
import dotenv from 'dotenv';
import auth from '../../middlewares/auth.js';
import prisma from '../../prisma/client.js';

dotenv.config();
const router = express.Router();

// Book Parking Lot Route (Fully Atomic)
router.post('/', auth, async (req, res) => {
    try {
        const {
            parkingLotId,
            vehicleCategory,
            vehicleCompanyName,
            registrationNumber,
            inTime
        } = req.body;
        const userId = req.userId;
        const intime = new Date(inTime);
        const result = await prisma.$transaction(async (tx) => {
            // Get the parking lot
            const parkingLot = await tx.parkingLot.findUnique({
                where: {
                  id: parkingLotId,
                },
              })

            if (!parkingLot) {
                throw new Error('Parking lot not found');
            }

            const availableSlots = parkingLot.totalSlot - parkingLot.bookedSlot;
            if (availableSlots <= 0) {
                throw new Error('No available slots');
            }

            // Update slot count
            await tx.parkingLot.update({
                where: { id: parkingLotId },
                data: { bookedSlot: { increment: 1 } },
            });

            // Create booking
            const booking = await tx.booking.create({
                data: {
                    userId,
                    parkingLotId,
                    paymentId: null,
                },
            });

            // Create vehicle
            
            const vehicle = await tx.vehicle.create({
                data: {
                    bookId: booking.bookId,
                    vehicleCategory,
                    vehicleCompanyName,
                    registrationNumber,
                    inTime: intime,
                    status: 'IN',
                },
            });

            return { booking, vehicle };
        });

        res.status(201).json({
            message: 'Booking successful',
            booking: result.booking,
            vehicle: result.vehicle
        });

    } catch (error) {
        console.error('Booking error:', error);
        const msg =
            error.message === 'Parking lot not found' || error.message === 'No available slots'
                ? error.message
                : 'Server error during booking';
        res.status(500).json({ message: msg });
    }
});

export default router;

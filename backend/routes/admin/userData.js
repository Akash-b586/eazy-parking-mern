import express from "express";
import prisma from "../../prisma/client.js";
import dotenv from "dotenv";
import auth from "../../middlewares/auth.js";

const router = express.Router();
dotenv.config();

router.get("/", auth, async (req, res) => {
  try {
    if (!req.isAdmin) 
      return res.status(403).json({ message: "Access denied" });

    const userData = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        regDate: true,
        email: true,
        mobileNumber: true,
        bookings: {
          select: {
            bookId: true,
            parkingLot: {
              select: {
                location: true,
                price: true,
              },
            },
            vehicle: {
              select: {
                vehicleCategory: true,
                vehicleCompanyName: true,
                registrationNumber: true,
                inTime: true,
                outTime: true,
                status: true,
              },
            },
          },
        },
      },
    });

    // Process insights
    const enrichedUserData = userData.map((user) => {
      const totalSpent = user.bookings.reduce((sum, booking) => {
        return sum + (booking.parkingLot?.price || 0);
      }, 0);

      const currentBookings = user.bookings.filter(
        (booking) =>
          booking.vehicle && booking.vehicle.inTime && !booking.vehicle.outTime
      );

      const pastBookings = user.bookings.filter(
        (booking) => booking.vehicle?.outTime
      );

      return {
        ...user,
        totalSpent,
        name: `${user.firstName} ${user.lastName}`,
        totalBookings: user.bookings.length,
        currentBookings,
        pastBookings,
        vehicles: user.bookings.map((b) => b.vehicle).filter(Boolean),
      };
    });

    res.status(200).json(enrichedUserData);
  } catch (error) {
    console.error("Error fetching user data with insights:", error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;

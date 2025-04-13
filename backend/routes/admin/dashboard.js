import express from 'express';
import auth from '../../middlewares/auth.js';
import prisma from '../../prisma/client.js';

const router = express.Router();


router.get("/stats", auth, async (req, res) => {
  try {
    if (!req.isAdmin) 
      return res.status(403).json({ message: "Access denied" });

    const totalParkingLots = await prisma.parkingLot.count();
    const totalBookings = await prisma.booking.count();
    const totalVehiclesIn = await prisma.vehicle.count({ where: { status: 'IN' } });
    const totalVehiclesOut = await prisma.vehicle.count({ where: { status: 'OUT' } });
    const totalVehiclesHistory = await prisma.vehicle.count({ where: { status: 'DONE' } });
    
    res.status(200).json({ 
      totalParkingLots,
      totalBookings,
      totalVehiclesIn,
      totalVehiclesOut,
      totalVehiclesHistory
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/occupancy", auth, async (req, res) => {
  try {
    if (!req.isAdmin) 
      return res.status(403).json({ message: "Access denied" });
    
    const parkingLots = await prisma.parkingLot.findMany();
    const occupied = parkingLots.reduce((acc, lot) => acc + lot.bookedSlot, 0);
    const empty = parkingLots.reduce((acc, lot) => acc + (lot.totalSlot - lot.bookedSlot), 0);

    res.status(200).json([
      { name: "Occupied", value: occupied },
      { name: "Empty", value: empty }
    ]);
  } catch (error) {
    console.error("Error fetching occupancy data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/trends", auth, async (req, res) => {
  try {
    if (!req.isAdmin)
      return res.status(403).json({ message: "Access denied" });

    const trendData = [];
    for (let i = 6; i >= 0; i--) {
      let day = new Date();
      day.setDate(day.getDate() - i);
      let start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      let end = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);

      const inCount = await prisma.vehicle.count({
        where: { 
          inTime: { gte: start, lt: end }
        }
      });
      const outCount = await prisma.vehicle.count({
        where: { 
          outTime: { gte: start, lt: end }
        }
      });
      const historyCount = await prisma.vehicle.count({
        where: {
          status: 'DONE',
          outTime: { gte: start, lt: end }
        }
      });

      trendData.push({
        date: start.toISOString().split('T')[0], // e.g., "2025-04-30"
        in: inCount,
        out: outCount,
        history: historyCount
      });
    }
    res.status(200).json(trendData);
  } catch (error) {
    console.error("Error fetching trend data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

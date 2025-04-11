import prisma from '../prisma/client.js';
import dotenv from 'dotenv';
dotenv.config();

export async function getUserDashboardData(userId) {
  try {
  // Fetch user bookings with vehicle and parkingLot data
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      vehicle: true,
      parkingLot: true,
    },
  });

  // 🕒 Upcoming booking
  const upcoming = bookings
    .filter(b => b.vehicle?.inTime && new Date(b.vehicle.inTime) > new Date())
    .sort((a, b) => new Date(a.vehicle.inTime) - new Date(b.vehicle.inTime))[0];

  // 📊 Total bookings
  const totalBookings = bookings.length;

  // ⏱️ Time parked
  let totalTimeParked = 0;
  const timeBuckets = {
    '0-1 hr': 0,
    '1-2 hrs': 0,
    '2-4 hrs': 0,
    '4+ hrs': 0,
  };

  // 📅 Monthly booking count & spending
  const monthlyBookingHistory = {};
  const spendingOverTime = {};

  let totalSpent = 0;

  bookings.forEach(booking => {
    const vehicle = booking.vehicle;
    const price = booking.parkingLot?.price || 0;

    // Spending
    totalSpent += price;

    // Monthly aggregation
    const month = new Date(booking.vehicle?.inTime || booking.vehicle?.outTime || Date.now()).toLocaleString('default', { month: 'short' });
    monthlyBookingHistory[month] = (monthlyBookingHistory[month] || 0) + 1;
    spendingOverTime[month] = (spendingOverTime[month] || 0) + price;

    // Time parked
    if (vehicle?.inTime && vehicle?.outTime) {
      const diff = (new Date(vehicle.outTime) - new Date(vehicle.inTime)) / (1000 * 60 * 60); // hours
      totalTimeParked += diff;

      if (diff <= 1) timeBuckets['0-1 hr']++;
      else if (diff <= 2) timeBuckets['1-2 hrs']++;
      else if (diff <= 4) timeBuckets['2-4 hrs']++;
      else timeBuckets['4+ hrs']++;
    }
  });

  return {
    upcomingBooking: upcoming?.vehicle?.inTime || null,
    totalBookings,
    totalTimeParked: Math.round(totalTimeParked),
    totalSpent,
    monthlyBookingHistory,
    timeSpentBuckets: timeBuckets,
    spendingOverTime,
  };
}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
}

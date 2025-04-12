"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/utils/backend";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#00C49F",
  "#FFBB28",
];

const UserDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/user/dashboardData`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <p className="p-6">Loading...</p>;

  const {
    upcomingBooking,
    totalBookings,
    totalTimeParked,
    totalSpent,
    monthlyBookingHistory,
    timeSpentBuckets,
    spendingOverTime,
  } = dashboardData;

  const bookingHistory = Object.entries(monthlyBookingHistory).map(
    ([month, bookings]) => ({ month, bookings })
  );

  const timeSpentData = Object.entries(timeSpentBuckets).map(
    ([label, value]) => ({ name: label, value })
  );

  const pieChartFlag = timeSpentData.some((item: any) => item.value > 0);

  const spendingData = Object.entries(spendingOverTime)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({ month, value }));

  const spendingChartflag = spendingData.some((item: any) => item.value > 0);

  const formattedUpcoming =
    upcomingBooking === null
      ? "NA"
      : dayjs(upcomingBooking).format("DD MMM, hh:mm A");

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Upcoming Booking", value: formattedUpcoming },
          { label: "Total Bookings", value: totalBookings },
          { label: "Time Parked", value: `${totalTimeParked} hrs` },
          { label: "Total Spent", value: `$${totalSpent}` },
        ].map(({ label, value }) => (
          <Card
            key={label}
            className="rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {label}
              </h3>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Booking History Bar Chart */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Monthly Booking History
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  fill={isDark ? "#60a5fa" : "#2563eb"}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time Spent Pie Chart */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Time Spent in Parking
            </h2>
            {!pieChartFlag ? (
              <div className="flex justify-center items-center h-[250px]">
                <img
                  src="/nodata.png"
                  alt="No data"
                  className="w-2/3 h-60 object-contain"
                />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={timeSpentData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    innerRadius={40}
                    paddingAngle={5}
                    label
                  >
                    {timeSpentData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Spending Over Time Line Chart */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Spending Over Time
            </h2>
            {!spendingChartflag ? (
              <p className="text-sm text-muted-foreground">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={isDark ? "#9333ea" : "#7c3aed"}
                    fill={isDark ? "#9333ea55" : "#7c3aed55"}
                    dot
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default UserDashboard;

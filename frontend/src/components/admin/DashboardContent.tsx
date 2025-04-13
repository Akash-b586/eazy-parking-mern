import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { BACKEND_URL } from '@/utils/backend';

const { Title } = Typography;

interface DashboardStats {
  totalParkingLots: number;
  totalBookings: number;
  totalVehiclesIn: number;
  totalVehiclesOut: number;
  totalVehiclesHistory: number;
}

interface OccupancyDataItem {
  name: string;
  value: number;
}

interface TrendDataItem {
  date: string;
  in: number;
  out: number;
  history: number;
}

interface EarningsDataItem {
  month: string;
  earnings: number;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalParkingLots: 0,
    totalBookings: 0,
    totalVehiclesIn: 0,
    totalVehiclesOut: 0,
    totalVehiclesHistory: 0,
  });

  const [occupancyData, setOccupancyData] = useState<OccupancyDataItem[]>([]);
  const [trendData, setTrendData] = useState<TrendDataItem[]>([]);
  const [earningsData, setEarningsData] = useState<EarningsDataItem[]>([]);
  const pieColors = ['#0088FE', '#FF8042', '#00C49F'];

  useEffect(() => {
    const token = Cookies.get('adminToken');
    if (!token) {
      toast.error('Admin token not found');
      return;
    }

    const fetchAll = async () => {
      try {
        const [statsRes, occupancyRes, trendsRes, earningsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/admin/dashboard/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BACKEND_URL}/api/admin/dashboard/occupancy`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BACKEND_URL}/api/admin/dashboard/trends`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BACKEND_URL}/api/admin/dashboard/earnings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats(statsRes.data);
        setOccupancyData(occupancyRes.data);
        setTrendData(trendsRes.data);
        setEarningsData(earningsRes.data);
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        console.error(error);
      }
    };

    fetchAll();
  }, []);

  const monthTickFormatter = (value: string) => {
    const parts = value.split('-');
    if (parts.length === 2) {
      const monthIndex = parseInt(parts[1], 10) - 1;
      return monthNames[monthIndex];
    }
    return value;
  };

  const formatDateToDDMMYYYY = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="p-6 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!text-black dark:!text-white">
          Admin Dashboard
        </Title>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="dark:bg-[#1f1f1f] dark:text-white">
          <Title level={4} className="!text-inherit">Parking Lots</Title>
          <p className="text-2xl">{stats.totalParkingLots}</p>
        </Card>
        <Card className="dark:bg-[#1f1f1f] dark:text-white">
          <Title level={4} className="!text-inherit">Bookings</Title>
          <p className="text-2xl">{stats.totalBookings}</p>
        </Card>
        <Card className="dark:bg-[#1f1f1f] dark:text-white">
          <Title level={4} className="!text-inherit">Vehicles In</Title>
          <p className="text-2xl">{stats.totalVehiclesIn}</p>
        </Card>
        <Card className="dark:bg-[#1f1f1f] dark:text-white">
          <Title level={4} className="!text-inherit">Vehicles Out</Title>
          <p className="text-2xl">{stats.totalVehiclesOut}</p>
        </Card>
        <Card className="dark:bg-[#1f1f1f] dark:text-white">
          <Title level={4} className="!text-inherit">History</Title>
          <p className="text-2xl">{stats.totalVehiclesHistory}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Pie Chart */}
        <Card title="Vehicle Occupancy" className="dark:bg-[#1f1f1f] dark:text-white" styles={{ header: { color: 'inherit' } }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={occupancyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {occupancyData.map((_, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#333', borderRadius: '4px' }} cursor={{ fill: 'transparent' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Line Chart */}
        <Card title="Vehicle Trends" className="dark:bg-[#1f1f1f] dark:text-white" styles={{ header: { color: 'inherit' } }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis
                dataKey="date"
                stroke="currentColor"
                tickFormatter={formatDateToDDMMYYYY}
              />
              <YAxis
                stroke="currentColor"
                label={{
                  value: 'Vehicle Count',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: 'currentColor' },
                }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderRadius: '4px' }} />
              <Legend />
              <Line type="monotone" dataKey="in" name="Upcoming" stroke="#0088FE" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="out" name="Parked" stroke="#FF8042" />
              <Line type="monotone" dataKey="history" name="Settled" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card title="Total Earnings (Per Month)" className="dark:bg-[#1f1f1f] dark:text-white" styles={{ header: { color: 'inherit' } }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsData}>
              <XAxis dataKey="month" stroke="currentColor" tickFormatter={monthTickFormatter} />
              <YAxis
                stroke="currentColor"
                label={{
                  value: 'Earnings (₹)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: 'currentColor' },
                }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderRadius: '4px' }} cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar dataKey="earnings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;

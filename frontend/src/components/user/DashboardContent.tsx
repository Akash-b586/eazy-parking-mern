import {
  BarChart,
  PieChart,
  LineChart,
  barElementClasses
} from '@mui/x-charts'
import {
  Card,
  CardContent,
  Typography,
  useTheme
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import axios from 'axios'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { BACKEND_URL } from '@/utils/backend'
import { ShieldBan } from 'lucide-react'

const UserDashboard = () => {
  const { theme } = useContext(ThemeContext)
  const muiTheme = useTheme()

  const isDark = theme === 'dark'
  const cardBg = isDark ? muiTheme.palette.grey[900] : '#fff'
  const textColor = isDark ? '#fff' : '#1f2937'

  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/dashboardData`,{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      setDashboardData(res.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      
    }
  }
    fetchDashboardData()
  }, [])

  if (!dashboardData) return <p className="p-6">Loading...</p>

  // Parse data
  const {
    upcomingBooking,
    totalBookings,
    totalTimeParked,
    totalSpent,
    monthlyBookingHistory,
    timeSpentBuckets,
    spendingOverTime
  } = dashboardData

  const bookingHistory = Object.entries(monthlyBookingHistory).map(([month, bookings]) => ({
    month,
    bookings
  }))

  const timeSpentData = Object.entries(timeSpentBuckets).map(([label, value]) => ({
    label,
    value
  }))
  const pieChartFlag = timeSpentData.map((item) => item.value).some((value:any) => value > 0)
  const spendingData = Object.entries(spendingOverTime).sort(([a], [b]) => a.localeCompare(b))

  const spendingChartMonths = spendingData.map(([month]) => month)
  const spendingChartValues = spendingData.map(([_, value]) => value)

  const spendingChartflag = spendingChartValues.map((item) => item).some((value:any) => value > 0)

  const formattedUpcoming = dayjs(upcomingBooking).format('DD MMM, hh:mm A')

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Upcoming Booking', value: formattedUpcoming },
          { label: 'Total Bookings', value: totalBookings },
          { label: 'Time Parked', value: `${totalTimeParked} hrs` },
          { label: 'Total Spent', value: `$${totalSpent}` }
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {label}
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Monthly Booking History */}
        <Card style={{ backgroundColor: cardBg }} className="rounded-2xl shadow-md">
          <CardContent>
            <Typography variant="h6" style={{ color: textColor }} className="mb-4">
              Monthly Booking History
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: bookingHistory.map(b => b.month) }]}
              series={[{
                data: bookingHistory.map(b => b.bookings),
                color: isDark ? '#60a5fa' : '#2563eb',
              }]}
              sx={{
                [`.${barElementClasses.root}`]: {
                  rx: 6,
                },
              }}
              height={250}
              grid={{ horizontal: true }}
            />
          </CardContent>
        </Card>

        {/* Time Spent in Parking */}
        <Card style={{ backgroundColor: cardBg }} className="rounded-2xl shadow-md">
          <CardContent>
            <Typography variant="h6" style={{ color: textColor }} className="mb-4">
              Time Spent in Parking
            </Typography>
            {pieChartFlag===false ? (<div>
             <img src="/nodata.png" alt="No data" className="w-2/3 h-72" />
            </div>):(
              <PieChart
              series={[
                {
                  data: timeSpentData,
                  innerRadius: 40,
                  outerRadius: 90,
                  paddingAngle: 3,
                  cornerRadius: 5,
                }
              ]}
              height={250}
            />
            )}
            
          </CardContent>
        </Card>

        {/* Spending Over Time */}
        <Card style={{ backgroundColor: cardBg }} className="rounded-2xl shadow-md">
          <CardContent>
            <Typography variant="h6" style={{ color: textColor }} className="mb-4">
              Spending Over Time
            </Typography>
            {spendingChartflag===false ? (<>No data available</>):(
              <LineChart
              xAxis={[{
                scaleType: 'point',
                data: spendingChartMonths,
              }]}

              series={[{
                data: spendingChartValues,
                label: 'Spent ($)',
                area: true,
                showMark: true,
                curve: 'linear',
                color: isDark ? '#9333ea' : '#7c3aed'
              }]}
              height={250}
              grid={{ vertical: true }}
            />

            )}
            
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default UserDashboard

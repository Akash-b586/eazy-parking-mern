import {
    BarChart,
    PieChart,
    LineChart,
    barElementClasses,
  } from '@mui/x-charts'
  import { Card, CardContent, Typography, useTheme } from '@mui/material'
  import { useContext } from 'react'
  import { ThemeContext } from '@/context/ThemeContext'
  
  const UserDashboard = () => {
    const { theme } = useContext(ThemeContext)
    const muiTheme = useTheme()
  
    const isDark = theme === 'dark'
    const cardBg = isDark ? muiTheme.palette.grey[900] : '#fff'
    const textColor = isDark ? '#fff' : '#1f2937' // gray-800 for light
  
    const bookingHistory = [
      { month: 'Jan', bookings: 3 },
      { month: 'Feb', bookings: 5 },
      { month: 'Mar', bookings: 2 },
      { month: 'Apr', bookings: 6 },
    ]
  
    const totalTimeParked = [
      { label: '0-1 hr', value: 15 },
      { label: '1-2 hrs', value: 30 },
      { label: '2-4 hrs', value: 25 },
      { label: '4+ hrs', value: 10 },
    ]
  
    const favoriteLocations = [
      { location: 'Downtown', visits: 12 },
      { location: 'Airport', visits: 8 },
      { location: 'Mall', visits: 6 },
    ]
  
    const totalSpent = [20, 45, 30, 60]
  
    return (
      <main className="p-6 space-y-10">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
  
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Upcoming Booking', value: '12 Apr, 10:00 AM' },
            { label: 'Total Bookings', value: '18' },
            { label: 'Time Parked', value: '52 hrs' },
            { label: 'Total Spent', value: '$240' }
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
  
        {/* User insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Booking History */}
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
  
          {/* Modern Pie Chart */}
          <Card style={{ backgroundColor: cardBg }} className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" style={{ color: textColor }} className="mb-4">
                Time Spent in Parking
              </Typography>
              <PieChart
                series={[
                  {
                    data: totalTimeParked,
                    innerRadius: 40,
                    outerRadius: 90,
                    paddingAngle: 3,
                    cornerRadius: 5,
                  }
                ]}
                height={250}
        
    
              />
            </CardContent>
          </Card>
  
          {/* Spending Chart */}
          <Card style={{ backgroundColor: cardBg }} className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" style={{ color: textColor }} className="mb-4">
                Spending Over Time
              </Typography>
              <LineChart
                xAxis={[{ 
                    scaleType: 'point',     
                                     data: ['Jan', 'Feb', 'Mar', 'Apr'],
                                   }]}
                series={[{
                  data: totalSpent,
                  label: 'Spent ($)',
                  area: true,
                  showMark: true,
                  curve: 'linear',
                  color: isDark ? '#9333ea' : '#7c3aed'
                }]}
                height={250}
                
                grid={{ vertical: true }}
                
              />
            </CardContent>
          </Card>
        </div>
  
        {/* Favorite Locations */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Frequent Parking Locations</h2>
          <ul className="space-y-2">
            {favoriteLocations.map(loc => (
              <li
                key={loc.location}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
              >
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {loc.location}
                </span>
                <span className="text-blue-500 dark:text-blue-400 font-semibold">
                  {loc.visits} visits
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    )
  }
  
  export default UserDashboard
  
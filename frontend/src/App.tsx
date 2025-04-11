import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SpeedDial, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { Moon, Settings, Sun } from 'lucide-react'
import { useContext, useMemo } from 'react'

import { ThemeContext, ThemeProvider } from './context/ThemeContext'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
// import Admin from './pages/Admin'
import AdminLogin from './pages/adminlogin'
import AdminRegister from './pages/AdminRegister'
import AdminDashboard from './pages/AdminDashboard'
import Logout from './pages/Logout'
import Bookings from './pages/Bookings'
import ProtectedRoute from './components/ProtectedRoute'
import Cookies from 'js-cookie'
import Book from './pages/Book'
import Reports from './pages/Reports'
import Setting from './pages/Setting'


const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <SpeedDial
      ariaLabel="Theme Switcher"
      icon={theme === 'dark' ? <Moon /> : <Sun />}
      sx={{ position: 'fixed', bottom: 16, right: 16, color: 'purple' }}
      onClick={toggleTheme}
    />
  )
}

const AppContent = () => {  
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const isUserAuthenticated = Cookies.get('token') !== null
  const isAdminAuthenticated = Cookies.get('adminToken') !== null

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
        },
      }),
    [isDark]
  )

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeSwitcher />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isUserAuthenticated}
            redirectPath='/login'
            >
            <Dashboard />
            </ProtectedRoute>} />
          <Route path="/admin/login" element={
            <ProtectedRoute isAuthenticated={isAdminAuthenticated}
            >
            <AdminLogin />
            </ProtectedRoute>} />
          <Route path="/admin/register" element={
            <ProtectedRoute isAuthenticated={isAdminAuthenticated}
            >
            <AdminRegister />
            </ProtectedRoute>} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute isAuthenticated={isAdminAuthenticated}
            >
            <AdminDashboard />
            </ProtectedRoute>
            } />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/bookings" element={
            <ProtectedRoute isAuthenticated={isUserAuthenticated}
            redirectPath='/login'
            >
            <Bookings/>
            </ProtectedRoute>} />
          <Route path="/bookings/:id" element={
           <ProtectedRoute isAuthenticated={isUserAuthenticated}
           redirectPath='/login'
           >
            <Book />
            </ProtectedRoute>
            } />
            <Route path ="/settings" element={
            <ProtectedRoute isAuthenticated={isUserAuthenticated}
            redirectPath='/login'
            >
            <Setting />
            </ProtectedRoute>} />
            <Route path ="/reports" element={
            <ProtectedRoute isAuthenticated={isUserAuthenticated}
            redirectPath='/login'
            >
            <Reports />
            </ProtectedRoute>} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App

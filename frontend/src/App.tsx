import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SpeedDial, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { Moon, Sun } from 'lucide-react'
import { useContext, useMemo } from 'react'

import { ThemeContext, ThemeProvider } from './context/ThemeContext'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import AdminLogin from './pages/adminlogin'
import AdminRegister from './pages/AdminRegister'
import AdminDashboard from './pages/AdminDashboard'
import Logout from './pages/Logout'

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<div>404 Not Found</div>} />
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

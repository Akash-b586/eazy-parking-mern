import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedDial, CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { Moon, Sun } from "lucide-react";
import { useContext, useMemo } from "react";

import { ThemeContext, ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import Admin from './pages/Admin'
import AdminLogin from "./pages/adminlogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import Logout from "./pages/Logout";
import Bookings from "./pages/Bookings";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";
import Book from "./pages/Book";
import Reports from "./pages/Reports";
import Setting from "./pages/Setting";
import AdminVehicleCategory from "./pages/AdminVehicleCategory";
import AdminBookings from "./pages/AdminBookings";
import AdminManageVehicle from "./pages/AdminManageVehicle";
import AdminReports from "./pages/AdminReports";
import AdminParkingLot from "./pages/AdminParkingLot";
import { ConfigProvider, theme as antdtheme } from "antd";
import { Toaster } from "react-hot-toast";
import AdminregUser from "./pages/AdminregUser";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <SpeedDial
      ariaLabel="Theme Switcher"
      icon={theme === "dark" ? <Moon /> : <Sun />}
      sx={{ position: "fixed", bottom: 16, right: 16, color: "purple" }}
      onClick={toggleTheme}
    />
  );
};

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const isUserAuthenticated = Cookies.get("token") !== null;
  const isAdminAuthenticated = Cookies.get("adminToken") !== null;

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
        },
      }),
    [isDark]
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ConfigProvider
        theme={
          theme == "dark"
            ? {
                algorithm: antdtheme.darkAlgorithm,
              }
            : {}
        }
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: isDark ? "#333" : "#fff",
              color: isDark ? "#fff" : "#000",
            },
          }}
        />
        <CssBaseline />
        <ThemeSwitcher />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isUserAuthenticated}
                  redirectPath="/login"
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/login"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminLogin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/register"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminRegister />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/category"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminVehicleCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vehicle"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminManageVehicle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/parkinglot"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminParkingLot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/registered-users"
              element={
                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                  <AdminregUser />
                </ProtectedRoute>
              }
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute
                  isAuthenticated={isUserAuthenticated}
                  redirectPath="/login"
                >
                  <Bookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings/:id"
              element={
                <ProtectedRoute
                  isAuthenticated={isUserAuthenticated}
                  redirectPath="/login"
                >
                  <Book />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  isAuthenticated={isUserAuthenticated}
                  redirectPath="/login"
                >
                  <Setting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute
                  isAuthenticated={isUserAuthenticated}
                  redirectPath="/login"
                >
                  <Reports />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ConfigProvider>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

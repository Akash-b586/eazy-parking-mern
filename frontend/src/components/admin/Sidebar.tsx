import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck2,
  ParkingSquare,
  BarChart2,
  Settings,
  X,
  LogOut,
  ListChecks,
  Search,
  Users,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Vehicle Category", path: "/admin/category", icon: ParkingSquare },
  { label: "Bookings", path: "/admin/bookings", icon: CalendarCheck2 },
  { label: "Parking Lot", path: "/admin/parkinglot", icon: ParkingSquare },
  { label: "Manage Vehicle", path: "/admin/vehicle", icon: ListChecks },
  { label: "Reports", path: "/admin/reports", icon: BarChart2 },
  { label: "Search Vehicle", path: "/admin/search-vehicle", icon: Search },
  { label: "Reg Users", path: "/admin/registered-users", icon: Users },
  { label: "Settings", path: "/admin/settings", icon: Settings },
  { label: "Logout", path: "/logout", icon: LogOut },
];

const Sidebar = ({  toggleSidebar }: any) => {
  return (
    <motion.aside
      // initial={{ x: -150 }}
      // animate={{ x: isOpen ? 0 : -150 }}
      // transition={{ type: 'spring', stiffness: 100 }}
      className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-white w-64 h-full fixed top-0 left-0 z-50 p-6 shadow-xl rounded-r-2xl"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold tracking-tighter">
          EAZY<span className="text-gray-500">PARKING</span>
        </h2>
        <button className="md:hidden" onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col gap-3">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                isActive
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;

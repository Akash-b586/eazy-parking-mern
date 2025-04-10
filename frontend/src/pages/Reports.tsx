import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "@/components/user/Sidebar";
import { Report } from "../components/user/Report";
// import axios from "axios";
// import { BACKEND_URL } from "@/utils/backend";
// import { Skeleton } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [loading, setLoading] = useState(true);

  // Auth check
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={true} />
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4">
        <button onClick={toggleSidebar}>
          <Menu size={28} />
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Main Content */}

      <Report/>
    </div>
  );
};

export default Dashboard;


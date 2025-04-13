import { useState } from "react";

import { useParams } from "react-router-dom";

import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import VehicleForm from "@/components/admin/VehicleForm";

const AdminBook = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
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
      <VehicleForm parkingLotId={id} />
    </div>
  );
};

export default AdminBook;

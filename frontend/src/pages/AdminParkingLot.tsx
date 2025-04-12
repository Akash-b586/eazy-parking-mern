import { useState } from "react";

import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import ManageParkingLot from "@/components/admin/ManageParkingLot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddParkingLot from "@/components/admin/AddParkingLot";

const AdminParkingLot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <Tabs defaultValue="manage-parking-lot" className="py-5 px-10">
        <center>
          <TabsList className="bg-zinc-200 dark:bg-zinc-800">
            <TabsTrigger
              value="manage-parking-lot"
              className="hover:cursor-pointer w-44"
            >
              Manage Parking Lot
            </TabsTrigger>
            <TabsTrigger
              value="add-parking-lot"
              className="hover:cursor-pointer w-44"
            >
              Add Parking Lot
            </TabsTrigger>
          </TabsList>
        </center>
        <TabsContent value="manage-parking-lot">
          <ManageParkingLot />
        </TabsContent>
        <TabsContent value="add-parking-lot">
          <AddParkingLot />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminParkingLot;

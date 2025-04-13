import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import { ParkingCardSlider } from "../components/admin/ParkingCardSlider";
import axios from "axios";
import { BACKEND_URL } from "@/utils/backend";
import { toast } from "react-hot-toast";

const AdminBookings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch parking data from API

  
  useEffect(() => {
    const fetchParkingSpots = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('adminToken');
        if (!token) {
          toast.error('Admin token not found');
          return;
        }
  
        const res = await axios.get(`${BACKEND_URL}/api/user/getParkings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const transformed = res.data.map((lot: any) => ({
          id: lot.id,
          image: lot.imgUrl,
          location: lot.location,
          availableSlot: lot.totalSlot - lot.bookedSlot,
          totalSlot: lot.totalSlot,
          price: `₹${lot.price}/hr`,
        }));
  
        setParkingSpots(transformed);
      } catch (error) {
        console.error("Failed to fetch parking spots:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchParkingSpots();
  }, []);

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

      <ParkingCardSlider parkingSpots={parkingSpots} loading={loading} />
    </div>
  );
};

export default AdminBookings;

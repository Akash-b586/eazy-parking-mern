import { useState, useEffect } from "react";
import axios from "axios";
import { CameraIcon, PencilIcon, SaveIcon } from "lucide-react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/utils/backend";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({
    adminName: "",
    email: "",
    mobileNumber: "",
    profileImage: "",
    memberSince: "",
    status: "Active",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...admin });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const token = Cookies.get('adminToken');

  useEffect(() => {
    if (!token) {
      toast.error("Admin token not found!");
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        // setLoading(true);
        //  setError("");

        const res = await axios.get(`${BACKEND_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const {
          adminName,
          email,
          mobileNumber,
          adminRegDate,
          profileImage,
        } = res.data;

        const updatedAdmin = {
          adminName,
          email,
          mobileNumber,
          profileImage,
          memberSince: new Date(adminRegDate).toLocaleDateString(),
          status: "Active",
        };

        setAdmin(updatedAdmin);
        setFormData(updatedAdmin);
      } catch (err: any) {
        console.error(err);
        // setError("Failed to fetch admin profile.");
        toast.error("Error fetching admin profile!");
      } 
    };

    fetchAdminProfile();
  }, []);

  const handleInputChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    axios
      .patch(
        `${BACKEND_URL}/api/admin/profile`,
        {
          adminName: formData.adminName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAdmin((prev) => ({
          ...prev,
          ...formData,
        }));
        setEditMode(false);
        toast.success("Admin profile updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageData = new FormData();
      imageData.append("profileImage", selectedFile);

      axios
        .post("/api/admin/upload-profile", imageData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAdmin((prev) => ({ ...prev, profileImage: res.data.profileImage }));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="min-h-screen text-zinc-800 dark:text-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your admin profile information
          </p>
        </div>

        <div className="relative w-28 h-28 mx-auto">
          <img
            src={admin.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="rounded-full object-cover w-full h-full border-2 border-gray-300 dark:border-gray-600"
          />
          <label
            htmlFor="profileUpload"
            className="absolute bottom-1 right-1 bg-white dark:bg-zinc-700 p-1 rounded-full shadow cursor-pointer"
          >
            <CameraIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </label>
          <input
            type="file"
            id="profileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Admin Name</label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleInputChange}
              readOnly={!editMode}
              className={`w-full p-2 rounded-md ${
                editMode
                  ? "bg-white dark:bg-gray-700"
                  : "bg-gray-100 dark:bg-gray-700"
              } border border-gray-300 dark:border-gray-600`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!editMode}
              className={`w-full p-2 rounded-md ${
                editMode
                  ? "bg-white dark:bg-gray-700"
                  : "bg-gray-100 dark:bg-gray-700"
              } border border-gray-300 dark:border-gray-600`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              readOnly={!editMode}
              className={`w-full p-2 rounded-md ${
                editMode
                  ? "bg-white dark:bg-gray-700"
                  : "bg-gray-100 dark:bg-gray-700"
              } border border-gray-300 dark:border-gray-600`}
            />
          </div>
        </div>

        <div className="pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">Admin Since</span>
            <span>{admin.memberSince}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Account Status</span>
            <span className="text-green-500 font-bold">{admin.status}</span>
          </div>
        </div>

        <button
          onClick={editMode ? handleSaveChanges : () => setEditMode(true)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-4"
        >
          {editMode ? <SaveIcon className="w-4 h-4" /> : <PencilIcon className="w-4 h-4" />}
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}

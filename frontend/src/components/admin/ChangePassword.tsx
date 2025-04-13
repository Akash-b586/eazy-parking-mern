import { BACKEND_URL } from '@/utils/backend';
import { Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SaveIcon } from 'lucide-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async() => {
      if(newPassword !== confirmPassword) {
        setError("New Password and Confirm Password do not match.");
        return;
      }
      const token = Cookies.get("adminToken");
      if (!token) {
        toast.error("Admin token not found!");
        return;
      }
      try {
        setLoading(true);
        setError("");
        const res = await axios.post(`${BACKEND_URL}/api/admin/changepassword`, 
            {
                currentPassword,
                newPassword,
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        )
        if(res.status === 200) {
            
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            toast.success("Password changed successfully.");
            setError("");
        }
      } catch (error:any) {
        setError(error?.response?.data?.message); 
        console.error(error)
        
      }finally{
        setLoading(false);
      }
    };

  return (
    <div className=''>{/* Change Password Section */}
    <Toaster
  position="top-center"
  gutter={8}
/>
    <div className="pt-16 border-t border-gray-300 dark:border-gray-700 max-w-96 flex-col mx-auto justify-center">
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}    
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
        </div>
    {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      <div className='flex justify-center'>
      <Button
          loading={loading}
          onClick={handlePasswordChange}
          disabled={loading}
          variant="outlined"
          loadingPosition="end"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChangePassword;
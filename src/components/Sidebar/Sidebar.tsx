import React, { useState, useEffect } from 'react';
import { X, Clock, User, LogOut, Trash2, Bike, AlertTriangle, House, LogIn , Gift } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ onNavigate }) => {
  const {
    isOpen, closeSidebar, showLogoutDialog, setShowLogoutDialog,
    showDeleteDialog, setShowDeleteDialog
  } = useSidebar();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [initials, setInitials] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if RiderToken exists in localStorage
    const token = localStorage.getItem("RiderToken");
    setIsLoggedIn(!!token);
    
    if (!token) return; // Skip fetching rider data if not logged in

    const fetchRider = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/rider-auth/find-rider`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.success && res.data.rider) {
          const rider = res.data.rider;

          setName(rider.name || "");
          setMobile(rider.mobile || "");

          // ✅ Generate initials from name
          if (rider.name) {
            const words = rider.name.trim().split(" ");
            if (words.length >= 2) {
              setInitials(
                words[0][0].toUpperCase() + words[1][0].toUpperCase()
              );
            } else {
              setInitials(words[0][0].toUpperCase());
            }
          }
        }
      } catch (err) {
        console.error("Error fetching rider:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("RiderToken");
          setIsLoggedIn(false);
        }
      }
    };

    fetchRider();
  }, [navigate]);

  const deleteRider = async () => {
    try {
      const mobile = localStorage.getItem("RiderMobile");

      if (!mobile) {
        console.warn("No RiderMobile found in localStorage");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rider-auth/delete-rider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });

      if (res.status === 200) {
        // ✅ Clear localStorage and redirect
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        const data = await res.json();
        console.error("Failed to delete rider:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting rider:", error);
    }
  };

  const userProfile = {
    name,
    initials,
  };

  const handleNavigation = (path, label) => {
    if (onNavigate) {
      onNavigate(path, label);
    } else {
      // Fallback for window navigation
      window.location.href = path;
    }
    closeSidebar();
  };

  const handleLoginClick = () => {
    closeSidebar();
    navigate('/login');
  };

const menuItems = [
  {
    icon: House,
    label: 'Home',
    onClick: () => {
      handleNavigation('/', 'Home');
      window.location.reload();
    }
  },
  {
    icon: Clock,
    label: 'Current Booked Service',
    onClick: () => {
      handleNavigation('/currentBookings', 'Current Bookings');
      window.location.reload();
    }
  },
  {
    icon: Bike,
    label: 'All Booked Services',
    onClick: () => {
      handleNavigation('/allBookings', 'All Booked Services');
      window.location.reload();
    }
  },
  {
    icon: Gift,
    label: 'Refer & Earn',
    onClick: () => {
      handleNavigation('/refer-and-earn', 'Refer & Earn');
      window.location.reload();
    }
  },
  {
    icon: User,
    label: 'My Profile',
    onClick: () => {
      handleNavigation('/my-profile', 'My Profile');
      window.location.reload();
    }
  },
  {
    icon: LogOut,
    label: 'Logout',
    onClick: () => setShowLogoutDialog(true),
    className: 'text-orange-600 hover:bg-orange-50'
  },
  {
    icon: Trash2,
    label: 'Delete Account',
    onClick: () => setShowDeleteDialog(true),
    className: 'text-red-600 hover:bg-red-50'
  }
];

  const loginButton = {
    icon: LogIn,
    label: 'Login',
    onClick: handleLoginClick,
    className: 'text-blue-600 hover:bg-blue-50'
  };

  const LogoutDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex items-center mb-4">
          <AlertTriangle size={24} className="text-orange-600 mr-3" />
          <h3 className="text-lg font-semibold">Confirm Logout</h3>
        </div>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowLogoutDialog(false)}
            className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowLogoutDialog(false);
              closeSidebar(); // Close sidebar before navigation
              localStorage.clear();
              setIsLoggedIn(false);
              navigate('/login');
            }}
            className="flex-1 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const DeleteDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex items-center mb-4">
          <Trash2 size={24} className="text-red-600 mr-3" />
          <h3 className="text-lg font-semibold">Delete Account</h3>
        </div>
        <p className="text-gray-600 mb-6">
          This action cannot be undone. All your data will be permanently deleted.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowDeleteDialog(false)}
            className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowDeleteDialog(false);
              deleteRider();
              closeSidebar(); // Close sidebar before navigation
            }}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeSidebar} />
      )}

      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bike size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">DriveGo</h2>
              <p className="text-blue-100 text-sm">Welcome back!</p>
            </div>
          </div>
          <button onClick={closeSidebar} className="p-2 rounded-lg hover:bg-blue-500">
            <X size={20} className="text-white" />
          </button>
        </div>

        {isLoggedIn ? (
          <>
            <div className="p-6 border-b bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">{userProfile.initials}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{name}</h3>
                  <p className="text-sm text-gray-600">{mobile}</p>
                </div>
              </div>
            </div>

            <div className="py-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full flex items-center space-x-4 px-6 py-4 text-left transition-colors ${
                      item.className || 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="py-4">
            <button
              onClick={loginButton.onClick}
              className={`w-full flex items-center space-x-4 px-6 py-4 text-left transition-colors ${loginButton.className}`}
            >
              <loginButton.icon size={20} />
              <span className="font-medium">{loginButton.label}</span>
            </button>
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 DriveGo</p>
          </div>
        </div>
      </div>

      {showLogoutDialog && <LogoutDialog />}
      {showDeleteDialog && <DeleteDialog />}
    </>
  );
};

export default Sidebar;
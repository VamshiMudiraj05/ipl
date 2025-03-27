import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Heart, User, MessageSquare, Settings, LogOut, Menu } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Find PG', path: '/seeker-dashboard/find-pg' },
  { icon: Building, label: 'My Bookings', path: '/seeker-dashboard/bookings' },
  { icon: Heart, label: 'Saved PGs', path: '/seeker-dashboard/saved-pgs' },
  { icon: User, label: 'Profile', path: '/seeker-dashboard/profile' },
  { icon: MessageSquare, label: 'Messages', path: '/seeker-dashboard/messages' },
];

const SeekerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedPGs, setSavedPGs] = useState(0);
  const [activeBookings, setActiveBookings] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  useEffect(() => {
    // Fetch seeker dashboard stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/seeker/stats`);
      const data = await response.json();
      
      setSavedPGs(data.savedPGs || 0);
      setActiveBookings(data.activeBookings || 0);
      setUnreadMessages(data.unreadMessages || 0);
      setProfileCompleteness(data.profileCompleteness || 0);
    } catch (error) {
      console.error('Error fetching seeker stats:', error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative bg-black min-h-[calc(100vh-120px)] flex overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="z-40 w-64 bg-black/90 border-r border-orange-600 p-4 space-y-4"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Seeker Dashboard</h1>
          
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-orange-600 text-white transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userType');
              window.location.reload();
            }}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 text-white transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Content + Overlay */}
      <div className="flex-1 relative">
        {/* Blur Overlay */}
        {isSidebarOpen && (
          <div
            className="absolute inset-0 z-30 backdrop-blur-sm bg-black/20 transition"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="relative z-20 p-6">
          {/* Hamburger Button */}
          <button
            id="hamburger-button"
            onClick={toggleSidebar}
            className="mb-4 p-2 rounded bg-orange-600 text-white hover:bg-orange-500 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="bg-black/80 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Welcome to Your Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Saved PGs</h3>
                <p className="text-3xl font-bold text-orange-500">{savedPGs}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Active Bookings</h3>
                <p className="text-3xl font-bold text-orange-500">{activeBookings}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Messages</h3>
                <p className="text-3xl font-bold text-orange-500">{unreadMessages}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Profile Completeness</h3>
                <p className="text-3xl font-bold text-orange-500">{profileCompleteness}%</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition">
                  <Link to="/seeker-dashboard/find-pg" className="flex items-center space-x-2">
                    <Home className="w-5 h-5" />
                    <span>Find PG</span>
                  </Link>
                </button>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition">
                  <Link to="/seeker-dashboard/bookings" className="flex items-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>View Bookings</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;

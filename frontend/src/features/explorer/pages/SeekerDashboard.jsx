import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Building, Heart, User, MessageSquare, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { icon: Home, label: 'Find PG', path: '/seeker-dashboard/find-pg' },
  { icon: Building, label: 'My Bookings', path: '/seeker-dashboard/bookings' },
  { icon: Heart, label: 'Saved PGs', path: '/seeker-dashboard/saved-pgs' },
  { icon: User, label: 'Profile', path: '/seeker-dashboard/profile' },
  { icon: MessageSquare, label: 'Messages', path: '/seeker-dashboard/messages' },
  { icon: LogOut, label: 'Logout', isLogout: true }
];

const SeekerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative bg-black min-h-[calc(100vh-120px)] flex overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="z-40 w-64 bg-black/90 border-r border-orange-600 p-4 space-y-4"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Seeker Dashboard</h1>
          
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.isLogout) {
                  handleLogout();
                } else {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-orange-600 text-white transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
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

          {/* Dashboard Content */}
          <div className="bg-black/80 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Welcome to Your Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.filter(item => !item.isLogout).map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="bg-black/50 p-6 rounded-lg border border-orange-600 hover:border-orange-500 transition-colors text-left"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.label}</h3>
                  </div>
                  <p className="text-gray-400">Click to view {item.label.toLowerCase()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;

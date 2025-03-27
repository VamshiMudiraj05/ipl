import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, User, DollarSign, ChartBar, MessageSquare, Settings, LogOut, Menu, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/admin-dashboard' },
  { 
    icon: Building, 
    label: 'PG Management',
    path: '/admin-dashboard/pg-management',
    children: [
      { icon: FileText, label: 'Available PGs', path: '/admin-dashboard/pg-management/available' },
      { icon: CheckCircle2, label: 'Approved PGs', path: '/admin-dashboard/pg-management/approved' },
      { icon: AlertCircle, label: 'PG Requests', path: '/admin-dashboard/pg-management/requests' },
      { icon: Building, label: 'PG Categories', path: '/admin-dashboard/pg-management/categories' }
    ]
  },
  { icon: User, label: 'User Management', path: '/admin-dashboard/users' },
  { icon: DollarSign, label: 'Revenue', path: '/admin-dashboard/revenue' },
  { icon: ChartBar, label: 'Analytics', path: '/admin-dashboard/analytics' },
  { icon: MessageSquare, label: 'Messages', path: '/admin-dashboard/messages' },
  { icon: Settings, label: 'Settings', path: '/admin-dashboard/settings' },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [activeBookings, setActiveBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activePGs, setActivePGs] = useState(0);
  const [pendingPGRequests, setPendingPGRequests] = useState(0);

  useEffect(() => {
    // Fetch admin dashboard stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/stats`);
      const data = await response.json();
      
      setPendingApprovals(data.pendingApprovals || 0);
      setTotalProperties(data.totalProperties || 0);
      setActiveBookings(data.activeBookings || 0);
      setTotalRevenue(data.totalRevenue || 0);
      setActivePGs(data.activePGs || 0);
      setPendingPGRequests(data.pendingPGRequests || 0);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
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
          <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
          
          {menuItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <Link
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-orange-600 text-white transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
              
              {item.children && (
                <div className="pl-8">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      to={child.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-orange-600 text-white transition-colors text-sm"
                    >
                      <child.icon className="w-4 h-4" />
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
            <h2 className="text-2xl font-bold text-white mb-6">Welcome to Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Active PGs</h3>
                <p className="text-3xl font-bold text-orange-500">{activePGs}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Pending PG Requests</h3>
                <p className="text-3xl font-bold text-orange-500">{pendingPGRequests}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Total Properties</h3>
                <p className="text-3xl font-bold text-orange-500">{totalProperties}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-orange-500">₹{totalRevenue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

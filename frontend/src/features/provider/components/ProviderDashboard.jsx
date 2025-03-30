import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Building,
  User,
  DollarSign,
  ChartBar,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  Plus,
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/provider-dashboard' },
  { icon: Building, label: 'My Properties', path: '/provider-dashboard/properties' },
  { icon: Plus, label: 'Add New Property', path: '/provider-dashboard/add-property' },
  { icon: User, label: 'My Bookings', path: '/provider-dashboard/bookings' },
  { icon: User, label: 'My Tenants', path: '/provider-dashboard/tenants' },
  { icon: DollarSign, label: 'Payments', path: '/provider-dashboard/payments' },
  { icon: ChartBar, label: 'Analytics', path: '/provider-dashboard/analytics' },
  { icon: MessageSquare, label: 'Messages', path: '/provider-dashboard/messages' },
  { icon: Settings, label: 'Settings', path: '/provider-dashboard/settings' },
];

const ProviderDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      !e.target.closest('#hamburger-button')
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const ownerName = user.name;
      const ownerProperties = await propertyApi.getPropertiesByOwner(ownerName);
      setProperties(ownerProperties);
    } catch (err) {
      setError('Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (propertyId) => {
    navigate(`/provider/edit-property/${propertyId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="relative bg-black min-h-[calc(100vh-120px)] flex overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="z-40 w-64 bg-black/90 border-r border-orange-600 p-4 space-y-4"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Features</h1>
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
            <h2 className="text-2xl font-bold text-white mb-6">Welcome to Provider Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Total Properties</h3>
                <p className="text-3xl font-bold text-orange-500">{properties.length}</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Active Bookings</h3>
                <p className="text-3xl font-bold text-orange-500">0</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-orange-600">
                <h3 className="text-xl font-semibold text-white mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-orange-500">₹0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Large Action Button with Label */}
        <div className="flex flex-col items-center mt-10 space-y-2">
          <button
            onClick={() => navigate('/provider-dashboard/add-property')}
            className="bg-orange-600 hover:bg-orange-500 text-white shadow-lg rounded-full w-20 h-20 flex items-center justify-center transition"
          >
            <Plus className="w-8 h-8" />
          </button>
          <span className="text-white text-lg font-medium">Add New Property</span>
        </div>

        <div className="container mx-auto px-4 py-8 mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">My Properties</h2>
          
          {properties.length === 0 ? (
            <p className="text-gray-500 text-center">No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {property.images && property.images.length > 0 && (
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{property.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(property.approvalStatus)}`}>
                        {property.approvalStatus}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{property.city}, {property.area}</p>
                    <p className="text-gray-600 mb-2">₹{property.rent}/month</p>
                    <p className="text-gray-600 mb-4">{property.rooms} rooms</p>

                    {property.approvalStatus === 'REJECTED' && property.rejectionReason && (
                      <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        <p className="font-semibold">Rejection Reason:</p>
                        <p>{property.rejectionReason}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={property.approvalStatus === 'APPROVED'}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;

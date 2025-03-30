import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Edit, Trash2, Plus } from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const ownerProperties = await propertyApi.getPropertiesByOwner(user.email);
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
    navigate(`/provider-dashboard/edit-property/${propertyId}`);
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyApi.deleteProperty(propertyId);
        toast.success('Property deleted successfully');
        loadProperties(); // Reload the properties list
      } catch (err) {
        toast.error('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">My Properties</h1>
            <button
              onClick={() => navigate('/provider-dashboard/add-property')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              <Plus className="h-5 w-5" />
              Add New Property
            </button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-black/80 p-6 rounded-xl shadow-xl border border-orange-600 hover:shadow-orange-500/20 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-orange-500" />
                  <h2 className="text-xl font-semibold text-white">
                    {property.name}
                  </h2>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-300">
                    <span className="font-medium">Location:</span> {property.city}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Price:</span> ₹{property.price}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Capacity:</span>{' '}
                    {property.capacity} beds
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {property.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(property.id)}
                      className="p-2 text-orange-500 hover:text-orange-600 transition-colors duration-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                You haven't added any properties yet.
              </p>
              <button
                onClick={() => navigate('/provider-dashboard/add-property')}
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
              >
                Add Your First Property
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProperties; 
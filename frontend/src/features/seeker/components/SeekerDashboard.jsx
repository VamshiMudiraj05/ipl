import React, { useState, useEffect } from 'react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SeekerDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadApprovedProperties();
  }, []);

  const loadApprovedProperties = async () => {
    try {
      setLoading(true);
      const approvedProperties = await propertyApi.getApprovedProperties();
      setProperties(approvedProperties);
    } catch (err) {
      setError('Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/seeker/property/${propertyId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Properties</h2>
      
      {properties.length === 0 ? (
        <p className="text-gray-500 text-center">No properties available</p>
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
                <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                <p className="text-gray-600 mb-2">{property.city}, {property.area}</p>
                <p className="text-gray-600 mb-2">₹{property.rent}/month</p>
                <p className="text-gray-600 mb-4">{property.rooms} rooms</p>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => handleViewDetails(property.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
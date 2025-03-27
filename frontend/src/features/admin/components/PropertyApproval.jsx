import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ArrowLeft } from 'lucide-react';

const PropertyApproval = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/properties/pending`);
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (propertyId, action) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/properties/${propertyId}/approval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        // Refresh the list after approval
        fetchPendingProperties();
      }
    } catch (error) {
      console.error('Error handling approval:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto bg-black/80 rounded-xl p-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-black/50 hover:bg-black/70 text-orange-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white ml-4">Property Approvals</h1>
        </div>

        {properties.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No pending property approvals
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-black/50 rounded-xl p-6 border border-orange-600"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Property Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">Name: {property.name}</p>
                      <p className="text-gray-300">Type: {property.type}</p>
                      <p className="text-gray-300">City: {property.city}</p>
                      <p className="text-gray-300">Area: {property.area}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Provider Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">Name: {property.provider.name}</p>
                      <p className="text-gray-300">Email: {property.provider.email}</p>
                      <p className="text-gray-300">Phone: {property.provider.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    onClick={() => handleApproval(property.id, 'reject')}
                    className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
                  >
                    <X className="w-4 h-4 inline-block mr-2" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApproval(property.id, 'approve')}
                    className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-500 transition"
                  >
                    <Check className="w-4 h-4 inline-block mr-2" />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyApproval;

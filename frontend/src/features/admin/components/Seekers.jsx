import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Building, Search } from 'lucide-react';
import { adminApi } from '../../../services/api';
import { toast } from 'react-hot-toast';

const Seekers = () => {
  const navigate = useNavigate();
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeekers();
  }, []);

  const fetchSeekers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getSeekers();
      setSeekers(response || []);
    } catch (error) {
      console.error('Error fetching seekers:', error);
      setError('Failed to load seekers');
      toast.error('Failed to load seekers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading seekers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center text-white hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-6">PG Seekers</h1>

        {seekers.length === 0 ? (
          <div className="text-white text-center py-8">No seekers found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seekers.map((seeker) => (
              <div key={seeker.id} className="bg-black/80 border border-orange-600 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-white">{seeker.name}</h2>
                    <p className="text-gray-400">Seeker ID: {seeker.id}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{seeker.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{seeker.email}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Building className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{seeker.preferredCity || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Search className="w-5 h-5 mr-2 text-orange-500" />
                    <span>Budget: ₹{seeker.budget || 'Not specified'}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-orange-600/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Joined:</span>
                    <span className="text-white">
                      {new Date(seeker.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Seekers; 
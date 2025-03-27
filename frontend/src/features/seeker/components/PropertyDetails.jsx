import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const PropertyDetails = ({ property }) => {
  const [mapDetails, setMapDetails] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    if (property.latitude && property.longitude) {
      setMapDetails({
        lat: property.latitude,
        lng: property.longitude,
      });
    }
  }, [property]);

  const handleGetDirections = async () => {
    try {
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;

          // Get directions
          const directions = await axios.get(`/api/locations/directions/${property.id}`, {
            params: {
              currentLocation: `${currentLat},${currentLng}`
            }
          });

          // Open Google Maps with directions
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${property.latitude},${property.longitude}&travelmode=driving`,
            '_blank'
          );
        });
      }
    } catch (error) {
      console.error('Error getting directions:', error);
    }
  };

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
          <h1 className="text-2xl font-bold text-white ml-4">Property Details</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property Details */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Property Information</h2>
            <div className="space-y-4">
              <p className="text-gray-300">{property.description}</p>
              <p className="text-gray-300">Address: {property.address}</p>
              <p className="text-gray-300">City: {property.city}</p>
              <p className="text-gray-300">Area: {property.area}</p>
            </div>
          </div>

          {/* Map and Navigation */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
            {mapDetails && (
              <div className="space-y-4">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapDetails}
                    zoom={15}
                  >
                    <Marker position={mapDetails} />
                  </GoogleMap>
                </LoadScript>
                <button
                  onClick={handleGetDirections}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Get Directions
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

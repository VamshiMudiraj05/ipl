import React from 'react';

const PropertyDetails = ({ formData, handleChange, errors }) => {
  const amenities = [
    'Wi-Fi',
    'AC',
    'Laundry',
    'Food',
    'Parking',
    'Security',
    'Power Backup',
    'TV',
    'Fridge',
    'Housekeeping'
  ];

  const handleAmenityChange = (amenity) => {
    const currentAmenities = formData.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    handleChange({
      target: {
        name: 'amenities',
        value: newAmenities
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">PG Property Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-gray-200">PG Name</label>
          <input
            type="text"
            name="pgName"
            value={formData.pgName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter PG name"
          />
          {errors.pgName && <span className="text-red-500 text-sm">{errors.pgName}</span>}
        </div>

        <div className="col-span-2 space-y-1">
          <label className="text-gray-200">PG Address</label>
          <textarea
            name="pgAddress"
            value={formData.pgAddress}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter complete PG address"
            rows="3"
          />
          {errors.pgAddress && <span className="text-red-500 text-sm">{errors.pgAddress}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Number of Available Rooms</label>
          <input
            type="number"
            name="availableRooms"
            value={formData.availableRooms}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter number of rooms"
            min="1"
          />
          {errors.availableRooms && <span className="text-red-500 text-sm">{errors.availableRooms}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Room Types Available</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleChange({
                target: {
                  name: 'hasSingleRooms',
                  value: !formData.hasSingleRooms
                }
              })}
              className={`p-2 border rounded-lg transition-all duration-300 ${
                formData.hasSingleRooms
                  ? 'border-orange-500 bg-black/80 text-white'
                  : 'border-gray-700 bg-black/60 text-gray-300 hover:border-orange-600'
              }`}
            >
              Single Rooms
            </button>
            <button
              type="button"
              onClick={() => handleChange({
                target: {
                  name: 'hasSharedRooms',
                  value: !formData.hasSharedRooms
                }
              })}
              className={`p-2 border rounded-lg transition-all duration-300 ${
                formData.hasSharedRooms
                  ? 'border-orange-500 bg-black/80 text-white'
                  : 'border-gray-700 bg-black/60 text-gray-300 hover:border-orange-600'
              }`}
            >
              Shared Rooms
            </button>
          </div>
          {errors.roomTypes && <span className="text-red-500 text-sm">{errors.roomTypes}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Monthly Rent Range (₹)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="rentMin"
              value={formData.rentMin}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
              placeholder="Min"
              min="0"
            />
            <input
              type="number"
              name="rentMax"
              value={formData.rentMax}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
              placeholder="Max"
              min="0"
            />
          </div>
          {errors.rent && <span className="text-red-500 text-sm">{errors.rent}</span>}
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-gray-200">Available Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {amenities.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => handleAmenityChange(amenity)}
                className={`p-2 border rounded-lg transition-all duration-300 ${
                  formData.amenities?.includes(amenity)
                    ? 'border-orange-500 bg-black/80 text-white'
                    : 'border-gray-700 bg-black/60 text-gray-300 hover:border-orange-600'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
          {errors.amenities && <span className="text-red-500 text-sm">{errors.amenities}</span>}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

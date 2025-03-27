import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AccommodationPreferences = ({ formData, handleChange, errors }) => {
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
      <h3 className="text-xl font-semibold text-white">Accommodation Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-gray-200">Budget Range (₹)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="budgetMin"
              value={formData.budgetMin}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
              placeholder="Min"
              min="0"
            />
            <input
              type="number"
              name="budgetMax"
              value={formData.budgetMax}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
              placeholder="Max"
              min="0"
            />
          </div>
          {errors.budget && <span className="text-red-500 text-sm">{errors.budget}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Preferred Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
          >
            <option value="">Select Room Type</option>
            <option value="single">Single</option>
            <option value="shared">Shared</option>
          </select>
          {errors.roomType && <span className="text-red-500 text-sm">{errors.roomType}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Gender-based PG</label>
          <select
            name="genderPreference"
            value={formData.genderPreference}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
          >
            <option value="">Select Preference</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.genderPreference && <span className="text-red-500 text-sm">{errors.genderPreference}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Food Preferences</label>
          <select
            name="foodPreference"
            value={formData.foodPreference}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
          >
            <option value="">Select Preference</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
          {errors.foodPreference && <span className="text-red-500 text-sm">{errors.foodPreference}</span>}
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-gray-200">Required Amenities</label>
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

AccommodationPreferences.propTypes = {
  formData: PropTypes.shape({
    budgetMin: PropTypes.string,
    budgetMax: PropTypes.string,
    roomType: PropTypes.string,
    genderPreference: PropTypes.string,
    foodPreference: PropTypes.string,
    amenities: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    budget: PropTypes.string,
    roomType: PropTypes.string,
    genderPreference: PropTypes.string,
    foodPreference: PropTypes.string,
    amenities: PropTypes.string
  })
};

export default AccommodationPreferences;

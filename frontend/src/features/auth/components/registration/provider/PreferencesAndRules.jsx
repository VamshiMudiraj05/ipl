import { useState } from 'react';
import PropTypes from 'prop-types';

const PreferencesAndRules = ({ formData, handleChange, errors }) => {
  const [houseRules] = useState([
    'No Smoking',
    'No Alcohol',
    'No Pets',
    'No Guests',
    'No Loud Music',
    'Fixed Entry/Exit Time'
  ]);

  const handleRuleChange = (rule) => {
    const currentRules = formData.houseRules || [];
    const newRules = currentRules.includes(rule)
      ? currentRules.filter(r => r !== rule)
      : [...currentRules, rule];
    
    handleChange({
      target: {
        name: 'houseRules',
        value: newRules
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Preferences and Rules</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-gray-200">Preferred Tenants</label>
          <select
            name="preferredTenants"
            value={formData.preferredTenants}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
          >
            <option value="">Select Preference</option>
            <option value="students">Students Only</option>
            <option value="professionals">Working Professionals Only</option>
            <option value="both">Both Students and Professionals</option>
          </select>
          {errors.preferredTenants && <span className="text-red-500 text-sm">{errors.preferredTenants}</span>}
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
            <option value="male">Male Only</option>
            <option value="female">Female Only</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.genderPreference && <span className="text-red-500 text-sm">{errors.genderPreference}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Security Deposit (₹)</label>
          <input
            type="number"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter deposit amount"
            min="0"
          />
          {errors.depositAmount && <span className="text-red-500 text-sm">{errors.depositAmount}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Notice Period (days)</label>
          <input
            type="number"
            name="noticePeriod"
            value={formData.noticePeriod}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter notice period"
            min="0"
          />
          {errors.noticePeriod && <span className="text-red-500 text-sm">{errors.noticePeriod}</span>}
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-gray-200">House Rules</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {houseRules.map((rule) => (
              <button
                key={rule}
                type="button"
                onClick={() => handleRuleChange(rule)}
                className={`p-2 border rounded-lg transition-all duration-300 ${
                  formData.houseRules?.includes(rule)
                    ? 'border-orange-500 bg-black/80 text-white'
                    : 'border-gray-700 bg-black/60 text-gray-300 hover:border-orange-600'
                }`}
              >
                {rule}
              </button>
            ))}
          </div>
          {errors.houseRules && <span className="text-red-500 text-sm">{errors.houseRules}</span>}
        </div>

        <div className="col-span-2 space-y-1">
          <label className="text-gray-200">Additional Rules (Optional)</label>
          <textarea
            name="additionalRules"
            value={formData.additionalRules}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white h-24 resize-none"
            placeholder="Enter any additional rules or requirements..."
          />
        </div>
      </div>
    </div>
  );
};

PreferencesAndRules.propTypes = {
  formData: PropTypes.shape({
    preferredTenants: PropTypes.string,
    genderPreference: PropTypes.string,
    depositAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    noticePeriod: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    houseRules: PropTypes.arrayOf(PropTypes.string),
    additionalRules: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    preferredTenants: PropTypes.string,
    genderPreference: PropTypes.string,
    depositAmount: PropTypes.string,
    noticePeriod: PropTypes.string,
    houseRules: PropTypes.string
  })
};

export default PreferencesAndRules;

import React, { useState } from 'react';
import { X, Calendar, Users, CreditCard, Mail } from 'lucide-react';
import { bookingApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const BookingForm = ({ property, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    paymentMethod: 'PAYPAL', // Set default to PayPal only
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calculatedAmount, setCalculatedAmount] = useState({ inr: 0, usd: 0, days: 0 });
  const navigate = useNavigate();
  const { user } = useAuth();

  // Ensure user is logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  // Update date input validation
  const getTodayString = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getMaxDateString = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2); // Allow bookings up to 2 years in advance
    const day = String(maxDate.getDate()).padStart(2, '0');
    const month = String(maxDate.getMonth() + 1).padStart(2, '0');
    const year = maxDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Convert DD/MM/YYYY to Date object
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Calculate amounts with DD/MM/YYYY format
  const calculateAmounts = (checkIn, checkOut) => {
    console.log('Calculating amounts with:', { 
      checkIn, 
      checkOut, 
      price: property?.rent,
      propertyName: property?.name 
    });
    
    if (!checkIn || !checkOut) {
      console.log('Missing dates for calculation');
      return { inr: 0, usd: 0, days: 0 };
    }

    if (!property?.rent) {
      console.error('Property rent is not available:', property);
      return { inr: 0, usd: 0, days: 0 };
    }

    try {
      const checkInDate = parseDate(checkIn);
      const checkOutDate = parseDate(checkOut);
      
      if (!checkInDate || !checkOutDate) {
        console.log('Invalid date format');
        return { inr: 0, usd: 0, days: 0 };
      }

      // Validate year is reasonable (between 2024 and 2100)
      const year = checkInDate.getFullYear();
      if (year < 2024 || year > 2100) {
        console.log('Invalid year in dates');
        return { inr: 0, usd: 0, days: 0 };
      }
      
      if (checkOutDate <= checkInDate) {
        console.log('Check-out date must be after check-in date');
        return { inr: 0, usd: 0, days: 0 };
      }

      const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const totalInr = days * property.rent;
      const USD_CONVERSION_RATE = 0.012;
      const totalUsd = Number((totalInr * USD_CONVERSION_RATE).toFixed(2));

      const result = {
        inr: totalInr,
        usd: totalUsd,
        days: days
      };
      
      console.log('Calculation result:', result);
      return result;
    } catch (error) {
      console.error('Error calculating amounts:', error);
      return { inr: 0, usd: 0, days: 0 };
    }
  };

  const validateDateFormat = (dateString) => {
    if (!dateString) return true; // Empty is valid, will be caught by required field
    
    // Check format DD/MM/YYYY
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) return false;

    const [_, day, month, year] = dateString.match(regex);
    const numDay = parseInt(day, 10);
    const numMonth = parseInt(month, 10);
    const numYear = parseInt(year, 10);

    // Basic validation
    if (numMonth < 1 || numMonth > 12) return false;
    if (numDay < 1 || numDay > 31) return false;
    if (numYear < 2024 || numYear > 2100) return false;

    // Check valid day for month
    const daysInMonth = new Date(numYear, numMonth, 0).getDate();
    if (numDay > daysInMonth) return false;

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For date fields, validate format
    if ((name === 'checkInDate' || name === 'checkOutDate')) {
      // Allow empty value or backspace
      if (!value || value.length < formData[name].length) {
        const newFormData = {
          ...formData,
          [name]: value
        };
        setFormData(newFormData);
        return;
      }

      // Auto-format as user types
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 8) {
        let formatted = cleaned;
        if (cleaned.length > 4) {
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
        } else if (cleaned.length > 2) {
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        
        const newFormData = {
          ...formData,
          [name]: formatted
        };
        setFormData(newFormData);

        // Only calculate if we have a valid date
        if (validateDateFormat(formatted)) {
          const amounts = calculateAmounts(
            name === 'checkInDate' ? formatted : formData.checkInDate,
            name === 'checkOutDate' ? formatted : formData.checkOutDate
          );
          setCalculatedAmount(amounts);
        }
      }
      return;
    }

    // Handle non-date fields normally
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD for input value
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  // Function to validate and format date for API
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handlePaymentMethodChange = (method) => {
    const newFormData = {
      ...formData,
      paymentMethod: method
    };
    setFormData(newFormData);
    
    // Recalculate amounts with current dates
    const amounts = calculateAmounts(
      newFormData.checkInDate,
      newFormData.checkOutDate
    );
    setCalculatedAmount(amounts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (calculatedAmount.inr <= 0) {
        throw new Error("Invalid dates selected");
      }

      // Create booking data with formatted dates and seeker's email
      const bookingData = {
        propertyId: property.id,
        seekerId: user.id, // Use user ID from context
        email: user.email, // Seeker's email
        checkInDate: formatDateForAPI(formData.checkInDate),
        checkOutDate: formatDateForAPI(formData.checkOutDate),
        numberOfGuests: formData.numberOfGuests,
        totalAmount: calculatedAmount.inr,
        paymentMethod: formData.paymentMethod,
        status: formData.paymentMethod === 'CASH' ? 'PENDING' : 'CONFIRMED',
        paymentStatus: formData.paymentMethod === 'CASH' ? 'PENDING' : 'PAID'
      };

      console.log('Sending booking data:', bookingData);

      // Create booking
      const response = await bookingApi.createBooking(bookingData);
      console.log('Booking response:', response);
      
      if (!response || !response.data) {
        throw new Error('Invalid booking response');
      }

      const booking = response.data;
      console.log('Created booking:', booking);

      if (formData.paymentMethod === 'PAYPAL') {
        // Store booking data for PayPal success page
        const pendingBookingData = {
          ...booking,
          propertyName: property.name,
          totalAmount: calculatedAmount.usd // Store USD amount for PayPal
        };
        localStorage.setItem('pendingBooking', JSON.stringify(pendingBookingData));
        
        // Create PayPal payment (in USD)
        const paymentResponse = await bookingApi.createPayPalPayment({
          bookingId: booking.id,
          amount: calculatedAmount.usd, // Use converted USD amount
          currency: 'USD',
          description: `Booking for ${property.name} (${calculatedAmount.days} days)`,
          returnUrl: `${window.location.origin}/seeker/paypal-success`,
          cancelUrl: `${window.location.origin}/seeker/paypal-cancel`
        });

        console.log('PayPal payment request:', {
          bookingId: booking.id,
          amount: calculatedAmount.usd, // Log USD amount
          originalAmount: calculatedAmount.inr.toFixed(2), // Log original INR amount
          currency: 'USD',
          description: `Booking for ${property.name} (${calculatedAmount.days} days)`,
          returnUrl: `${window.location.origin}/seeker/paypal-success`,
          cancelUrl: `${window.location.origin}/seeker/paypal-cancel`
        });

        if (!paymentResponse || !paymentResponse.data || !paymentResponse.data.approvalUrl) {
          throw new Error('Invalid PayPal payment response');
        }

        // Redirect to PayPal
        window.location.href = paymentResponse.data.approvalUrl;
      } else {
        // For cash payments, update booking status to PAID
        await bookingApi.updateBookingStatus(booking.id, 'PAID');
        
        // Show success message and redirect
        toast.success('Booking created successfully! Please complete the payment to confirm your booking.');
        navigate('/seeker/my-bookings');
      }
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error response:', error.response);
      setError(error.response?.data?.message || error.message || 'Failed to create booking');
      toast.error(error.response?.data?.message || error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-black/80 rounded-xl p-6 max-w-md w-full mx-4 border border-orange-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Book {property.name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-orange-600/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Check-in Date */}
          <div>
            <label className="block text-white mb-2">Check-in Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-orange-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                pattern="\d{2}/\d{2}/\d{4}"
                maxLength="10"
              />
            </div>
            {formData.checkInDate && !validateDateFormat(formData.checkInDate) && (
              <div className="text-red-500 text-sm mt-1">
                Please enter a valid date in DD/MM/YYYY format
              </div>
            )}
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-white mb-2">Check-out Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-orange-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                pattern="\d{2}/\d{2}/\d{4}"
                maxLength="10"
              />
            </div>
            {formData.checkOutDate && !validateDateFormat(formData.checkOutDate) && (
              <div className="text-red-500 text-sm mt-1">
                Please enter a valid date in DD/MM/YYYY format
              </div>
            )}
          </div>

          {/* Number of Guests */}
          <div>
            <label className="block text-white mb-2">Number of Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                min="1"
                max={property.capacity}
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-orange-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-white mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-orange-600 rounded-lg text-gray-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Payment Method - Only PayPal */}
          <div>
            <label className="block text-white mb-2">Payment Method</label>
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('PAYPAL')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${formData.paymentMethod === 'PAYPAL' ? 'bg-orange-600' : 'bg-black/50'} border-orange-600 text-white`}
              >
                <CreditCard className="w-5 h-5" />
                PayPal
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {/* Price Display */}
          {property?.rent && (
            <div className="text-white text-sm">
              Price per night: ₹{property.rent.toLocaleString()}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || calculatedAmount.inr <= 0}
            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 
             calculatedAmount.inr > 0 
               ? `Confirm Booking (₹${calculatedAmount.inr.toLocaleString()} / $${calculatedAmount.usd})` 
               : property?.rent
                 ? 'Select dates to see amount'
                 : 'Rent not available'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
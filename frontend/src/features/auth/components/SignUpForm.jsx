import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight, Check, Home, Building } from "lucide-react";

// Seeker Components
import SeekerPersonalDetails from "../components/registration/seeker/PersonalDetails";
import SeekerOccupationDetails from "../components/registration/seeker/OccupationDetails";
import SeekerAccommodationPreferences from "../components/registration/seeker/AccommodationPreferences";
import SeekerVerification from "../components/registration/seeker/Verification";

// Provider Components
import ProviderPersonalDetails from "../components/registration/provider/PersonalDetails";
import ProviderPropertyDetails from "../components/registration/provider/PropertyDetails";
import ProviderPreferencesAndRules from "../components/registration/provider/PreferencesAndRules";
import ProviderVerification from "../components/registration/provider/Verification";

const MultiStepRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    // Personal Information (Common)
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    currentCity: "",

    // Seeker specific fields
    preferredLocation: "",
    occupationType: "",
    // Student fields
    collegeName: "",
    courseName: "",
    yearOfStudy: "",
    collegeAddress: "",
    studentId: "",
    // Professional fields
    companyName: "",
    jobRole: "",
    workExperience: "",
    officeAddress: "",
    workId: "",
    // Accommodation preferences
    budgetMin: "",
    budgetMax: "",
    roomType: "",
    genderPreference: "",
    foodPreference: "",
    amenities: [],

    // Provider specific fields
    pgName: "",
    pgAddress: "",
    availableRooms: "",
    hasSingleRooms: false,
    hasSharedRooms: false,
    rentMin: "",
    rentMax: "",
    amenities: [],
    preferredTenants: "",
    depositAmount: "",
    noticePeriod: "",
    houseRules: [],
    additionalRules: "",

    // Verification fields (Common)
    govtIdType: "",
    govtIdNumber: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    termsAgreed: false,

    // Common field
    userType: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Calculate total steps based on user type
  const totalSteps = userType ? 5 : 1;

  // Calculate progress percentage
  const calculateProgress = () => {
    return Math.round((step / totalSteps) * 100);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    // Reset form data except for common fields
    const commonFields = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      currentCity: formData.currentCity,
      govtIdType: formData.govtIdType,
      govtIdNumber: formData.govtIdNumber,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactNumber: formData.emergencyContactNumber,
      termsAgreed: formData.termsAgreed,
      userType: type
    };
    setFormData({ ...formData, ...commonFields });
    setStep(2);
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 2) {
      // Common personal details validation
      if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.currentCity.trim()) newErrors.currentCity = "Current city is required";
    }

    if (step === 3) {
      if (userType === "seeker") {
        if (!formData.occupationType) newErrors.occupationType = "Please select your occupation";
        
        if (formData.occupationType === "student") {
          if (!formData.collegeName.trim()) newErrors.collegeName = "College name is required";
          if (!formData.courseName.trim()) newErrors.courseName = "Course name is required";
          if (!formData.yearOfStudy) newErrors.yearOfStudy = "Year of study is required";
          if (!formData.collegeAddress.trim()) newErrors.collegeAddress = "College address is required";
        } else if (formData.occupationType === "professional") {
          if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
          if (!formData.jobRole.trim()) newErrors.jobRole = "Job role is required";
          if (!formData.workExperience) newErrors.workExperience = "Work experience is required";
          if (!formData.officeAddress.trim()) newErrors.officeAddress = "Office address is required";
        }
      } else if (userType === "provider") {
        if (!formData.pgName.trim()) newErrors.pgName = "PG name is required";
        if (!formData.pgAddress.trim()) newErrors.pgAddress = "PG address is required";
        if (!formData.availableRooms) newErrors.availableRooms = "Number of rooms is required";
        if (!formData.hasSingleRooms && !formData.hasSharedRooms) {
          newErrors.roomTypes = "Select at least one room type";
        }
        if (!formData.rentMin || !formData.rentMax) {
          newErrors.rent = "Rent range is required";
        }
      }
    }

    if (step === 4) {
      if (userType === "seeker") {
        if (!formData.budgetMin || !formData.budgetMax) newErrors.budget = "Budget range is required";
        if (!formData.roomType) newErrors.roomType = "Room type is required";
        if (!formData.genderPreference) newErrors.genderPreference = "Gender preference is required";
        if (!formData.foodPreference) newErrors.foodPreference = "Food preference is required";
        if (!formData.amenities.length) newErrors.amenities = "Select at least one amenity";
      } else if (userType === "provider") {
        if (!formData.preferredTenants) newErrors.preferredTenants = "Preferred tenants is required";
        if (!formData.genderPreference) newErrors.genderPreference = "Gender preference is required";
        if (!formData.depositAmount) newErrors.depositAmount = "Security deposit amount is required";
        if (!formData.houseRules.length) newErrors.houseRules = "Select at least one house rule";
      }
    }

    if (step === 5) {
      // Verification step validation
      if (!formData.govtIdType) newErrors.govtIdType = "Government ID type is required";
      if (!formData.govtIdNumber) newErrors.govtIdNumber = "Government ID number is required";
      if (!formData.emergencyContactName) newErrors.emergencyContactName = "Emergency contact name is required";
      if (!formData.emergencyContactNumber) newErrors.emergencyContactNumber = "Emergency contact number is required";
      if (!formData.termsAgreed) newErrors.termsAgreed = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const removeEmptyFields = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== "" && value !== null));
  };

  const handleRegister = async () => {
    if (!validateStep()) {
      return;
    }

    try {
      setMessage("Processing registration...");

      // Remove empty fields before submitting
      const submissionData = removeEmptyFields({
        ...formData,
        userType: userType
      });

      // Ensure houseRules is an array
      if (submissionData.houseRules) {
        submissionData.houseRules = Array.isArray(submissionData.houseRules) 
          ? submissionData.houseRules 
          : [submissionData.houseRules];
      }

      // Send to Spring Boot backend
      const endpoint = userType === "seeker" ? 
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register/seeker` :
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register/provider`;

      try {
        const response = await axios.post(endpoint, submissionData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200) {
          setMessage("Registration successful! Redirecting to login page...");
          // Add a small delay before navigation for better UX
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setMessage("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error('Registration error:', error);
        setMessage(
          error.response?.data || 
          error.response?.status === 400 ? error.response?.data || 'Invalid input data' :
          error.response?.status === 409 ? 'Email or phone number already exists' :
          'Registration failed. Please try again.'
        );
      }
    } catch (error) {
      setMessage(
        error.response?.data || 
        error.message || 
        "Registration failed. Please try again."
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Choose Your Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange("seeker")}
                className={`p-6 rounded-lg border transition-all duration-300 flex flex-col items-center gap-4 ${
                  userType === "seeker"
                    ? "border-orange-500 bg-black/90 text-white"
                    : "border-gray-800 bg-black/70 text-gray-400 hover:border-orange-500 hover:text-white"
                }`}
              >
                <Home className="w-12 h-12" />
                <span className="text-lg font-medium">PG Seeker</span>
                <p className="text-sm text-center">Looking for a PG accommodation</p>
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange("provider")}
                className={`p-6 rounded-lg border transition-all duration-300 flex flex-col items-center gap-4 ${
                  userType === "provider"
                    ? "border-orange-500 bg-black/90 text-white"
                    : "border-gray-800 bg-black/70 text-gray-400 hover:border-orange-500 hover:text-white"
                }`}
              >
                <Building className="w-12 h-12" />
                <span className="text-lg font-medium">PG Provider</span>
                <p className="text-sm text-center">Want to list your property</p>
              </button>
            </div>
          </div>
        );
      case 2:
        return userType === "seeker" ? (
          <SeekerPersonalDetails formData={formData} handleChange={handleChange} errors={errors} />
        ) : (
          <ProviderPersonalDetails formData={formData} handleChange={handleChange} errors={errors} />
        );
      case 3:
        return userType === "seeker" ? (
          <SeekerOccupationDetails formData={formData} handleChange={handleChange} errors={errors} />
        ) : (
          <ProviderPropertyDetails formData={formData} handleChange={handleChange} errors={errors} />
        );
      case 4:
        return userType === "seeker" ? (
          <SeekerAccommodationPreferences formData={formData} handleChange={handleChange} errors={errors} />
        ) : (
          <ProviderPreferencesAndRules formData={formData} handleChange={handleChange} errors={errors} />
        );
      case 5:
        return userType === "seeker" ? (
          <SeekerVerification formData={formData} handleChange={handleChange} errors={errors} />
        ) : (
          <ProviderVerification formData={formData} handleChange={handleChange} errors={errors} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-3xl bg-black/90 backdrop-blur-lg p-8 rounded-lg border border-orange-600 shadow-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Step {step} of {totalSteps}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {/* Step Content */}
          {renderStep()}

          {/* Error Message */}
          {message && (
            <div className={`p-4 rounded ${message.includes("successful") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {message}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-800 text-gray-400 hover:border-orange-500 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-black font-medium hover:bg-orange-600 transition-all duration-300 ml-auto"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              step !== 1 && (
                <button
                  type="button"
                  onClick={handleRegister}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-black font-medium hover:bg-orange-600 transition-all duration-300 ml-auto"
                >
                  Register
                  <Check className="w-5 h-5" />
                </button>
              )
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepRegistration;
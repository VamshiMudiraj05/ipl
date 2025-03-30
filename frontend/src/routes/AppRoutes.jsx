import { Route, Routes } from 'react-router-dom';
import LandingPage from '../features/landing/Hero';
import Footer from '../components/common/Footer';
import MultiStepRegistration from '../features/auth/components/SignUpForm';
import SignInForm from '../features/auth/components/SignInForm';
import ProtectedRoute from '../context/ProtectedRoute';
import ProviderDashboard from '../features/provider/components/ProviderDashboard';
import AddProperty from '../features/provider/components/AddProperty';
import MyProperties from '../features/provider/components/MyProperties';
import AdminDashboard from '../features/admin/components/AdminDashboard';
import PropertyApproval from '../features/admin/components/PropertyApproval';
import RejectedProperties from '../features/admin/components/RejectedProperties';
import AvailableProperties from '../features/admin/components/AvailableProperties';
import Providers from '../features/admin/components/Providers';
import Seekers from '../features/admin/components/Seekers';
import SeekerDashboard from '../features/explorer/pages/SeekerDashboard';
import FindPG from '../features/seeker/components/FindPG';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<MultiStepRegistration />} />
      <Route path="/login" element={<SignInForm />} />
      
      {/* Seeker Routes */}
      <Route path="/seeker-dashboard" element={
        <ProtectedRoute>
          <SeekerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/find-pg" element={
        <ProtectedRoute>
          <FindPG />
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/bookings" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto bg-black/80 p-8 rounded-xl shadow-xl border border-orange-600">
                <h1 className="text-3xl font-bold text-white mb-6">My Bookings</h1>
                {/* Add your bookings content here */}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/saved-pgs" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto bg-black/80 p-8 rounded-xl shadow-xl border border-orange-600">
                <h1 className="text-3xl font-bold text-white mb-6">Saved PGs</h1>
                {/* Add your saved PGs content here */}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/profile" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto bg-black/80 p-8 rounded-xl shadow-xl border border-orange-600">
                <h1 className="text-3xl font-bold text-white mb-6">My Profile</h1>
                {/* Add your profile content here */}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/messages" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto bg-black/80 p-8 rounded-xl shadow-xl border border-orange-600">
                <h1 className="text-3xl font-bold text-white mb-6">Messages</h1>
                {/* Add your messages content here */}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      } />

      {/* Provider Routes */}
      <Route path="/provider-dashboard" element={
        <ProtectedRoute>
          <ProviderDashboard />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/add-property" element={
        <ProtectedRoute>
          <AddProperty />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/properties" element={
        <ProtectedRoute>
          <MyProperties />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/approvals" element={
        <ProtectedRoute>
          <PropertyApproval />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/rejected-pgs" element={
        <ProtectedRoute>
          <RejectedProperties />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/available-pgs" element={
        <ProtectedRoute>
          <AvailableProperties />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/providers" element={
        <ProtectedRoute>
          <Providers />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/seekers" element={
        <ProtectedRoute>
          <Seekers />
        </ProtectedRoute>
      } />
      
      <Route path="/find-pg" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto bg-black/80 p-8 rounded-xl shadow-xl border border-orange-600">
                <h1 className="text-3xl font-bold text-white mb-6">Find PG</h1>
                
                {/* Add your find PG content here */}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/list-property" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto bg-black/80 p-8 rounded-xl shadow-xl border border-orange-600">
                <h1 className="text-3xl font-bold text-white mb-6">List Your Property</h1>
                
                {/* Add your list property content here */}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/contact" element={<div>Contact Page</div>} />
      <Route path="/how-it-works" element={<div>How It Works Page</div>} />
    </Routes>
  );
};

export default AppRoutes;

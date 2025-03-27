import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
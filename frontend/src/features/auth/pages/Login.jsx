'use client';

import { AuthProvider } from '../context/AuthContext';
import SignInForm from '../components/SignInForm';

export default function Login() {
  return (
    <AuthProvider>
      <SignInForm />
    </AuthProvider>
  );
}

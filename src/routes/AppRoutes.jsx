import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import OTPPage from '../pages/auth/OTPPage';
import DashboardPage from '../pages/DashboardPage';
import SettingsPage from '../pages/SettingsPage';
import AllTransactionsPage from '../pages/AllTransactionsPage';

const AppRoutes = () => {
  const { token } = useAuth(); // Remove loading check here

  return (
    <Routes>
      {/* Root route - redirect based on auth status */}
      <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
      
      {/* Auth Routes - Render immediately, no loading check */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="otp" element={<OTPPage />} />
      </Route>

      {/* Protected Routes - Loading check handled in ProtectedRoute */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="alltransaction" element={<AllTransactionsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

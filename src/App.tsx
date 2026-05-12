import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';
import { useThemeStore } from '@stores/themeStore';
import { useDataStore } from '@stores/dataStore';
import LoginPage from '@pages/LoginPage';
import DashboardPage from '@pages/DashboardPage';
import CustomerPortalPage from '@pages/CustomerPortalPage';

export default function App() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isDark = useThemeStore((state) => state.isDark);
  const initializeData = useDataStore((state) => state.initializeData);

  React.useEffect(() => {
    initializeData();
  }, [initializeData]);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={currentUser ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/customer-portal/*" element={currentUser ? <CustomerPortalPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={currentUser ? (currentUser.role === 'customer' ? '/customer-portal' : '/dashboard') : '/login'} />} />
      </Routes>
    </BrowserRouter>
  );
}

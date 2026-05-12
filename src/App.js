import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard/*", element: currentUser ? _jsx(DashboardPage, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/customer-portal/*", element: currentUser ? _jsx(CustomerPortalPage, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: currentUser ? (currentUser.role === 'customer' ? '/customer-portal' : '/dashboard') : '/login' }) })] }) }));
}

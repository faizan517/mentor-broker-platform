import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/shared/Navbar';
import { useThemeStore } from '@stores/themeStore';
export default function CustomerPortalLayout() {
    const isDark = useThemeStore((state) => state.isDark);
    React.useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);
    return (_jsx("div", { className: isDark ? 'dark' : '', children: _jsxs("div", { className: "flex flex-col h-screen bg-white dark:bg-neutral-950", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 overflow-auto", children: _jsx("div", { className: "max-w-7xl mx-auto p-6", children: _jsx(Outlet, {}) }) })] }) }));
}

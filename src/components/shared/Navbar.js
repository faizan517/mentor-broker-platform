import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Menu, Sun, Moon, LogOut } from 'lucide-react';
import { useAuthStore } from '@stores/authStore';
import { useThemeStore } from '@stores/themeStore';
export default function Navbar() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const logout = useAuthStore((state) => state.logout);
    const isDark = useThemeStore((state) => state.isDark);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };
    return (_jsxs("nav", { className: "h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { className: "p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg md:hidden", children: _jsx(Menu, { className: "w-5 h-5 text-neutral-600 dark:text-neutral-400" }) }), _jsx("div", { className: "text-xl font-bold text-primary-600", children: "MENTOR" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: toggleTheme, className: "p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors", children: isDark ? (_jsx(Sun, { className: "w-5 h-5 text-amber-500" })) : (_jsx(Moon, { className: "w-5 h-5 text-neutral-600" })) }), currentUser && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-3 border-l border-neutral-200 dark:border-neutral-800 pl-4", children: [_jsxs("div", { className: "text-right hidden sm:block", children: [_jsx("p", { className: "text-sm font-medium text-neutral-900 dark:text-white", children: currentUser.name }), _jsx("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 capitalize", children: currentUser.role })] }), _jsx("div", { className: "w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold", children: currentUser.name.charAt(0) })] }), _jsx("button", { onClick: handleLogout, className: "p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors", children: _jsx(LogOut, { className: "w-5 h-5 text-red-600" }) })] }))] })] }));
}

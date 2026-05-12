import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';
import { useDataStore } from '@stores/dataStore';
export default function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const switchPersona = useAuthStore((state) => state.switchPersona);
    const initializeData = useDataStore((state) => state.initializeData);
    const [selectedPersona, setSelectedPersona] = React.useState('broker');
    const DEMO_USERS = {
        broker: {
            name: 'Sarah Chen',
            role: 'Broker/Admin',
            desc: 'Full platform access - dashboards, customer mgmt, commission tracking',
        },
        producer: {
            name: 'Mike Johnson',
            role: 'Sales Producer',
            desc: 'Lead management, quote creation, customer engagement',
        },
        csr: {
            name: 'Emma Davis',
            role: 'Customer Service',
            desc: 'Customer support, policy info, service requests',
        },
        claims: {
            name: 'Robert Martinez',
            role: 'Claims Adjuster',
            desc: 'Claims FNOL, investigation tracking, payment processing',
        },
        finance: {
            name: 'Lisa Wong',
            role: 'Finance Manager',
            desc: 'Commission tracking, revenue reports, financial analytics',
        },
        customer: {
            name: 'John Smith',
            role: 'Customer Portal',
            desc: 'View policies, report claims, manage renewals',
        },
    };
    const handleEnter = () => {
        initializeData();
        switchPersona(selectedPersona);
        setTimeout(() => {
            navigate(selectedPersona === 'customer' ? '/customer-portal' : '/dashboard');
        }, 300);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-2xl", children: [_jsx("div", { className: "bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden", children: _jsxs("div", { className: "px-8 py-12 sm:px-12 sm:py-16", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 dark:text-white mb-2", children: "MENTOR" }), _jsx("p", { className: "text-lg text-neutral-600 dark:text-neutral-400", children: "AI-Powered Broker Intelligence Platform" }), _jsx("p", { className: "text-sm text-neutral-500 dark:text-neutral-500 mt-4", children: "Select a demo persona to explore the platform" })] }), _jsx("div", { className: "mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-800 dark:text-blue-200", children: [_jsx("strong", { children: "Demo Ready:" }), " All personas are pre-populated with realistic data. Switch personas anytime to see different workflows and dashboards."] }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: Object.entries(DEMO_USERS).map(([key, user]) => (_jsxs("button", { onClick: () => setSelectedPersona(key), className: `p-4 rounded-lg border-2 transition-all text-left ${selectedPersona === key
                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-950'
                                        : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500'}`, children: [_jsx("h3", { className: "font-bold text-neutral-900 dark:text-white", children: user.name }), _jsx("p", { className: "text-xs font-medium text-primary-600 dark:text-primary-400 mt-1", children: user.role }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2", children: user.desc })] }, key))) }), _jsx("button", { onClick: handleEnter, className: "w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg", children: "Enter Platform" }), _jsxs("div", { className: "mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800", children: [_jsx("h4", { className: "text-sm font-semibold text-neutral-900 dark:text-white mb-4", children: "Demo Highlights" }), _jsxs("ul", { className: "space-y-2 text-sm text-neutral-600 dark:text-neutral-400", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary-600 font-bold", children: "\u2713" }), _jsx("span", { children: "200 customers with 500 active policies" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary-600 font-bold", children: "\u2713" }), _jsx("span", { children: "Complete claim lifecycle workflows" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary-600 font-bold", children: "\u2713" }), _jsx("span", { children: "Real-time DEXA AI assistant by workflow" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary-600 font-bold", children: "\u2713" }), _jsx("span", { children: "Dark/Light mode with persistent storage" })] })] })] })] }) }), _jsx("p", { className: "text-center text-white dark:text-neutral-400 text-xs mt-8", children: "Mentor Platform Demo \u2022 All data stored locally in your browser" })] }) }));
}

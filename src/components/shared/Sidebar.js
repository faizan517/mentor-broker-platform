import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, AlertCircle, RefreshCw, DollarSign, Settings, ChevronDown, } from 'lucide-react';
import { useAuthStore, DEMO_PERSONAS } from '@stores/authStore';
const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'leads', label: 'Leads', icon: Users, path: '/dashboard/leads' },
    { id: 'quotes', label: 'Quotes', icon: FileText, path: '/dashboard/quotes' },
    { id: 'claims', label: 'Claims', icon: AlertCircle, path: '/dashboard/claims' },
    { id: 'renewals', label: 'Renewals', icon: RefreshCw, path: '/dashboard/renewals' },
    { id: 'commission', label: 'Commission', icon: DollarSign, path: '/dashboard/commission' },
    { id: 'customers', label: 'Customers', icon: Users, path: '/dashboard/customers' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];
export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = useAuthStore((state) => state.currentUser);
    const switchPersona = useAuthStore((state) => state.switchPersona);
    const [personaOpen, setPersonaOpen] = React.useState(false);
    const isActive = (path) => location.pathname === path;
    return (_jsxs("div", { className: "w-64 bg-neutral-900 text-white flex flex-col h-screen overflow-y-auto", children: [_jsxs("div", { className: "p-6 border-b border-neutral-800", children: [_jsx("h1", { className: "text-2xl font-bold mb-1", children: "MENTOR" }), _jsx("p", { className: "text-xs text-neutral-400", children: "Broker Intelligence Platform" })] }), _jsx("nav", { className: "flex-1 px-4 py-6 space-y-2", children: MENU_ITEMS.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${isActive(item.path)
                        ? 'bg-primary-600 text-white'
                        : 'text-neutral-300 hover:bg-neutral-800'}`, children: [_jsx(item.icon, { className: "w-4 h-4" }), item.label] }, item.id))) }), _jsx("div", { className: "p-4 border-t border-neutral-800", children: _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setPersonaOpen(!personaOpen), className: "w-full flex items-center justify-between px-4 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-sm", children: [_jsxs("div", { className: "text-left", children: [_jsx("p", { className: "text-xs text-neutral-400", children: "Current Persona" }), _jsx("p", { className: "font-medium", children: currentUser?.name })] }), _jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${personaOpen ? 'rotate-180' : ''}` })] }), personaOpen && (_jsx("div", { className: "absolute bottom-full left-0 right-0 mb-2 bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden", children: DEMO_PERSONAS.map((persona) => (_jsxs("button", { onClick: () => {
                                    switchPersona(persona.role);
                                    setPersonaOpen(false);
                                }, className: `w-full px-4 py-3 text-left text-sm transition-colors ${currentUser?.role === persona.role
                                    ? 'bg-primary-600 text-white'
                                    : 'text-neutral-300 hover:bg-neutral-700'}`, children: [_jsx("p", { className: "font-medium", children: persona.name }), _jsx("p", { className: "text-xs text-neutral-400 capitalize", children: persona.title })] }, persona.role))) }))] }) })] }));
}

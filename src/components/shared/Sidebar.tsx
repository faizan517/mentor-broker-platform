import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Settings,
  ChevronDown,
} from 'lucide-react';
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-neutral-900 text-white flex flex-col h-screen overflow-y-auto">
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-2xl font-bold mb-1">MENTOR</h1>
        <p className="text-xs text-neutral-400">Broker Intelligence Platform</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              isActive(item.path)
                ? 'bg-primary-600 text-white'
                : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <div className="relative">
          <button
            onClick={() => setPersonaOpen(!personaOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-sm"
          >
            <div className="text-left">
              <p className="text-xs text-neutral-400">Current Persona</p>
              <p className="font-medium">{currentUser?.name}</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${personaOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {personaOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
              {DEMO_PERSONAS.map((persona) => (
                <button
                  key={persona.role}
                  onClick={() => {
                    switchPersona(persona.role);
                    setPersonaOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    currentUser?.role === persona.role
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  <p className="font-medium">{persona.name}</p>
                  <p className="text-xs text-neutral-400 capitalize">{persona.title}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, DEMO_PERSONAS } from '@stores/authStore';
import { useDataStore } from '@stores/dataStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const switchPersona = useAuthStore((state) => state.switchPersona);
  const initializeData = useDataStore((state) => state.initializeData);
  const [selectedPersona, setSelectedPersona] = React.useState('broker');

  const DEMO_USERS: Record<string, { name: string; role: string; desc: string }> = {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 sm:px-12 sm:py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                MENTOR
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                AI-Powered Broker Intelligence Platform
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-4">
                Select a demo persona to explore the platform
              </p>
            </div>

            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Demo Ready:</strong> All personas are pre-populated with realistic data.
                Switch personas anytime to see different workflows and dashboards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(DEMO_USERS).map(([key, user]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPersona(key)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedPersona === key
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500'
                  }`}
                >
                  <h3 className="font-bold text-neutral-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-1">
                    {user.role}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                    {user.desc}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={handleEnter}
              className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Enter Platform
            </button>

            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                Demo Highlights
              </h4>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>200 customers with 500 active policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>Complete claim lifecycle workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>Real-time DEXA AI assistant by workflow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>Dark/Light mode with persistent storage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-white dark:text-neutral-400 text-xs mt-8">
          Mentor Platform Demo • All data stored locally in your browser
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertCircle, RefreshCw, Plus } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';
import DashboardCard from '@components/shared/DashboardCard';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const customers = useDataStore((state) => state.customers);
  const policies = useDataStore((state) => state.policies);
  const claims = useDataStore((state) => state.claims);
  const renewals = useDataStore((state) => state.renewals);

  const myCustomer = customers.find((c) => c.name === currentUser?.name);
  const myPolicies = myCustomer ? policies.filter((p) => p.customerId === myCustomer.id) : [];
  const myClaims = myCustomer ? claims.filter((c) => c.customerId === myCustomer.id) : [];
  const myRenewals = myCustomer ? renewals.filter((r) => r.customerId === myCustomer.id) : [];

  const activeClaims = myClaims.filter((c) => !['paid', 'closed'].includes(c.status)).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          Welcome, {currentUser?.name}!
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Manage your policies, claims, and renewals all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Active Policies"
          value={myPolicies.filter((p) => p.status === 'active').length}
          icon={FileText}
          color="blue"
          onClick={() => navigate('/customer-portal/policies')}
        />
        <DashboardCard
          title="Open Claims"
          value={activeClaims}
          icon={AlertCircle}
          color="red"
          onClick={() => navigate('/customer-portal/claims')}
        />
        <DashboardCard
          title="Pending Renewals"
          value={myRenewals.filter((r) => r.status === 'pending').length}
          icon={RefreshCw}
          color="amber"
          onClick={() => navigate('/customer-portal/policies')}
        />
        <DashboardCard
          title="Expiring Soon"
          value={myPolicies.filter((p) => p.status === 'expiring-soon').length}
          icon={AlertCircle}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/customer-portal/quote')}
              className="w-full px-4 py-3 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-950 rounded-lg text-left text-neutral-900 dark:text-white font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-primary-600" />
              Request a Quote
            </button>
            <button
              onClick={() => navigate('/customer-portal/claims')}
              className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg text-left text-neutral-900 dark:text-white font-medium transition-colors flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              File a Claim
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Name</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {currentUser?.name}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Email</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {currentUser?.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Phone</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {currentUser?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

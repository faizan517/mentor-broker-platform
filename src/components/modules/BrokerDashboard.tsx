import React from 'react';
import {
  Users,
  FileText,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '@components/shared/DashboardCard';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import { format, parseISO } from 'date-fns';

export default function BrokerDashboard() {
  const customers = useDataStore((state) => state.customers);
  const policies = useDataStore((state) => state.policies);
  const claims = useDataStore((state) => state.claims);
  const renewals = useDataStore((state) => state.renewals);
  const setContext = useDexaStore((state) => state.setContext);
  const setOpen = useDexaStore((state) => state.setOpen);

  React.useEffect(() => {
    setContext('dashboard:default');
  }, [setContext]);

  const activePolicies = policies.filter((p) => p.status === 'active').length;
  const openClaims = claims.filter((c) => ['reported', 'investigating'].includes(c.status)).length;
  const pendingRenewals = renewals.filter((r) => r.status === 'pending').length;
  const totalPremium = policies.reduce((sum, p) => sum + p.premium, 0);

  const monthlyPremiumData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1);
    const monthStart = format(month, 'yyyy-MM-01');
    const monthEnd = format(new Date(2024, i + 1, 0), 'yyyy-MM-dd');

    const monthRevenue = policies
      .filter((p) => {
        const pDate = p.createdAt;
        return pDate >= monthStart && pDate <= monthEnd;
      })
      .reduce((sum, p) => sum + p.premium, 0);

    return {
      month: format(month, 'MMM'),
      revenue: monthRevenue,
    };
  });

  const policyTypeData = [
    {
      name: 'Auto',
      value: policies.filter((p) => p.productType === 'auto').length,
      color: '#0284c7',
    },
    {
      name: 'Home',
      value: policies.filter((p) => p.productType === 'home').length,
      color: '#16a34a',
    },
    {
      name: 'Commercial',
      value: policies.filter((p) => p.productType === 'commercial').length,
      color: '#ea580c',
    },
    {
      name: 'Workers Comp',
      value: policies.filter((p) => p.productType === 'workers-comp').length,
      color: '#a855f7',
    },
    {
      name: 'Medicare',
      value: policies.filter((p) => p.productType === 'medicare').length,
      color: '#0891b2',
    },
  ];

  const claimStatusData = [
    { name: 'Reported', value: claims.filter((c) => c.status === 'reported').length, color: '#3b82f6' },
    { name: 'Investigating', value: claims.filter((c) => c.status === 'investigating').length, color: '#f59e0b' },
    { name: 'Approved', value: claims.filter((c) => c.status === 'approved').length, color: '#10b981' },
    { name: 'Paid', value: claims.filter((c) => c.status === 'paid').length, color: '#6366f1' },
    { name: 'Closed', value: claims.filter((c) => c.status === 'closed').length, color: '#6b7280' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Ask DEXA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <DashboardCard
          title="Total Customers"
          value={customers.length}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Active Policies"
          value={activePolicies}
          icon={FileText}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Open Claims"
          value={openClaims}
          icon={AlertCircle}
          color="red"
          trend={{ value: 3, isPositive: false }}
        />
        <DashboardCard
          title="Pending Renewals"
          value={pendingRenewals}
          icon={RefreshCw}
          color="amber"
          trend={{ value: 15, isPositive: true }}
        />
        <DashboardCard
          title="Annual Premium"
          value={`$${(totalPremium / 1000).toFixed(0)}K`}
          icon={DollarSign}
          color="purple"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Monthly Premium Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPremiumData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="revenue" fill="#0284c7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Policy Mix
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={policyTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {policyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {policyTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">{item.name}</span>
                </div>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Claims Status Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={claimStatusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';

export default function CommissionDashboard() {
  const policies = useDataStore((state) => state.policies);
  const setContext = useDexaStore((state) => state.setContext);
  const [period, setPeriod] = React.useState<'ytd' | 'monthly' | 'quarterly'>('ytd');

  React.useEffect(() => {
    setContext('commission:default');
  }, [setContext]);

  const commissionRate = 0.12;
  const totalCommission = policies.reduce((sum, p) => sum + p.premium * commissionRate, 0);

  const producerData = [
    { name: 'Mike Johnson', earned: 3200, target: 3500, policies: 45 },
    { name: 'Sarah Chen', earned: 2800, target: 3500, policies: 38 },
    { name: 'David Smith', earned: 2100, target: 3500, policies: 28 },
  ];

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i];
    const commission = 4000 + Math.random() * 3000;
    return { month, commission };
  });

  const productCommission = [
    { product: 'Auto', commission: 3200, target: 3500 },
    { product: 'Home', commission: 2800, target: 3000 },
    { product: 'Commercial', commission: 4500, target: 4000 },
    { product: 'Workers Comp', commission: 2100, target: 2500 },
    { product: 'Medicare', commission: 1800, target: 2000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Commission Dashboard</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as any)}
          className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
        >
          <option value="ytd">Year-to-Date</option>
          <option value="monthly">This Month</option>
          <option value="quarterly">This Quarter</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Earned</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
                ${(totalCommission / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 12% vs last period</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Number of Policies</p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">{policies.length}</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
            Avg: ${(policies.reduce((sum, p) => sum + p.premium, 0) / policies.length).toFixed(0)}/policy
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Commission Rate</p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
            {(commissionRate * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">Industry standard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Monthly Commission Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
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
              <Line
                type="monotone"
                dataKey="commission"
                stroke="#0284c7"
                strokeWidth={2}
                dot={{ fill: '#0284c7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Commission by Product
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productCommission}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="product" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="commission" fill="#0284c7" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#d1d5db" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Producer Commissions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Producer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Earned
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Target
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Progress
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Policies
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {producerData.map((producer) => {
                const progress = (producer.earned / producer.target) * 100;
                return (
                  <tr key={producer.name} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                    <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-white">
                      {producer.name}
                    </td>
                    <td className="py-3 px-4 text-neutral-900 dark:text-white">
                      ${producer.earned.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">
                      ${producer.target.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        {progress.toFixed(0)}%
                      </p>
                    </td>
                    <td className="py-3 px-4 text-neutral-900 dark:text-white">
                      {producer.policies}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

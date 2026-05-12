import React from 'react';
import { AlertTriangle, TrendingDown, Gift } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import StatusBadge from '@components/shared/StatusBadge';
import { format, parseISO } from 'date-fns';

export default function RenewalCenter() {
  const renewals = useDataStore((state) => state.renewals);
  const customers = useDataStore((state) => state.customers);
  const setContext = useDexaStore((state) => state.setContext);
  const [sortBy, setSortBy] = React.useState<'risk' | 'date' | 'premium'>('risk');

  React.useEffect(() => {
    setContext('renewals:pending');
  }, [setContext]);

  const sortedRenewals = [...renewals].sort((a, b) => {
    if (sortBy === 'risk') {
      return b.riskScore - a.riskScore;
    } else if (sortBy === 'date') {
      return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime();
    } else {
      return b.newPremium - a.newPremium;
    }
  });

  const stats = {
    total: renewals.length,
    atRisk: renewals.filter((r) => r.riskScore > 70).length,
    potential: renewals.reduce((sum, r) => sum + (r.newPremium - r.currentPremium), 0),
  };

  const getCustomerName = (customerId: string) => {
    return customers.find((c) => c.id === customerId)?.name || 'Unknown';
  };

  const getRiskColor = (score: number) => {
    if (score > 75) return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300';
    if (score > 60) return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300';
    return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Renewal Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Pending</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">At Risk</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.atRisk}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Net Change</p>
              <p className={`text-2xl font-bold mt-2 ${stats.potential > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ${(stats.potential / 1000).toFixed(1)}K
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-neutral-400 opacity-20" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Renewal Pipeline</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white text-sm"
          >
            <option value="risk">Sort by Risk Score</option>
            <option value="date">Sort by Renewal Date</option>
            <option value="premium">Sort by Premium</option>
          </select>
        </div>

        <div className="space-y-3">
          {sortedRenewals.map((renewal) => {
            const priceChange = renewal.newPremium - renewal.currentPremium;
            const priceChangePercent = ((priceChange / renewal.currentPremium) * 100).toFixed(1);

            return (
              <div
                key={renewal.id}
                className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-start">
                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Customer</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {getCustomerName(renewal.customerId)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Current Premium</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      ${renewal.currentPremium.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">New Premium</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        ${renewal.newPremium.toLocaleString()}
                      </p>
                      <span
                        className={`text-xs font-medium ${
                          priceChange > 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        {priceChange > 0 ? '+' : ''}{priceChangePercent}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Renewal Date</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {format(parseISO(renewal.renewalDate), 'MMM d')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">Risk Score</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(renewal.riskScore)}`}>
                      {renewal.riskScore}
                    </div>
                  </div>
                </div>

                {renewal.crossSellOpportunities.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-start gap-2">
                      <Gift className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        <span className="font-medium">Cross-sell opportunity:</span>{' '}
                        {renewal.crossSellOpportunities.join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

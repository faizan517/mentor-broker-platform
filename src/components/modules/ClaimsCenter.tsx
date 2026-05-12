import React from 'react';
import { Plus, Search, Eye, AlertCircle } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import StatusBadge from '@components/shared/StatusBadge';
import { format, parseISO } from 'date-fns';

export default function ClaimsCenter() {
  const claims = useDataStore((state) => state.claims);
  const customers = useDataStore((state) => state.customers);
  const setContext = useDexaStore((state) => state.setContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string | null>(null);
  const [selectedClaim, setSelectedClaim] = React.useState<string | null>(null);

  React.useEffect(() => {
    setContext('claims:reported');
  }, [setContext]);

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || claim.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: claims.length,
    reported: claims.filter((c) => c.status === 'reported').length,
    investigating: claims.filter((c) => c.status === 'investigating').length,
    approved: claims.filter((c) => c.status === 'approved').length,
    paid: claims.filter((c) => c.status === 'paid').length,
  };

  const totalClaimAmount = claims.reduce((sum, c) => sum + c.paidAmount, 0);

  const selectedClaimData = claims.find((c) => c.id === selectedClaim);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Claims Management</h1>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Claim
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Reported</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.reported}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Investigating</p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">{stats.investigating}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.approved}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Paid</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
            ${(totalClaimAmount / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by claim number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              />
            </div>
            <select
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="reported">Reported</option>
              <option value="investigating">Investigating</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredClaims.map((claim) => (
              <button
                key={claim.id}
                onClick={() => setSelectedClaim(claim.id)}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedClaim === claim.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {claim.claimNumber}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                      Reported: {format(parseISO(claim.reportedDate), 'MMM d, yyyy')}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Adjuster: {claim.adjuster}
                    </p>
                  </div>
                  <StatusBadge status={claim.status} size="sm" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedClaimData && (
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Claim Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Claim Number</p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {selectedClaimData.claimNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Status</p>
                <p className="mt-1">
                  <StatusBadge status={selectedClaimData.status} size="sm" />
                </p>
              </div>

              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Claim Amount</p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  ${selectedClaimData.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Paid Amount</p>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  ${selectedClaimData.paidAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Adjuster</p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {selectedClaimData.adjuster}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                  Timeline
                </p>
                <div className="space-y-2">
                  {selectedClaimData.timeline.map((event, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {format(parseISO(event.date), 'MMM d')} •{' '}
                        <StatusBadge status={event.status} size="sm" />
                      </p>
                      <p className="text-neutral-700 dark:text-neutral-300 mt-1">
                        {event.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

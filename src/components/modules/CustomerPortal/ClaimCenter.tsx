import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';
import StatusBadge from '@components/shared/StatusBadge';
import { format, parseISO } from 'date-fns';

export default function ClaimCenter() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const customers = useDataStore((state) => state.customers);
  const claims = useDataStore((state) => state.claims);
  const [selectedClaim, setSelectedClaim] = React.useState<string | null>(null);

  const myCustomer = customers.find((c) => c.name === currentUser?.name);
  const myClaims = myCustomer ? claims.filter((c) => c.customerId === myCustomer.id) : [];

  const selectedClaimData = claims.find((c) => c.id === selectedClaim);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Claims</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            You have {myClaims.length} claim{myClaims.length !== 1 ? 's' : ''} on file
          </p>
        </div>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          File New Claim
        </button>
      </div>

      {myClaims.length === 0 ? (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400">
            You haven't filed any claims yet. We hope your policies keep you covered!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {myClaims.map((claim) => (
              <button
                key={claim.id}
                onClick={() => setSelectedClaim(claim.id)}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedClaim === claim.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {claim.claimNumber}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                      Filed: {format(parseISO(claim.reportedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <StatusBadge status={claim.status} size="sm" />
                </div>
              </button>
            ))}
          </div>

          {selectedClaimData && (
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 h-fit">
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
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">Description</p>
                  <p className="text-sm text-neutral-900 dark:text-white mt-1">
                    {selectedClaimData.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                          {format(parseISO(event.date), 'MMM d')} • {event.status}
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
      )}
    </div>
  );
}

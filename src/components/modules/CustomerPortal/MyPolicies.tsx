import React from 'react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';
import StatusBadge from '@components/shared/StatusBadge';
import { format, parseISO } from 'date-fns';

export default function MyPolicies() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const customers = useDataStore((state) => state.customers);
  const policies = useDataStore((state) => state.policies);
  const [expandedPolicy, setExpandedPolicy] = React.useState<string | null>(null);

  const myCustomer = customers.find((c) => c.name === currentUser?.name);
  const myPolicies = myCustomer ? policies.filter((p) => p.customerId === myCustomer.id) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">My Policies</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          You have {myPolicies.length} active or pending policies
        </p>
      </div>

      <div className="space-y-4">
        {myPolicies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)
              }
              className="w-full p-6 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white capitalize">
                      {policy.productType} Policy
                    </h3>
                    <StatusBadge status={policy.status} size="sm" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-3">
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">Policy Number</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {policy.policyNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">Premium</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        ${policy.premium.toLocaleString()}/year
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">Start Date</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {format(parseISO(policy.startDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">End Date</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {format(parseISO(policy.endDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-neutral-400 transition-transform ${
                      expandedPolicy === policy.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            </button>

            {expandedPolicy === policy.id && (
              <div className="border-t border-neutral-200 dark:border-neutral-700 p-6 bg-neutral-50 dark:bg-neutral-900">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
                      Coverage Details
                    </h4>
                    <div className="space-y-2">
                      {policy.coverages.map((coverage, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                            {coverage.type}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            Limit: ${coverage.limit.toLocaleString()} | Deductible: $
                            {coverage.deductible.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
                      Actions
                    </h4>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900 transition-colors">
                        View Documents
                      </button>
                      <button className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        Request Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

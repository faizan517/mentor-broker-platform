import React from 'react';
import { Plus, Search, Eye } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import StatusBadge from '@components/shared/StatusBadge';
import { format, parseISO } from 'date-fns';

export default function QuoteBuilder() {
  const quotes = useDataStore((state) => state.quotes);
  const leads = useDataStore((state) => state.leads);
  const setContext = useDexaStore((state) => state.setContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string | null>(null);

  React.useEffect(() => {
    setContext('quotes:default');
  }, [setContext]);

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = quote.productType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || quote.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: quotes.length,
    draft: quotes.filter((q) => q.status === 'draft').length,
    sent: quotes.filter((q) => q.status === 'sent').length,
    accepted: quotes.filter((q) => q.status === 'accepted').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Quote Builder</h1>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Quote
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Draft</p>
          <p className="text-2xl font-bold text-neutral-700 dark:text-neutral-300 mt-2">{stats.draft}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Sent</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.sent}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Accepted</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.accepted}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search quotes..."
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
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-white capitalize">
                      {quote.productType} Quote
                    </h3>
                    <StatusBadge status={quote.status} size="sm" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">Created</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {format(parseISO(quote.createdAt), 'MMM d')}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">Options</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {quote.quotes.length} carriers
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-600 dark:text-neutral-400">Expires</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {format(parseISO(quote.expiryDate), 'MMM d')}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

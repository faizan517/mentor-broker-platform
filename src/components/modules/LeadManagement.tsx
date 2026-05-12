import React from 'react';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import StatusBadge from '@components/shared/StatusBadge';
import { format, parseISO } from 'date-fns';

export default function LeadManagement() {
  const leads = useDataStore((state) => state.leads);
  const updateLead = useDataStore((state) => state.updateLead);
  const addLead = useDataStore((state) => state.addLead);
  const setContext = useDexaStore((state) => state.setContext);
  const setOpen = useDexaStore((state) => state.setOpen);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string | null>(null);

  React.useEffect(() => {
    setContext('leads:default');
  }, [setContext]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: leads.length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    lostCount: leads.filter((l) => l.status === 'lost').length,
  };

  const handleQualifyLead = (leadId: string) => {
    updateLead(leadId, { status: 'qualified' });
  };

  const handleConvertLead = (leadId: string) => {
    updateLead(leadId, { status: 'converted' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Lead Management</h1>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Lead
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Leads</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Qualified</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.qualified}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Converted</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.converted}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Lost</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.lostCount}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
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
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="quoted">Quoted</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">Created</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <td className="py-3 px-4 text-neutral-900 dark:text-white">{lead.name}</td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">{lead.email}</td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400 capitalize">{lead.productType}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-500" />
                      <span className="font-semibold text-neutral-900 dark:text-white">{lead.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={lead.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400 text-xs">
                    {format(parseISO(lead.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {lead.status === 'new' && (
                        <button
                          onClick={() => handleQualifyLead(lead.id)}
                          className="text-xs px-2 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
                        >
                          Qualify
                        </button>
                      )}
                      {lead.status === 'qualified' && (
                        <button
                          onClick={() => handleConvertLead(lead.id)}
                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                        >
                          Convert
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

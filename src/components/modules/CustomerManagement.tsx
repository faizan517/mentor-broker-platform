import React from 'react';
import { Search, Filter, Star, Mail, Phone } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';

export default function CustomerManagement() {
  const customers = useDataStore((state) => state.customers);
  const policies = useDataStore((state) => state.policies);
  const setContext = useDexaStore((state) => state.setContext);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterPriority, setFilterPriority] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setContext('customers:default');
  }, [setContext]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesFilter = filterPriority === null || customer.isPriority === filterPriority;
    return matchesSearch && matchesFilter;
  });

  const getCustomerPolicies = (customerId: string) => {
    return policies.filter((p) => p.customerId === customerId).length;
  };

  const getCustomerPremium = (customerId: string) => {
    return policies
      .filter((p) => p.customerId === customerId)
      .reduce((sum, p) => sum + p.premium, 0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Customer Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Customers</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{customers.length}</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Priority Customers</p>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
            {customers.filter((c) => c.isPriority).length}
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Avg Policies/Customer</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
            {(policies.length / customers.length).toFixed(1)}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
            />
          </div>
          <select
            value={filterPriority === null ? '' : filterPriority ? 'priority' : 'standard'}
            onChange={(e) => {
              if (e.target.value === '') {
                setFilterPriority(null);
              } else if (e.target.value === 'priority') {
                setFilterPriority(true);
              } else {
                setFilterPriority(false);
              }
            }}
            className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
          >
            <option value="">All Customers</option>
            <option value="priority">Priority Customers</option>
            <option value="standard">Standard Customers</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Phone
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Policies
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Annual Premium
                </th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredCustomers.map((customer) => {
                const policyCount = getCustomerPolicies(customer.id);
                const premium = getCustomerPremium(customer.id);

                return (
                  <tr key={customer.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {customer.isPriority && (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        )}
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-neutral-400" />
                        {customer.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-neutral-400" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                        {policyCount}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-white">
                      ${premium.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          customer.isPriority
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {customer.isPriority ? 'Priority' : 'Standard'}
                      </span>
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

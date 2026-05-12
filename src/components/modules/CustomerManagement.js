import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Search, Star, Mail, Phone } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
export default function CustomerManagement() {
    const customers = useDataStore((state) => state.customers);
    const policies = useDataStore((state) => state.policies);
    const setContext = useDexaStore((state) => state.setContext);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterPriority, setFilterPriority] = React.useState(null);
    React.useEffect(() => {
        setContext('customers:default');
    }, [setContext]);
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);
        const matchesFilter = filterPriority === null || customer.isPriority === filterPriority;
        return matchesSearch && matchesFilter;
    });
    const getCustomerPolicies = (customerId) => {
        return policies.filter((p) => p.customerId === customerId).length;
    };
    const getCustomerPremium = (customerId) => {
        return policies
            .filter((p) => p.customerId === customerId)
            .reduce((sum, p) => sum + p.premium, 0);
    };
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Customer Management" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Total Customers" }), _jsx("p", { className: "text-2xl font-bold text-neutral-900 dark:text-white mt-2", children: customers.length })] }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Priority Customers" }), _jsx("p", { className: "text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2", children: customers.filter((c) => c.isPriority).length })] }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Avg Policies/Customer" }), _jsx("p", { className: "text-2xl font-bold text-neutral-900 dark:text-white mt-2", children: (policies.length / customers.length).toFixed(1) })] })] }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-3 w-4 h-4 text-neutral-400" }), _jsx("input", { type: "text", placeholder: "Search customers...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white" })] }), _jsxs("select", { value: filterPriority === null ? '' : filterPriority ? 'priority' : 'standard', onChange: (e) => {
                                    if (e.target.value === '') {
                                        setFilterPriority(null);
                                    }
                                    else if (e.target.value === 'priority') {
                                        setFilterPriority(true);
                                    }
                                    else {
                                        setFilterPriority(false);
                                    }
                                }, className: "px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: [_jsx("option", { value: "", children: "All Customers" }), _jsx("option", { value: "priority", children: "Priority Customers" }), _jsx("option", { value: "standard", children: "Standard Customers" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "border-b border-neutral-200 dark:border-neutral-700", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Name" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Email" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Phone" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Policies" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Annual Premium" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-neutral-200 dark:divide-neutral-700", children: filteredCustomers.map((customer) => {
                                        const policyCount = getCustomerPolicies(customer.id);
                                        const premium = getCustomerPremium(customer.id);
                                        return (_jsxs("tr", { className: "hover:bg-neutral-50 dark:hover:bg-neutral-700", children: [_jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [customer.isPriority && (_jsx(Star, { className: "w-4 h-4 text-amber-500 fill-amber-500" })), _jsx("span", { className: "font-semibold text-neutral-900 dark:text-white", children: customer.name })] }) }), _jsx("td", { className: "py-3 px-4 text-neutral-600 dark:text-neutral-400", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "w-4 h-4 text-neutral-400" }), customer.email] }) }), _jsx("td", { className: "py-3 px-4 text-neutral-600 dark:text-neutral-400", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4 text-neutral-400" }), customer.phone] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "inline-block px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded text-xs font-medium", children: policyCount }) }), _jsxs("td", { className: "py-3 px-4 font-semibold text-neutral-900 dark:text-white", children: ["$", premium.toLocaleString()] }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `inline-block px-2 py-1 rounded text-xs font-medium ${customer.isPriority
                                                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`, children: customer.isPriority ? 'Priority' : 'Standard' }) })] }, customer.id));
                                    }) })] }) })] })] }));
}

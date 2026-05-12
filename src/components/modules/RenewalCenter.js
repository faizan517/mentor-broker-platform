import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { AlertTriangle, TrendingDown, Gift } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import { format, parseISO } from 'date-fns';
export default function RenewalCenter() {
    const renewals = useDataStore((state) => state.renewals);
    const customers = useDataStore((state) => state.customers);
    const setContext = useDexaStore((state) => state.setContext);
    const [sortBy, setSortBy] = React.useState('risk');
    React.useEffect(() => {
        setContext('renewals:pending');
    }, [setContext]);
    const sortedRenewals = [...renewals].sort((a, b) => {
        if (sortBy === 'risk') {
            return b.riskScore - a.riskScore;
        }
        else if (sortBy === 'date') {
            return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime();
        }
        else {
            return b.newPremium - a.newPremium;
        }
    });
    const stats = {
        total: renewals.length,
        atRisk: renewals.filter((r) => r.riskScore > 70).length,
        potential: renewals.reduce((sum, r) => sum + (r.newPremium - r.currentPremium), 0),
    };
    const getCustomerName = (customerId) => {
        return customers.find((c) => c.id === customerId)?.name || 'Unknown';
    };
    const getRiskColor = (score) => {
        if (score > 75)
            return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300';
        if (score > 60)
            return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300';
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300';
    };
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Renewal Management" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Total Pending" }), _jsx("p", { className: "text-2xl font-bold text-neutral-900 dark:text-white mt-2", children: stats.total })] }), _jsx("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "At Risk" }), _jsx("p", { className: "text-2xl font-bold text-red-600 dark:text-red-400 mt-2", children: stats.atRisk })] }), _jsx(AlertTriangle, { className: "w-8 h-8 text-red-500 opacity-20" })] }) }), _jsx("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Net Change" }), _jsxs("p", { className: `text-2xl font-bold mt-2 ${stats.potential > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: ["$", (stats.potential / 1000).toFixed(1), "K"] })] }), _jsx(TrendingDown, { className: "w-8 h-8 text-neutral-400 opacity-20" })] }) })] }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-neutral-900 dark:text-white", children: "Renewal Pipeline" }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white text-sm", children: [_jsx("option", { value: "risk", children: "Sort by Risk Score" }), _jsx("option", { value: "date", children: "Sort by Renewal Date" }), _jsx("option", { value: "premium", children: "Sort by Premium" })] })] }), _jsx("div", { className: "space-y-3", children: sortedRenewals.map((renewal) => {
                            const priceChange = renewal.newPremium - renewal.currentPremium;
                            const priceChangePercent = ((priceChange / renewal.currentPremium) * 100).toFixed(1);
                            return (_jsxs("div", { className: "p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:shadow-md transition-shadow", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-5 gap-4 items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Customer" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: getCustomerName(renewal.customerId) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Current Premium" }), _jsxs("p", { className: "font-semibold text-neutral-900 dark:text-white", children: ["$", renewal.currentPremium.toLocaleString()] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "New Premium" }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("p", { className: "font-semibold text-neutral-900 dark:text-white", children: ["$", renewal.newPremium.toLocaleString()] }), _jsxs("span", { className: `text-xs font-medium ${priceChange > 0
                                                                    ? 'text-red-600 dark:text-red-400'
                                                                    : 'text-green-600 dark:text-green-400'}`, children: [priceChange > 0 ? '+' : '', priceChangePercent, "%"] })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Renewal Date" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: format(parseISO(renewal.renewalDate), 'MMM d') })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400 mb-2", children: "Risk Score" }), _jsx("div", { className: `inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(renewal.riskScore)}`, children: renewal.riskScore })] })] }), renewal.crossSellOpportunities.length > 0 && (_jsx("div", { className: "mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(Gift, { className: "w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" }), _jsxs("p", { className: "text-sm text-neutral-700 dark:text-neutral-300", children: [_jsx("span", { className: "font-medium", children: "Cross-sell opportunity:" }), ' ', renewal.crossSellOpportunities.join(', ')] })] }) }))] }, renewal.id));
                        }) })] })] }));
}

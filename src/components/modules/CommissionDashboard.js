import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
export default function CommissionDashboard() {
    const policies = useDataStore((state) => state.policies);
    const setContext = useDexaStore((state) => state.setContext);
    const [period, setPeriod] = React.useState('ytd');
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
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Commission Dashboard" }), _jsxs("select", { value: period, onChange: (e) => setPeriod(e.target.value), className: "px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: [_jsx("option", { value: "ytd", children: "Year-to-Date" }), _jsx("option", { value: "monthly", children: "This Month" }), _jsx("option", { value: "quarterly", children: "This Quarter" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsx("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Total Earned" }), _jsxs("p", { className: "text-3xl font-bold text-neutral-900 dark:text-white mt-2", children: ["$", (totalCommission / 1000).toFixed(1), "K"] }), _jsx("p", { className: "text-xs text-green-600 dark:text-green-400 mt-2", children: "\u2191 12% vs last period" })] }), _jsx(TrendingUp, { className: "w-8 h-8 text-green-500 opacity-20" })] }) }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Number of Policies" }), _jsx("p", { className: "text-3xl font-bold text-neutral-900 dark:text-white mt-2", children: policies.length }), _jsxs("p", { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2", children: ["Avg: $", (policies.reduce((sum, p) => sum + p.premium, 0) / policies.length).toFixed(0), "/policy"] })] }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Commission Rate" }), _jsxs("p", { className: "text-3xl font-bold text-neutral-900 dark:text-white mt-2", children: [(commissionRate * 100).toFixed(0), "%"] }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-2", children: "Industry standard" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-4", children: "Monthly Commission Trend" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: monthlyData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#d1d5db" }), _jsx(XAxis, { dataKey: "month", stroke: "#6b7280" }), _jsx(YAxis, { stroke: "#6b7280" }), _jsx(Tooltip, { contentStyle: {
                                                backgroundColor: '#1f2937',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#fff',
                                            } }), _jsx(Line, { type: "monotone", dataKey: "commission", stroke: "#0284c7", strokeWidth: 2, dot: { fill: '#0284c7' } })] }) })] }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-4", children: "Commission by Product" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: productCommission, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#d1d5db" }), _jsx(XAxis, { dataKey: "product", stroke: "#6b7280" }), _jsx(YAxis, { stroke: "#6b7280" }), _jsx(Tooltip, { contentStyle: {
                                                backgroundColor: '#1f2937',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#fff',
                                            } }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "commission", fill: "#0284c7", radius: [8, 8, 0, 0] }), _jsx(Bar, { dataKey: "target", fill: "#d1d5db", radius: [8, 8, 0, 0] })] }) })] })] }), _jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-4", children: "Producer Commissions" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "border-b border-neutral-200 dark:border-neutral-700", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Producer" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Earned" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Target" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Progress" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-neutral-700 dark:text-neutral-300", children: "Policies" })] }) }), _jsx("tbody", { className: "divide-y divide-neutral-200 dark:divide-neutral-700", children: producerData.map((producer) => {
                                        const progress = (producer.earned / producer.target) * 100;
                                        return (_jsxs("tr", { className: "hover:bg-neutral-50 dark:hover:bg-neutral-700", children: [_jsx("td", { className: "py-3 px-4 font-semibold text-neutral-900 dark:text-white", children: producer.name }), _jsxs("td", { className: "py-3 px-4 text-neutral-900 dark:text-white", children: ["$", producer.earned.toLocaleString()] }), _jsxs("td", { className: "py-3 px-4 text-neutral-600 dark:text-neutral-400", children: ["$", producer.target.toLocaleString()] }), _jsxs("td", { className: "py-3 px-4", children: [_jsx("div", { className: "w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2", children: _jsx("div", { className: "bg-primary-600 h-2 rounded-full transition-all", style: { width: `${Math.min(progress, 100)}%` } }) }), _jsxs("p", { className: "text-xs text-neutral-600 dark:text-neutral-400 mt-1", children: [progress.toFixed(0), "%"] })] }), _jsx("td", { className: "py-3 px-4 text-neutral-900 dark:text-white", children: producer.policies })] }, producer.name));
                                    }) })] }) })] })] }));
}

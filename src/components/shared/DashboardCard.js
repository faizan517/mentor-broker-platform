import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const COLOR_MAP = {
    blue: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400',
    red: 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400',
    amber: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
    purple: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
};
export default function DashboardCard({ title, value, icon: Icon, trend, color = 'blue', onClick, }) {
    return (_jsx("div", { onClick: onClick, className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fade-in", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: title }), _jsx("p", { className: "text-2xl font-bold text-neutral-900 dark:text-white mt-2", children: value }), trend && (_jsxs("p", { className: `text-xs mt-2 font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`, children: [trend.isPositive ? '↑' : '↓', " ", trend.value, "% vs last month"] }))] }), _jsx("div", { className: `p-3 rounded-lg ${COLOR_MAP[color]}`, children: _jsx(Icon, { className: "w-6 h-6" }) })] }) }));
}

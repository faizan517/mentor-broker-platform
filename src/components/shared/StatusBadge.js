import { jsx as _jsx } from "react/jsx-runtime";
const VARIANT_MAP = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
    success: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300',
    warning: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
    danger: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300',
    info: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
};
const STATUS_VARIANT_MAP = {
    active: 'success',
    pending: 'warning',
    approved: 'success',
    reported: 'info',
    investigating: 'warning',
    paid: 'success',
    rejected: 'danger',
    denied: 'danger',
    cancelled: 'danger',
    closed: 'default',
    'renewal-pending': 'warning',
    'expiring-soon': 'warning',
    expired: 'danger',
    qualified: 'success',
    converted: 'success',
    lost: 'danger',
    new: 'info',
    quoted: 'warning',
    sent: 'info',
    accepted: 'success',
    draft: 'default',
};
export default function StatusBadge({ status, variant, size = 'md', }) {
    const actualVariant = variant || STATUS_VARIANT_MAP[status] || 'default';
    const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
    return (_jsx("span", { className: `inline-block rounded-full font-medium whitespace-nowrap ${sizeClass} ${VARIANT_MAP[actualVariant]}`, children: status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ') }));
}

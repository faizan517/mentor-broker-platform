import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@components/layouts/DashboardLayout';
import BrokerDashboard from '@components/modules/BrokerDashboard';
import LeadManagement from '@components/modules/LeadManagement';
import QuoteBuilder from '@components/modules/QuoteBuilder';
import ClaimsCenter from '@components/modules/ClaimsCenter';
import RenewalCenter from '@components/modules/RenewalCenter';
import CommissionDashboard from '@components/modules/CommissionDashboard';
import CustomerManagement from '@components/modules/CustomerManagement';
import SettingsPage from '@components/modules/Settings';
export default function DashboardPage() {
    return (_jsx(Routes, { children: _jsxs(Route, { element: _jsx(DashboardLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(BrokerDashboard, {}) }), _jsx(Route, { path: "leads", element: _jsx(LeadManagement, {}) }), _jsx(Route, { path: "quotes", element: _jsx(QuoteBuilder, {}) }), _jsx(Route, { path: "claims", element: _jsx(ClaimsCenter, {}) }), _jsx(Route, { path: "renewals", element: _jsx(RenewalCenter, {}) }), _jsx(Route, { path: "commission", element: _jsx(CommissionDashboard, {}) }), _jsx(Route, { path: "customers", element: _jsx(CustomerManagement, {}) }), _jsx(Route, { path: "settings", element: _jsx(SettingsPage, {}) })] }) }));
}

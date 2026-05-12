import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import CustomerPortalLayout from '@components/layouts/CustomerPortalLayout';
import CustomerDashboard from '@components/modules/CustomerPortal/CustomerDashboard';
import MyPolicies from '@components/modules/CustomerPortal/MyPolicies';
import ClaimCenter from '@components/modules/CustomerPortal/ClaimCenter';
import QuoteRequest from '@components/modules/CustomerPortal/QuoteRequest';
import CommercialGLQuote from '@components/modules/CustomerPortal/CommercialGLQuote';
export default function CustomerPortalPage() {
    return (_jsx(Routes, { children: _jsxs(Route, { element: _jsx(CustomerPortalLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(CustomerDashboard, {}) }), _jsx(Route, { path: "policies", element: _jsx(MyPolicies, {}) }), _jsx(Route, { path: "claims", element: _jsx(ClaimCenter, {}) }), _jsx(Route, { path: "quote", element: _jsx(QuoteRequest, {}) }), _jsx(Route, { path: "commercial-gl", element: _jsx(CommercialGLQuote, {}) })] }) }));
}

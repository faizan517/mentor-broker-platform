import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerPortalLayout from '@components/layouts/CustomerPortalLayout';
import CustomerDashboard from '@components/modules/CustomerPortal/CustomerDashboard';
import MyPolicies from '@components/modules/CustomerPortal/MyPolicies';
import ClaimCenter from '@components/modules/CustomerPortal/ClaimCenter';
import QuoteRequest from '@components/modules/CustomerPortal/QuoteRequest';

export default function CustomerPortalPage() {
  return (
    <Routes>
      <Route element={<CustomerPortalLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="policies" element={<MyPolicies />} />
        <Route path="claims" element={<ClaimCenter />} />
        <Route path="quote" element={<QuoteRequest />} />
      </Route>
    </Routes>
  );
}

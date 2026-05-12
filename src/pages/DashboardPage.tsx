import React from 'react';
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
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<BrokerDashboard />} />
        <Route path="leads" element={<LeadManagement />} />
        <Route path="quotes" element={<QuoteBuilder />} />
        <Route path="claims" element={<ClaimsCenter />} />
        <Route path="renewals" element={<RenewalCenter />} />
        <Route path="commission" element={<CommissionDashboard />} />
        <Route path="customers" element={<CustomerManagement />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

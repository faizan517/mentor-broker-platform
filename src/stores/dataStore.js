import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initializeAllData } from '@data/generators';
export const useDataStore = create()(persist((set, get) => ({
    customers: [],
    policies: [],
    claims: [],
    leads: [],
    renewals: [],
    quotes: [],
    isInitialized: false,
    initializeData: () => {
        const state = get();
        if (state.isInitialized)
            return;
        const data = initializeAllData();
        set({
            customers: data.customers,
            policies: data.policies,
            claims: data.claims,
            leads: data.leads,
            renewals: data.renewals,
            quotes: data.quotes,
            isInitialized: true,
        });
    },
    getCustomer: (id) => {
        return get().customers.find((c) => c.id === id);
    },
    getPolicy: (id) => {
        return get().policies.find((p) => p.id === id);
    },
    getClaim: (id) => {
        return get().claims.find((c) => c.id === id);
    },
    getLead: (id) => {
        return get().leads.find((l) => l.id === id);
    },
    getRenewal: (id) => {
        return get().renewals.find((r) => r.id === id);
    },
    getQuote: (id) => {
        return get().quotes.find((q) => q.id === id);
    },
    getCustomerPolicies: (customerId) => {
        return get().policies.filter((p) => p.customerId === customerId);
    },
    getCustomerClaims: (customerId) => {
        return get().claims.filter((c) => c.customerId === customerId);
    },
    getCustomerRenewals: (customerId) => {
        return get().renewals.filter((r) => r.customerId === customerId);
    },
    updateLead: (id, updates) => {
        set((state) => ({
            leads: state.leads.map((l) => l.id === id ? { ...l, ...updates } : l),
        }));
    },
    updateQuote: (id, updates) => {
        set((state) => ({
            quotes: state.quotes.map((q) => q.id === id ? { ...q, ...updates } : q),
        }));
    },
    updateClaim: (id, updates) => {
        set((state) => ({
            claims: state.claims.map((c) => c.id === id ? { ...c, ...updates } : c),
        }));
    },
    addLead: (lead) => {
        set((state) => ({
            leads: [...state.leads, lead],
        }));
    },
}), {
    name: 'mentor-data-storage',
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Customer,
  Policy,
  Claim,
  Lead,
  Renewal,
  Quote,
} from '@types/index';
import { initializeAllData } from '@data/generators';

interface DataState {
  customers: Customer[];
  policies: Policy[];
  claims: Claim[];
  leads: Lead[];
  renewals: Renewal[];
  quotes: Quote[];
  isInitialized: boolean;
  initializeData: () => void;
  getCustomer: (id: string) => Customer | undefined;
  getPolicy: (id: string) => Policy | undefined;
  getClaim: (id: string) => Claim | undefined;
  getLead: (id: string) => Lead | undefined;
  getRenewal: (id: string) => Renewal | undefined;
  getQuote: (id: string) => Quote | undefined;
  getCustomerPolicies: (customerId: string) => Policy[];
  getCustomerClaims: (customerId: string) => Claim[];
  getCustomerRenewals: (customerId: string) => Renewal[];
  updateLead: (id: string, updates: Partial<Lead>) => void;
  updateQuote: (id: string, updates: Partial<Quote>) => void;
  updateClaim: (id: string, updates: Partial<Claim>) => void;
  addLead: (lead: Lead) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      customers: [],
      policies: [],
      claims: [],
      leads: [],
      renewals: [],
      quotes: [],
      isInitialized: false,
      initializeData: () => {
        const state = get();
        if (state.isInitialized) return;

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
      getCustomer: (id: string) => {
        return get().customers.find((c) => c.id === id);
      },
      getPolicy: (id: string) => {
        return get().policies.find((p) => p.id === id);
      },
      getClaim: (id: string) => {
        return get().claims.find((c) => c.id === id);
      },
      getLead: (id: string) => {
        return get().leads.find((l) => l.id === id);
      },
      getRenewal: (id: string) => {
        return get().renewals.find((r) => r.id === id);
      },
      getQuote: (id: string) => {
        return get().quotes.find((q) => q.id === id);
      },
      getCustomerPolicies: (customerId: string) => {
        return get().policies.filter((p) => p.customerId === customerId);
      },
      getCustomerClaims: (customerId: string) => {
        return get().claims.filter((c) => c.customerId === customerId);
      },
      getCustomerRenewals: (customerId: string) => {
        return get().renewals.filter((r) => r.customerId === customerId);
      },
      updateLead: (id: string, updates: Partial<Lead>) => {
        set((state) => ({
          leads: state.leads.map((l) =>
            l.id === id ? { ...l, ...updates } : l
          ),
        }));
      },
      updateQuote: (id: string, updates: Partial<Quote>) => {
        set((state) => ({
          quotes: state.quotes.map((q) =>
            q.id === id ? { ...q, ...updates } : q
          ),
        }));
      },
      updateClaim: (id: string, updates: Partial<Claim>) => {
        set((state) => ({
          claims: state.claims.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },
      addLead: (lead: Lead) => {
        set((state) => ({
          leads: [...state.leads, lead],
        }));
      },
    }),
    {
      name: 'mentor-data-storage',
    }
  )
);

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  policies: string[];
  isPriority: boolean;
  industry?: string;
  businessType?: 'individual' | 'business';
  createdAt: string;
}

export interface Coverage {
  type: string;
  limit: number;
  deductible: number;
  premium: number;
}

export interface Policy {
  id: string;
  customerId: string;
  policyNumber: string;
  productType: 'auto' | 'home' | 'commercial' | 'workers-comp' | 'medicare';
  carrierId: string;
  premium: number;
  status: 'active' | 'pending' | 'expiring-soon' | 'renewal-pending' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  renewalDate?: string;
  coverages: Coverage[];
  documents: Document[];
  bundleId?: string;
  createdAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface ClaimTimeline {
  date: string;
  status: 'reported' | 'investigating' | 'approved' | 'paid' | 'closed';
  notes: string;
}

export interface Claim {
  id: string;
  customerId: string;
  policyId: string;
  claimNumber: string;
  status: 'reported' | 'investigating' | 'approved' | 'paid' | 'denied' | 'closed';
  reportedDate: string;
  amount: number;
  reservedAmount: number;
  paidAmount: number;
  adjuster: string;
  description: string;
  documents: Document[];
  timeline: ClaimTimeline[];
  createdAt: string;
}

export interface Renewal {
  id: string;
  customerId: string;
  policyId: string;
  currentPremium: number;
  newPremium: number;
  renewalDate: string;
  status: 'pending' | 'quoted' | 'renewed' | 'cancelled';
  riskScore: number;
  crossSellOpportunities: string[];
  quoteId?: string;
  createdAt: string;
}

export interface QuoteOption {
  carrierId: string;
  carrierName: string;
  premium: number;
  coverages: Coverage[];
  turnaroundDays: number;
  rating: number;
}

export interface Quote {
  id: string;
  customerId: string;
  productType: 'auto' | 'home' | 'commercial' | 'workers-comp' | 'medicare';
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  quotes: QuoteOption[];
  selectedQuoteId?: string;
  createdAt: string;
  expiryDate: string;
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  productType: 'auto' | 'home' | 'commercial' | 'workers-comp' | 'medicare';
  status: 'new' | 'qualified' | 'quoted' | 'converted' | 'lost';
  createdAt: string;
  assignedProducerId?: string;
  assignedProducerName?: string;
  score: number;
  notes?: string;
  source?: string;
}

export interface Carrier {
  id: string;
  name: string;
  productLines: string[];
  supportedStates: string[];
  apiAvailable: boolean;
  commission: number;
  turnaroundDays: number;
  contactEmail: string;
  contactPhone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'broker' | 'producer' | 'csr' | 'claims' | 'finance' | 'admin' | 'customer';
  department?: string;
  phone?: string;
}

export interface DexaSuggestedAction {
  label: string;
  action: string;
  icon?: string;
}

export interface DexaMessage {
  id: string;
  role: 'user' | 'dexa';
  content: string;
  timestamp: string;
  context?: string;
  suggestedActions?: DexaSuggestedAction[];
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

export interface ThemeState {
  isDark: boolean;
}

export interface DataState {
  customers: Customer[];
  policies: Policy[];
  claims: Claim[];
  leads: Lead[];
  renewals: Renewal[];
  quotes: Quote[];
  isInitialized: boolean;
}

export interface DexaState {
  messages: DexaMessage[];
  isOpen: boolean;
  currentContext?: string;
  isLoading: boolean;
}

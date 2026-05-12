import {
  Customer,
  Policy,
  Claim,
  Lead,
  Renewal,
  Quote,
  Coverage,
  ClaimTimeline,
} from '@types';

const FIRST_NAMES = [
  'Sarah', 'John', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Amanda',
  'James', 'Lisa', 'William', 'Jennifer', 'Richard', 'Linda', 'Joseph', 'Barbara',
  'Thomas', 'Susan', 'Charles', 'Patricia', 'Christopher', 'Maria', 'Daniel', 'Margaret',
  'Matthew', 'Sandra', 'Anthony', 'Ashley', 'Mark', 'Kimberly', 'Donald', 'Donna'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
];

const INDUSTRIES = [
  'Construction', 'Healthcare', 'Technology', 'Retail', 'Manufacturing',
  'Finance', 'Transportation', 'Real Estate', 'Education', 'Hospitality'
];

const CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
  'Boston', 'Seattle', 'Denver', 'Miami', 'Atlanta', 'Portland'
];

const STATES = [
  'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD',
  'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const CARRIERS = [
  'State Farm', 'Allstate', 'GEICO', 'Progressive', 'Liberty Mutual',
  'Farmers', 'Nationwide', 'Hartford', 'Travelers', 'USAA'
];

const PRODUCT_TYPES: ('auto' | 'home' | 'commercial' | 'workers-comp' | 'medicare')[] = [
  'auto', 'home', 'commercial', 'workers-comp', 'medicare'
];

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomString(length: number): string {
  return Math.random().toString(36).substring(2, length + 2);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

export function randomPhone(): string {
  return `(${randomBetween(200, 999)}) ${randomBetween(200, 999)}-${randomBetween(1000, 9999)}`;
}

export function randomEmail(firstName: string, lastName: string): string {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'email.com'];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomElement(domains)}`;
}

export function randomAddress(): string {
  const streets = ['Main', 'Oak', 'Elm', 'Maple', 'Pine', 'Cedar', 'Birch', 'Walnut'];
  const types = ['St', 'Ave', 'Rd', 'Blvd', 'Dr', 'Lane'];
  return `${randomBetween(100, 9999)} ${randomElement(streets)} ${randomElement(types)}`;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function generateCoverages(productType: string): Coverage[] {
  const coverageMap: Record<string, Coverage[]> = {
    auto: [
      { type: 'Liability', limit: 100000, deductible: 1000, premium: 120 },
      { type: 'Collision', limit: 50000, deductible: 500, premium: 80 },
      { type: 'Comprehensive', limit: 50000, deductible: 500, premium: 60 },
    ],
    home: [
      { type: 'Dwelling', limit: 500000, deductible: 2500, premium: 150 },
      { type: 'Personal Property', limit: 250000, deductible: 2500, premium: 100 },
      { type: 'Liability', limit: 300000, deductible: 0, premium: 50 },
    ],
    commercial: [
      { type: 'General Liability', limit: 1000000, deductible: 5000, premium: 500 },
      { type: 'Property', limit: 2000000, deductible: 5000, premium: 700 },
      { type: 'Workers Comp', limit: 500000, deductible: 0, premium: 300 },
    ],
    'workers-comp': [
      { type: 'Medical', limit: 1000000, deductible: 0, premium: 200 },
      { type: 'Wage Loss', limit: 500000, deductible: 0, premium: 150 },
    ],
    medicare: [
      { type: 'Hospital', limit: 1000000, deductible: 500, premium: 120 },
      { type: 'Medical', limit: 1000000, deductible: 0, premium: 100 },
    ],
  };
  return coverageMap[productType] || [];
}

export function generateCustomers(count: number): Customer[] {
  const customers: Customer[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = randomElement(FIRST_NAMES);
    const lastName = randomElement(LAST_NAMES);
    customers.push({
      id: generateId(),
      name: `${firstName} ${lastName}`,
      email: randomEmail(firstName, lastName),
      phone: randomPhone(),
      address: randomAddress(),
      city: randomElement(CITIES),
      state: randomElement(STATES),
      zip: randomBetween(10000, 99999).toString(),
      policies: [],
      isPriority: Math.random() < 0.2,
      businessType: Math.random() < 0.3 ? 'business' : 'individual',
      industry: Math.random() < 0.4 ? randomElement(INDUSTRIES) : undefined,
      createdAt: formatDate(addDays(new Date(), -randomBetween(1, 365))),
    });
  }
  return customers;
}

export function generatePolicies(customers: Customer[], count: number): Policy[] {
  const policies: Policy[] = [];
  const statusOptions: Policy['status'][] = [
    'active', 'active', 'active', 'active', 'active',
    'pending', 'expiring-soon', 'renewal-pending', 'cancelled'
  ];

  for (let i = 0; i < count; i++) {
    const customer = randomElement(customers);
    const productType = randomElement(PRODUCT_TYPES);
    const startDate = addDays(new Date(), -randomBetween(30, 730));
    const endDate = addDays(startDate, 365);

    const policy: Policy = {
      id: generateId(),
      customerId: customer.id,
      policyNumber: `${randomElement(CARRIERS).substring(0, 3).toUpperCase()}-${randomBetween(100000, 999999)}`,
      productType,
      carrierId: generateId(),
      premium: randomBetween(800, 5000),
      status: randomElement(statusOptions),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      renewalDate: formatDate(addDays(endDate, 30)),
      coverages: generateCoverages(productType),
      documents: [],
      bundleId: Math.random() < 0.3 ? generateId() : undefined,
      createdAt: formatDate(startDate),
    };

    policies.push(policy);
    if (!customer.policies.includes(policy.id)) {
      customer.policies.push(policy.id);
    }
  }

  return policies;
}

export function generateClaims(policies: Policy[], count: number): Claim[] {
  const claims: Claim[] = [];
  const claimablePolicies = policies.filter(p => p.status === 'active');

  for (let i = 0; i < count; i++) {
    const policy = randomElement(claimablePolicies);
    const reportedDate = addDays(new Date(), -randomBetween(1, 180));
    const statusOptions: Claim['status'][] = [
      'reported', 'investigating', 'investigating', 'approved', 'paid', 'closed'
    ];
    const status = randomElement(statusOptions);

    const timeline: ClaimTimeline[] = [
      {
        date: formatDate(reportedDate),
        status: 'reported',
        notes: 'Claim reported by customer',
      },
    ];

    if (status !== 'reported') {
      timeline.push({
        date: formatDate(addDays(reportedDate, randomBetween(1, 10))),
        status: 'investigating',
        notes: 'Adjuster assigned and investigation started',
      });
    }

    if (['approved', 'paid', 'closed'].includes(status)) {
      timeline.push({
        date: formatDate(addDays(reportedDate, randomBetween(11, 30))),
        status: 'approved',
        notes: 'Claim approved for payment',
      });
    }

    if (['paid', 'closed'].includes(status)) {
      timeline.push({
        date: formatDate(addDays(reportedDate, randomBetween(31, 45))),
        status: 'paid',
        notes: 'Payment issued',
      });
    }

    const amount = randomBetween(5000, 100000);
    const paidAmount = status === 'denied' ? 0 : Math.floor(amount * (0.7 + Math.random() * 0.3));

    claims.push({
      id: generateId(),
      customerId: policy.customerId,
      policyId: policy.id,
      claimNumber: `CLM-${randomBetween(1000000, 9999999)}`,
      status,
      reportedDate: formatDate(reportedDate),
      amount,
      reservedAmount: amount,
      paidAmount,
      adjuster: `${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`,
      description: `Claim for ${policy.productType} policy damage/loss`,
      documents: [],
      timeline,
      createdAt: formatDate(reportedDate),
    });
  }

  return claims;
}

export function generateLeads(count: number): Lead[] {
  const leads: Lead[] = [];
  const producers = [
    { name: 'Mike Johnson', id: 'producer-1' },
    { name: 'Sarah Chen', id: 'producer-2' },
    { name: 'David Smith', id: 'producer-3' },
  ];

  for (let i = 0; i < count; i++) {
    const firstName = randomElement(FIRST_NAMES);
    const lastName = randomElement(LAST_NAMES);
    const producer = Math.random() < 0.6 ? randomElement(producers) : undefined;
    const statusOptions: Lead['status'][] = [
      'new', 'new', 'qualified', 'qualified', 'quoted', 'converted', 'lost'
    ];

    leads.push({
      id: generateId(),
      name: `${firstName} ${lastName}`,
      email: randomEmail(firstName, lastName),
      phone: randomPhone(),
      productType: randomElement(PRODUCT_TYPES),
      status: randomElement(statusOptions),
      createdAt: formatDate(addDays(new Date(), -randomBetween(1, 90))),
      assignedProducerId: producer?.id,
      assignedProducerName: producer?.name,
      score: randomBetween(30, 95),
      source: randomElement(['Website', 'Referral', 'Cold Call', 'Event']),
    });
  }

  return leads;
}

export function generateRenewals(policies: Policy[]): Renewal[] {
  const renewals: Renewal[] = [];
  const renewalPolicies = policies.filter(
    p => p.status === 'renewal-pending' || p.status === 'active'
  ).slice(0, Math.ceil(policies.length * 0.15));

  renewalPolicies.forEach(policy => {
    const currentPremium = policy.premium;
    const priceIncrease = 1 + (Math.random() * 0.2 - 0.05);
    const newPremium = Math.floor(currentPremium * priceIncrease);
    const riskScore = randomBetween(40, 95);

    const crossSellOpportunities: string[] = [];
    if (policy.productType === 'auto') {
      crossSellOpportunities.push('Home', 'Umbrella');
    } else if (policy.productType === 'home') {
      crossSellOpportunities.push('Auto', 'Umbrella');
    }

    renewals.push({
      id: generateId(),
      customerId: policy.customerId,
      policyId: policy.id,
      currentPremium,
      newPremium,
      renewalDate: policy.renewalDate || formatDate(addDays(new Date(), 30)),
      status: 'pending',
      riskScore,
      crossSellOpportunities,
      createdAt: formatDate(new Date()),
    });
  });

  return renewals;
}

export function generateQuotes(leads: Lead[], count: number): Quote[] {
  const quotes: Quote[] = [];
  const quotableLeads = leads.filter(l => ['qualified', 'quoted', 'converted'].includes(l.status));

  for (let i = 0; i < Math.min(count, quotableLeads.length); i++) {
    const lead = quotableLeads[i];
    const quoteOptions = [];

    for (let j = 0; j < randomBetween(2, 4); j++) {
      quoteOptions.push({
        carrierId: generateId(),
        carrierName: randomElement(CARRIERS),
        premium: randomBetween(800, 3000),
        coverages: generateCoverages(lead.productType),
        turnaroundDays: randomBetween(3, 10),
        rating: randomBetween(3, 5),
      });
    }

    const createdDate = addDays(new Date(), -randomBetween(1, 30));

    quotes.push({
      id: generateId(),
      customerId: '', // Will be populated from lead data if needed
      productType: lead.productType,
      status: Math.random() < 0.5 ? 'sent' : 'draft',
      quotes: quoteOptions,
      selectedQuoteId: Math.random() < 0.3 ? quoteOptions[0].carrierId : undefined,
      createdAt: formatDate(createdDate),
      expiryDate: formatDate(addDays(createdDate, 30)),
    });
  }

  return quotes;
}

export function initializeAllData() {
  const customers = generateCustomers(200);
  const policies = generatePolicies(customers, 500);
  const claims = generateClaims(policies, Math.floor(policies.length * 0.03));
  const leads = generateLeads(50);
  const renewals = generateRenewals(policies);
  const quotes = generateQuotes(leads, 25);

  return {
    customers,
    policies,
    claims,
    leads,
    renewals,
    quotes,
  };
}

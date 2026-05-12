import React from 'react';
import { ChevronRight, Check, AlertCircle, Building2 } from 'lucide-react';
import { useAuthStore } from '@stores/authStore';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import CommercialGLComparison from './CommercialGLComparison';

type Step = 'business' | 'coverage' | 'risk' | 'review' | 'submitted';

interface BusinessInfo {
  companyName: string;
  industry: string;
  employees: number;
  annualRevenue: string;
  yearsInBusiness: number;
  existingCoverage: string;
}

interface CoverageSelection {
  glLimit: string;
  propertyLimit: string;
  cyberLiability: boolean;
  workersComp: boolean;
}

interface RiskAssessment {
  claimsHistory: string;
  highRiskOps: boolean;
  safetyProgram: boolean;
  complianceCertifications: string;
}

export default function CommercialGLQuote() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const customers = useDataStore((state) => state.customers);
  const setContext = useDexaStore((state) => state.setContext);

  const [step, setStep] = React.useState<Step>('business');
  const [generatedQuotes, setGeneratedQuotes] = React.useState<any[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = React.useState<string | null>(null);

  const [business, setBusiness] = React.useState<BusinessInfo>({
    companyName: '',
    industry: 'construction',
    employees: 10,
    annualRevenue: '500k-1m',
    yearsInBusiness: 5,
    existingCoverage: 'none',
  });

  const [coverage, setCoverage] = React.useState<CoverageSelection>({
    glLimit: '2m',
    propertyLimit: '1m',
    cyberLiability: false,
    workersComp: false,
  });

  const [risk, setRisk] = React.useState<RiskAssessment>({
    claimsHistory: 'none',
    highRiskOps: false,
    safetyProgram: false,
    complianceCertifications: 'none',
  });

  const myCustomer = customers.find((c) => c.name === currentUser?.name);

  React.useEffect(() => {
    setContext('quotes:draft');
  }, [setContext]);

  const INDUSTRIES = [
    'Construction',
    'Retail',
    'Professional Services',
    'Manufacturing',
    'Healthcare',
    'Technology',
    'Hospitality',
    'Real Estate',
  ];

  const handleBusinessNext = () => {
    if (business.companyName.trim()) {
      setStep('coverage');
    }
  };

  const handleCoverageNext = () => {
    setStep('risk');
  };

  const handleRiskNext = () => {
    setStep('review');
  };

  const handleGenerateQuotes = () => {
    // Generate commercial GL quotes based on selections
    const basePrice = {
      '1m': 800,
      '2m': 1200,
      '3m': 1500,
    };

    const glBase = basePrice[coverage.glLimit as keyof typeof basePrice] || 1200;
    const propertyAddon = coverage.propertyLimit === '1m' ? 300 : 500;
    const cyberAddon = coverage.cyberLiability ? 400 : 0;
    const workersAddon = coverage.workersComp ? 600 : 0;

    const riskMultiplier = risk.highRiskOps ? 1.3 : risk.claimsHistory !== 'none' ? 1.15 : 1.0;

    const carriers = [
      { name: 'Chubb Commercial', rating: 4.9 },
      { name: 'Liberty Mutual Business', rating: 4.7 },
      { name: 'Hartford Commercial', rating: 4.6 },
      { name: 'Travelers Business', rating: 4.5 },
    ];

    const quotes = carriers.map((carrier, idx) => {
      const basePremium = (glBase + propertyAddon + cyberAddon + workersAddon) * riskMultiplier;
      const premium = basePremium + (idx * 100);

      return {
        id: `quote-${Date.now()}-${idx}`,
        carrierId: `carrier-${idx}`,
        carrierName: carrier.name,
        premium: Math.round(premium),
        annualPremium: Math.round(premium * 12),
        glLimit: coverage.glLimit,
        propertyLimit: coverage.propertyLimit,
        cyberLiability: coverage.cyberLiability,
        workersComp: coverage.workersComp,
        turnaroundDays: 5 + idx,
        rating: carrier.rating,
        riskScore: risk.highRiskOps ? 72 : risk.claimsHistory !== 'none' ? 65 : 45,
      };
    });

    setGeneratedQuotes(quotes);
    setStep('submitted');
  };

  if (step === 'submitted' && selectedQuoteId) {
    return (
      <CommercialGLComparison
        quotes={generatedQuotes}
        selectedQuoteId={selectedQuoteId}
        businessInfo={business}
        coverageSelection={coverage}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          Commercial General Liability Quote
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Get the right coverage for your business
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-2 overflow-x-auto">
        {['business', 'coverage', 'risk', 'review', 'submitted'].map((s, idx) => (
          <div key={s} className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step === s
                  ? 'bg-primary-600 text-white'
                  : ['business', 'coverage', 'risk', 'review'].indexOf(s) < ['business', 'coverage', 'risk', 'review'].indexOf(step)
                  ? 'bg-green-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {['business', 'coverage', 'risk', 'review'].indexOf(s) < ['business', 'coverage', 'risk', 'review'].indexOf(step) ? (
                <Check className="w-5 h-5" />
              ) : (
                idx + 1
              )}
            </div>
            {idx < 4 && <div className="w-8 h-1 bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step 1: Business Information */}
      {step === 'business' && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Tell us about your business
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={business.companyName}
                onChange={(e) => setBusiness({ ...business, companyName: e.target.value })}
                placeholder="Enter your company name"
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Industry *
              </label>
              <select
                value={business.industry}
                onChange={(e) => setBusiness({ ...business, industry: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind.toLowerCase()}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Number of Employees *
                </label>
                <input
                  type="number"
                  value={business.employees}
                  onChange={(e) => setBusiness({ ...business, employees: parseInt(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Years in Business *
                </label>
                <input
                  type="number"
                  value={business.yearsInBusiness}
                  onChange={(e) => setBusiness({ ...business, yearsInBusiness: parseInt(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Annual Revenue *
              </label>
              <select
                value={business.annualRevenue}
                onChange={(e) => setBusiness({ ...business, annualRevenue: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              >
                <option value="0-250k">$0 - $250K</option>
                <option value="250k-500k">$250K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="5m+">$5M+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Existing Coverage
              </label>
              <select
                value={business.existingCoverage}
                onChange={(e) => setBusiness({ ...business, existingCoverage: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              >
                <option value="none">No existing coverage</option>
                <option value="expired">Expired coverage</option>
                <option value="limited">Limited coverage</option>
                <option value="adequate">Adequate coverage</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleBusinessNext}
            disabled={!business.companyName.trim()}
            className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Coverage Options */}
      {step === 'coverage' && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Select your coverage
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                General Liability Limit *
              </label>
              <div className="space-y-2">
                {['1m', '2m', '3m'].map((limit) => (
                  <label key={limit} className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer">
                    <input
                      type="radio"
                      name="glLimit"
                      value={limit}
                      checked={coverage.glLimit === limit}
                      onChange={(e) => setCoverage({ ...coverage, glLimit: e.target.value })}
                    />
                    <span className="text-neutral-900 dark:text-white font-medium">${limit === '1m' ? '1M' : limit === '2m' ? '2M' : '3M'} Aggregate</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Property Coverage Limit *
              </label>
              <div className="space-y-2">
                {['500k', '1m', '2m'].map((limit) => (
                  <label key={limit} className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer">
                    <input
                      type="radio"
                      name="propertyLimit"
                      value={limit}
                      checked={coverage.propertyLimit === limit}
                      onChange={(e) => setCoverage({ ...coverage, propertyLimit: e.target.value })}
                    />
                    <span className="text-neutral-900 dark:text-white font-medium">
                      ${limit === '500k' ? '500K' : limit === '1m' ? '1M' : '2M'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={coverage.cyberLiability}
                  onChange={(e) => setCoverage({ ...coverage, cyberLiability: e.target.checked })}
                />
                <div>
                  <p className="text-neutral-900 dark:text-white font-medium">Add Cyber Liability</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">Data breach & ransomware protection</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={coverage.workersComp}
                  onChange={(e) => setCoverage({ ...coverage, workersComp: e.target.checked })}
                />
                <div>
                  <p className="text-neutral-900 dark:text-white font-medium">Add Workers' Compensation</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">Employee injury & illness coverage</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('business')}
              className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleCoverageNext}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Risk Assessment */}
      {step === 'risk' && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Risk assessment
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Claims History *
              </label>
              <select
                value={risk.claimsHistory}
                onChange={(e) => setRisk({ ...risk, claimsHistory: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              >
                <option value="none">No claims in past 3 years</option>
                <option value="minor">1-2 minor claims</option>
                <option value="moderate">3+ claims or 1 major claim</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={risk.highRiskOps}
                  onChange={(e) => setRisk({ ...risk, highRiskOps: e.target.checked })}
                />
                <div>
                  <p className="text-neutral-900 dark:text-white font-medium">High-Risk Operations</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">Hazardous work, heights, or heavy machinery</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={risk.safetyProgram}
                  onChange={(e) => setRisk({ ...risk, safetyProgram: e.target.checked })}
                />
                <div>
                  <p className="text-neutral-900 dark:text-white font-medium">Active Safety Program</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">OSHA training, safety manager, incident tracking</p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Compliance Certifications
              </label>
              <select
                value={risk.complianceCertifications}
                onChange={(e) => setRisk({ ...risk, complianceCertifications: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              >
                <option value="none">None</option>
                <option value="iso">ISO certified</option>
                <option value="osha">OSHA certified</option>
                <option value="multiple">Multiple certifications</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Risk Score Impact:</strong> Your answers help underwriters assess your risk profile and determine the best premium for your business.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('coverage')}
              className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleRiskNext}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 'review' && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Review your information
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Company</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{business.companyName}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Industry</p>
                <p className="font-semibold text-neutral-900 dark:text-white capitalize">{business.industry}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Employees</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{business.employees}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Years in Business</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{business.yearsInBusiness}</p>
              </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">Coverage Selected</p>
              <div className="space-y-1 text-sm text-neutral-900 dark:text-white">
                <p>✓ GL Limit: ${coverage.glLimit === '1m' ? '1M' : coverage.glLimit === '2m' ? '2M' : '3M'}</p>
                <p>✓ Property: ${coverage.propertyLimit === '500k' ? '500K' : coverage.propertyLimit === '1m' ? '1M' : '2M'}</p>
                {coverage.cyberLiability && <p>✓ Cyber Liability</p>}
                {coverage.workersComp && <p>✓ Workers' Compensation</p>}
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Ready to compare quotes?</strong> We'll get you competitive bids from top commercial carriers within minutes.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('risk')}
              className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleGenerateQuotes}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Commercial Quotes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

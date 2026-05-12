import React from 'react';
import { ChevronRight, Check, Car, Home, Building2, FileText, Shield } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';
import { useDexaStore } from '@stores/dexaStore';
import QuoteComparison from './QuoteComparison';

type Step = 'product' | 'coverage' | 'review' | 'submitted';

export default function QuoteRequest() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const customers = useDataStore((state) => state.customers);
  const quotes = useDataStore((state) => state.quotes);
  const updateQuote = useDataStore((state) => state.updateQuote);
  const setContext = useDexaStore((state) => state.setContext);

  const [step, setStep] = React.useState<Step>('product');
  const [productType, setProductType] = React.useState<'auto' | 'home' | 'commercial' | 'workers-comp' | 'medicare'>('auto');
  const [coverage, setCoverage] = React.useState('standard');
  const [notes, setNotes] = React.useState('');
  const [selectedQuoteId, setSelectedQuoteId] = React.useState<string | null>(null);
  const [generatedQuotes, setGeneratedQuotes] = React.useState<any[]>([]);

  const myCustomer = customers.find((c) => c.name === currentUser?.name);

  React.useEffect(() => {
    setContext('quotes:draft');
  }, [setContext]);

  const PRODUCT_INFO = {
    auto: { label: 'Auto Insurance', icon: Car, description: 'Coverage for vehicles' },
    home: { label: 'Home Insurance', icon: Home, description: 'Coverage for your residence' },
    commercial: { label: 'Commercial Insurance', icon: Building2, description: 'Business coverage' },
    'workers-comp': { label: "Workers' Compensation", icon: Shield, description: 'Employee protection' },
    medicare: { label: 'Medicare Supplement', icon: FileText, description: 'Health coverage' },
  };

  const handleProductSelect = (product: typeof productType) => {
    setProductType(product);
    setStep('coverage');
  };

  const handleGenerateQuotes = () => {
    // Generate mock quotes from different carriers
    const carriers = [
      { name: 'State Farm', premium: 1250, rating: 4.8 },
      { name: 'Progressive', premium: 1180, rating: 4.6 },
      { name: 'GEICO', premium: 1320, rating: 4.5 },
      { name: 'Allstate', premium: 1400, rating: 4.4 },
    ];

    const quotes = carriers.map((carrier, idx) => ({
      id: `quote-${Date.now()}-${idx}`,
      carrierId: `carrier-${idx}`,
      carrierName: carrier.name,
      premium: carrier.premium,
      coverages: [],
      turnaroundDays: 3 + idx,
      rating: carrier.rating,
    }));

    setGeneratedQuotes(quotes);
    setStep('submitted');
  };

  const handleCoverageNext = () => {
    setStep('review');
  };

  if (step === 'submitted' && selectedQuoteId) {
    return <QuoteComparison quotes={generatedQuotes} selectedQuoteId={selectedQuoteId} productType={productType} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Get a Quote</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Get personalized insurance quotes in minutes
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-2">
        {['product', 'coverage', 'review', 'submitted'].map((s, idx) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step === s
                  ? 'bg-primary-600 text-white'
                  : ['product', 'coverage', 'review'].indexOf(s) < ['product', 'coverage', 'review'].indexOf(step)
                  ? 'bg-green-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {['product', 'coverage', 'review'].indexOf(s) < ['product', 'coverage', 'review'].indexOf(step) ? (
                <Check className="w-5 h-5" />
              ) : (
                idx + 1
              )}
            </div>
            {idx < 3 && <div className="w-12 h-1 bg-neutral-200 dark:bg-neutral-700" />}
          </div>
        ))}
      </div>

      {/* Step 1: Product Selection */}
      {step === 'product' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            What coverage do you need?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(PRODUCT_INFO).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleProductSelect(key as any)}
                  className="p-6 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all text-left"
                >
                  <Icon className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{info.label}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{info.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Coverage Options */}
      {step === 'coverage' && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Choose your coverage level
          </h2>

          <div className="space-y-3">
            {['basic', 'standard', 'premium'].map((level) => (
              <label key={level} className="flex items-center gap-4 p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="coverage"
                  value={level}
                  checked={coverage === level}
                  onChange={(e) => setCoverage(e.target.value)}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900 dark:text-white capitalize">{level} Coverage</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {level === 'basic' && 'Essential protection with competitive pricing'}
                    {level === 'standard' && 'Balanced protection and affordability (Recommended)'}
                    {level === 'premium' && 'Comprehensive coverage with maximum protection'}
                  </p>
                </div>
                <span className="font-semibold text-primary-600">
                  {level === 'basic' && '$49/mo'}
                  {level === 'standard' && '$79/mo'}
                  {level === 'premium' && '$129/mo'}
                </span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Tell us more (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific needs or questions about your coverage?"
              rows={4}
              className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('product')}
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

      {/* Step 3: Review & Submit */}
      {step === 'review' && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Review your request</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Name</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{myCustomer?.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Email</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{myCustomer?.email}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Coverage Type</p>
                <p className="font-semibold text-neutral-900 dark:text-white capitalize">
                  {PRODUCT_INFO[productType].label}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Coverage Level</p>
                <p className="font-semibold text-neutral-900 dark:text-white capitalize">{coverage}</p>
              </div>
            </div>

            {notes && (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Notes</p>
                <p className="text-neutral-900 dark:text-white">{notes}</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>What happens next:</strong> We'll generate personalized quotes from our top carriers. You'll see pricing and coverage options instantly.
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
              onClick={handleGenerateQuotes}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Quotes
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Quote Submission */}
      {step === 'submitted' && !selectedQuoteId && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
            Quotes Ready!
          </h2>
          <p className="text-green-700 dark:text-green-300 mb-4">
            We found quotes from multiple carriers. Compare pricing and coverage below.
          </p>

          <div className="space-y-3 mt-6">
            {generatedQuotes.map((quote) => (
              <button
                key={quote.id}
                onClick={() => setSelectedQuoteId(quote.id)}
                className="w-full p-4 border-2 border-green-200 dark:border-green-800 hover:border-primary-500 dark:hover:border-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">{quote.carrierName}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      ⭐ {quote.rating} • {quote.turnaroundDays} day turnaround
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">${quote.premium}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">/month</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

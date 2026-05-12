import React from 'react';
import { Check, ChevronLeft, Download, FileText } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';

interface QuoteComparisonProps {
  quotes: any[];
  selectedQuoteId: string;
  productType: string;
}

export default function QuoteComparison({ quotes, selectedQuoteId, productType }: QuoteComparisonProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const customers = useDataStore((state) => state.customers);
  const updateQuote = useDataStore((state) => state.updateQuote);
  const [step, setStep] = React.useState<'comparison' | 'accepted'>('comparison');

  const myCustomer = customers.find((c) => c.name === currentUser?.name);
  const selectedQuote = quotes.find((q) => q.id === selectedQuoteId);

  const handleAcceptQuote = () => {
    setStep('accepted');
  };

  if (step === 'accepted' && selectedQuote) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Quote Accepted!</h1>

        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-8 text-center space-y-6">
          <div className="text-6xl">✓</div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Your quote has been accepted!
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              We're processing your order with {selectedQuote.carrierName}
            </p>
          </div>

          <div className="bg-primary-50 dark:bg-primary-950 rounded-lg p-6 text-left space-y-4">
            <h3 className="font-semibold text-neutral-900 dark:text-white">Quote Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Carrier</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{selectedQuote.carrierName}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Monthly Premium</p>
                <p className="text-xl font-bold text-primary-600">${selectedQuote.premium}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Quote ID</p>
                <p className="font-mono text-sm text-neutral-900 dark:text-white">
                  QT-{Date.now().toString().slice(-6)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Coverage Type</p>
                <p className="font-semibold text-neutral-900 dark:text-white capitalize">{productType}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>What's next?</strong> You'll receive a confirmation email with:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Your policy documents</li>
              <li>• Payment instructions</li>
              <li>• Coverage details</li>
              <li>• Customer support contact info</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = '/customer-portal'}
              className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <button
          onClick={() => window.location.href = '/customer-portal/quote'}
          className="text-primary-600 hover:text-primary-700 flex items-center gap-1 mb-4 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Quote Request
        </button>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Compare Quotes</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Here are the best quotes from our partners. Choose the one that works for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className={`rounded-lg border-2 transition-all ${
              selectedQuoteId === quote.id
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-950'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-400'
            }`}
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {quote.carrierName}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(Math.floor(quote.rating))].map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {quote.rating} Rating • {quote.turnaroundDays} day turnaround
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white dark:bg-neutral-700 rounded-lg p-4 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Monthly Premium</p>
                <p className="text-4xl font-bold text-primary-600">${quote.premium}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Annual: ${quote.premium * 12}</p>
              </div>

              {/* Coverage Summary */}
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white">What's Included</h3>
                <div className="space-y-2">
                  {[
                    'Comprehensive coverage',
                    'No deductible surprise',
                    '24/7 customer support',
                    'Online account access',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-neutral-200 dark:border-neutral-600 pt-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                  Premium is based on your coverage selection and may vary
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Details
                  </button>
                  <button
                    onClick={handleAcceptQuote}
                    disabled={selectedQuoteId !== quote.id}
                    className={`flex-1 px-3 py-2 text-sm rounded font-medium transition-colors ${
                      selectedQuoteId === quote.id
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedQuoteId === quote.id ? 'Accept' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="p-6 space-y-4">
          <h2 className="font-semibold text-neutral-900 dark:text-white">Detailed Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-neutral-200 dark:border-neutral-700">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-300">Feature</th>
                  {quotes.map((q) => (
                    <th key={q.id} className="text-center py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-300">
                      {q.carrierName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                <tr>
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300">Monthly Cost</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3 font-semibold text-neutral-900 dark:text-white">
                      ${q.premium}
                    </td>
                  ))}
                </tr>
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300">Annual Cost</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3 font-semibold text-neutral-900 dark:text-white">
                      ${q.premium * 12}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300">Processing Time</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3 text-neutral-900 dark:text-white">
                      {q.turnaroundDays} days
                    </td>
                  ))}
                </tr>
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300">Customer Rating</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3">
                      <div className="flex justify-center gap-1">
                        {[...Array(Math.floor(q.rating))].map((_, i) => (
                          <span key={i} className="text-amber-400 text-sm">★</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

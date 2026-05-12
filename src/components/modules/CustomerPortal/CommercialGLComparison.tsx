import React from 'react';
import { Check, ChevronLeft, TrendingDown, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Quote {
  id: string;
  carrierName: string;
  premium: number;
  annualPremium: number;
  glLimit: string;
  turnaroundDays: number;
  rating: number;
  riskScore: number;
}

interface CommercialGLComparisonProps {
  quotes: Quote[];
  selectedQuoteId: string;
  businessInfo: any;
  coverageSelection: any;
}

type SubmissionStep = 'comparison' | 'submitted' | 'review' | 'approved';

export default function CommercialGLComparison({
  quotes,
  selectedQuoteId,
  businessInfo,
  coverageSelection,
}: CommercialGLComparisonProps) {
  const [step, setStep] = React.useState<SubmissionStep>('comparison');
  const [submissionStatus, setSubmissionStatus] = React.useState('submitted');
  const selectedQuote = quotes.find((q) => q.id === selectedQuoteId);

  const handleSubmit = () => {
    setStep('submitted');
    // Simulate status progression
    setTimeout(() => setSubmissionStatus('review'), 2000);
    setTimeout(() => setSubmissionStatus('docs'), 5000);
  };

  if (step === 'submitted') {
    return <CommercialGLTracking businessInfo={businessInfo} selectedQuote={selectedQuote} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <button
          onClick={() => window.location.href = '/customer-portal'}
          className="text-primary-600 hover:text-primary-700 flex items-center gap-1 mb-4 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          Commercial GL Quotes
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          For: <span className="font-semibold">{businessInfo.companyName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className={`rounded-lg border-2 transition-all ${
              selectedQuoteId === quote.id
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-950 ring-2 ring-primary-600 ring-opacity-50'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-400'
            }`}
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {quote.carrierName}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1">
                    {[...Array(Math.floor(quote.rating))].map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {quote.rating} Rating
                  </span>
                </div>
              </div>

              {/* Risk Score */}
              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Risk Score</p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {quote.riskScore}
                  </p>
                </div>
                <div className="w-full bg-neutral-300 dark:bg-neutral-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-amber-500 h-2 rounded-full transition-all"
                    style={{ width: `${quote.riskScore}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                  {quote.riskScore < 50 ? 'Low Risk' : quote.riskScore < 70 ? 'Moderate Risk' : 'Higher Risk'}
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Monthly Premium</p>
                  <p className="text-3xl font-bold text-primary-600">${quote.premium}</p>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Annual: ${quote.annualPremium.toLocaleString()}
                </p>
              </div>

              {/* Coverage Summary */}
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Coverage Includes</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      ${quote.glLimit === '1m' ? '1M' : quote.glLimit === '2m' ? '2M' : '3M'} GL Aggregate
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">Property Coverage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {quote.turnaroundDays}-day underwriting turnaround
                    </span>
                  </div>
                  {coverageSelection.cyberLiability && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300">Cyber Liability</span>
                    </div>
                  )}
                  {coverageSelection.workersComp && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300">Workers' Compensation</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSubmit}
                disabled={selectedQuoteId !== quote.id}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedQuoteId === quote.id
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
              >
                {selectedQuoteId === quote.id ? 'Accept & Submit' : 'Select'}
              </button>
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
                  <th className="text-left py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-300">
                    Carrier
                  </th>
                  {quotes.map((q) => (
                    <th key={q.id} className="text-center py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-300">
                      {q.carrierName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                <tr>
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300 font-medium">Monthly</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3 font-bold text-primary-600">
                      ${q.premium}
                    </td>
                  ))}
                </tr>
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300 font-medium">Annual</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3 font-bold text-neutral-900 dark:text-white">
                      ${q.annualPremium.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300 font-medium">Rating</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(Math.floor(q.rating))].map((_, i) => (
                          <span key={i} className="text-amber-400 text-sm">★</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300 font-medium">Risk Score</td>
                  {quotes.map((q) => (
                    <td key={q.id} className="text-center py-3 px-3">
                      <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        q.riskScore < 50
                          ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
                          : q.riskScore < 70
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                      }`}>
                        {q.riskScore}
                      </span>
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

function CommercialGLTracking({ businessInfo, selectedQuote }: any) {
  const [status, setStatus] = React.useState('submitted');

  React.useEffect(() => {
    setTimeout(() => setStatus('review'), 2000);
    setTimeout(() => setStatus('docs'), 5000);
  }, []);

  const getStatusIcon = (st: string) => {
    if (st === 'submitted') return <Clock className="w-5 h-5 text-blue-600" />;
    if (st === 'review') return <Clock className="w-5 h-5 text-amber-600" />;
    if (st === 'docs') return <AlertCircle className="w-5 h-5 text-purple-600" />;
    return <CheckCircle className="w-5 h-5 text-green-600" />;
  };

  const getStatusLabel = (st: string) => {
    if (st === 'submitted') return 'Submitted';
    if (st === 'review') return 'Under Review';
    if (st === 'docs') return 'Additional Docs Required';
    return 'Approved';
  };

  const statusSteps = ['submitted', 'review', 'docs', 'approved'];
  const currentIndex = statusSteps.indexOf(status);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
        Submission Tracking
      </h1>

      {/* Quote Details */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <h2 className="font-semibold text-neutral-900 dark:text-white mb-4">Quote Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Company</p>
            <p className="font-semibold text-neutral-900 dark:text-white">{businessInfo.companyName}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Carrier</p>
            <p className="font-semibold text-neutral-900 dark:text-white">{selectedQuote?.carrierName}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Monthly Premium</p>
            <p className="font-semibold text-primary-600 text-lg">${selectedQuote?.premium}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Quote ID</p>
            <p className="font-mono text-sm text-neutral-900 dark:text-white">QT-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <h2 className="font-semibold text-neutral-900 dark:text-white mb-6">Submission Status</h2>

        <div className="space-y-4">
          {statusSteps.map((s, idx) => (
            <div key={s}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full flex-shrink-0 ${
                  currentIndex >= idx
                    ? 'bg-primary-100 dark:bg-primary-900'
                    : 'bg-neutral-100 dark:bg-neutral-700'
                }`}>
                  {currentIndex > idx ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    getStatusIcon(s)
                  )}
                </div>

                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    currentIndex >= idx
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {getStatusLabel(s)}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {s === 'submitted' && 'Your quote has been submitted to the underwriting team'}
                    {s === 'review' && 'Underwriters are reviewing your application and risk profile'}
                    {s === 'docs' && 'Additional documentation may be needed for final approval'}
                    {s === 'approved' && 'Your quote has been approved! Ready to bind.'}
                  </p>
                  {currentIndex > idx && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">✓ Complete</p>
                  )}
                  {currentIndex === idx && (
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-2">
                      ⏱ In Progress...
                    </p>
                  )}
                </div>
              </div>
              {idx < statusSteps.length - 1 && (
                <div className={`ml-6 w-1 h-8 ${
                  currentIndex > idx
                    ? 'bg-green-300 dark:bg-green-700'
                    : 'bg-neutral-200 dark:bg-neutral-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">What Happens Next</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>✓ You'll receive updates via email as your application progresses</li>
          <li>✓ Underwriting typically completes within {selectedQuote?.turnaroundDays || 5} business days</li>
          <li>✓ If additional documents are needed, we'll contact you with a simple checklist</li>
          <li>✓ Once approved, your policy can be bound immediately</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => window.location.href = '/customer-portal'}
          className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors"
        >
          Back to Dashboard
        </button>
        <button className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}

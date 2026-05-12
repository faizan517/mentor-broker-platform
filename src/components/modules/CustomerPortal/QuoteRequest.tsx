import React from 'react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';

export default function QuoteRequest() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const customers = useDataStore((state) => state.customers);
  const addLead = useDataStore((state) => state.addLead);
  const [productType, setProductType] = React.useState<'auto' | 'home' | 'commercial' | 'workers-comp' | 'medicare'>('auto');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const myCustomer = customers.find((c) => c.name === currentUser?.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (myCustomer) {
      addLead({
        id: `lead-${Date.now()}`,
        name: myCustomer.name,
        email: myCustomer.email,
        phone: myCustomer.phone,
        productType,
        status: 'new',
        createdAt: new Date().toISOString(),
        assignedProducerId: undefined,
        score: 85,
        source: 'Customer Portal',
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Request a Quote</h1>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
            Quote Request Received!
          </h2>
          <p className="text-green-700 dark:text-green-300">
            Thank you for your interest. One of our agents will contact you within 24 hours to
            discuss your coverage needs and provide personalized quotes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Request a Quote</h1>

      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={myCustomer?.name || ''}
              disabled
              className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={myCustomer?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={myCustomer?.phone || ''}
              disabled
              className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Type of Coverage Needed
            </label>
            <select
              value={productType}
              onChange={(e) =>
                setProductType(e.target.value as any)
              }
              className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
            >
              <option value="auto">Auto Insurance</option>
              <option value="home">Home Insurance</option>
              <option value="commercial">Commercial Insurance</option>
              <option value="workers-comp">Workers' Compensation</option>
              <option value="medicare">Medicare Supplement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Additional Information
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your coverage needs, current policies, or any specific questions you have..."
              rows={5}
              className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Next Steps:</strong> After you submit this request, our team will review your
              information and contact you with personalized quotes within 1 business day.
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold rounded-lg transition-colors"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}

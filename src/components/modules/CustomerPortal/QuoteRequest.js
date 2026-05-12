import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ChevronRight, Check, Car, Home, Building2, FileText, Shield } from 'lucide-react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';
import { useDexaStore } from '@stores/dexaStore';
import QuoteComparison from './QuoteComparison';
export default function QuoteRequest() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const customers = useDataStore((state) => state.customers);
    const quotes = useDataStore((state) => state.quotes);
    const updateQuote = useDataStore((state) => state.updateQuote);
    const setContext = useDexaStore((state) => state.setContext);
    const [step, setStep] = React.useState('product');
    const [productType, setProductType] = React.useState('auto');
    const [coverage, setCoverage] = React.useState('standard');
    const [notes, setNotes] = React.useState('');
    const [selectedQuoteId, setSelectedQuoteId] = React.useState(null);
    const [generatedQuotes, setGeneratedQuotes] = React.useState([]);
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
    const handleProductSelect = (product) => {
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
        return _jsx(QuoteComparison, { quotes: generatedQuotes, selectedQuoteId: selectedQuoteId, productType: productType });
    }
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Get a Quote" }), _jsx("p", { className: "text-neutral-600 dark:text-neutral-400 mt-2", children: "Get personalized insurance quotes in minutes" })] }), _jsx("div", { className: "flex gap-2", children: ['product', 'coverage', 'review', 'submitted'].map((s, idx) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${step === s
                                ? 'bg-primary-600 text-white'
                                : ['product', 'coverage', 'review'].indexOf(s) < ['product', 'coverage', 'review'].indexOf(step)
                                    ? 'bg-green-600 text-white'
                                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'}`, children: ['product', 'coverage', 'review'].indexOf(s) < ['product', 'coverage', 'review'].indexOf(step) ? (_jsx(Check, { className: "w-5 h-5" })) : (idx + 1) }), idx < 3 && _jsx("div", { className: "w-12 h-1 bg-neutral-200 dark:bg-neutral-700" })] }, s))) }), step === 'product' && (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white", children: "What coverage do you need?" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.entries(PRODUCT_INFO).map(([key, info]) => {
                            const Icon = info.icon;
                            return (_jsxs("button", { onClick: () => handleProductSelect(key), className: "p-6 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all text-left", children: [_jsx(Icon, { className: "w-8 h-8 text-primary-600 mb-3" }), _jsx("h3", { className: "font-semibold text-neutral-900 dark:text-white", children: info.label }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 mt-1", children: info.description })] }, key));
                        }) })] })), step === 'coverage' && (_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white", children: "Choose your coverage level" }), _jsx("div", { className: "space-y-3", children: ['basic', 'standard', 'premium'].map((level) => (_jsxs("label", { className: "flex items-center gap-4 p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer transition-colors", children: [_jsx("input", { type: "radio", name: "coverage", value: level, checked: coverage === level, onChange: (e) => setCoverage(e.target.value), className: "w-4 h-4" }), _jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "font-semibold text-neutral-900 dark:text-white capitalize", children: [level, " Coverage"] }), _jsxs("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: [level === 'basic' && 'Essential protection with competitive pricing', level === 'standard' && 'Balanced protection and affordability (Recommended)', level === 'premium' && 'Comprehensive coverage with maximum protection'] })] }), _jsxs("span", { className: "font-semibold text-primary-600", children: [level === 'basic' && '$49/mo', level === 'standard' && '$79/mo', level === 'premium' && '$129/mo'] })] }, level))) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Tell us more (optional)" }), _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Any specific needs or questions about your coverage?", rows: 4, className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setStep('product'), className: "flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors", children: "Back" }), _jsxs("button", { onClick: handleCoverageNext, className: "flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2", children: ["Next ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] })), step === 'review' && (_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white", children: "Review your request" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Name" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: myCustomer?.name })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Email" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: myCustomer?.email })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Coverage Type" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white capitalize", children: PRODUCT_INFO[productType].label })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Coverage Level" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white capitalize", children: coverage })] })] }), notes && (_jsxs("div", { className: "p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg", children: [_jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 mb-1", children: "Notes" }), _jsx("p", { className: "text-neutral-900 dark:text-white", children: notes })] }))] }), _jsx("div", { className: "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-blue-800 dark:text-blue-200", children: [_jsx("strong", { children: "What happens next:" }), " We'll generate personalized quotes from our top carriers. You'll see pricing and coverage options instantly."] }) }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setStep('coverage'), className: "flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors", children: "Back" }), _jsx("button", { onClick: handleGenerateQuotes, className: "flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors", children: "Get Quotes" })] })] })), step === 'submitted' && !selectedQuoteId && (_jsxs("div", { className: "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center", children: [_jsx("div", { className: "text-5xl mb-4", children: "\uD83C\uDF89" }), _jsx("h2", { className: "text-2xl font-bold text-green-800 dark:text-green-200 mb-2", children: "Quotes Ready!" }), _jsx("p", { className: "text-green-700 dark:text-green-300 mb-4", children: "We found quotes from multiple carriers. Compare pricing and coverage below." }), _jsx("div", { className: "space-y-3 mt-6", children: generatedQuotes.map((quote) => (_jsx("button", { onClick: () => setSelectedQuoteId(quote.id), className: "w-full p-4 border-2 border-green-200 dark:border-green-800 hover:border-primary-500 dark:hover:border-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors text-left", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: quote.carrierName }), _jsxs("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: ["\u2B50 ", quote.rating, " \u2022 ", quote.turnaroundDays, " day turnaround"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-2xl font-bold text-primary-600", children: ["$", quote.premium] }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "/month" })] })] }) }, quote.id))) })] }))] }));
}

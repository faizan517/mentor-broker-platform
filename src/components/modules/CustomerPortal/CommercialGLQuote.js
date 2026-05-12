import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { useAuthStore } from '@stores/authStore';
import { useDataStore } from '@stores/dataStore';
import { useDexaStore } from '@stores/dexaStore';
import CommercialGLComparison from './CommercialGLComparison';
export default function CommercialGLQuote() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const customers = useDataStore((state) => state.customers);
    const setContext = useDexaStore((state) => state.setContext);
    const [step, setStep] = React.useState('business');
    const [generatedQuotes, setGeneratedQuotes] = React.useState([]);
    const [selectedQuoteId, setSelectedQuoteId] = React.useState(null);
    const [business, setBusiness] = React.useState({
        companyName: '',
        industry: 'construction',
        employees: 10,
        annualRevenue: '500k-1m',
        yearsInBusiness: 5,
        existingCoverage: 'none',
    });
    const [coverage, setCoverage] = React.useState({
        glLimit: '2m',
        propertyLimit: '1m',
        cyberLiability: false,
        workersComp: false,
    });
    const [risk, setRisk] = React.useState({
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
        const glBase = basePrice[coverage.glLimit] || 1200;
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
        return (_jsx(CommercialGLComparison, { quotes: generatedQuotes, selectedQuoteId: selectedQuoteId, businessInfo: business, coverageSelection: coverage }));
    }
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Commercial General Liability Quote" }), _jsx("p", { className: "text-neutral-600 dark:text-neutral-400 mt-2", children: "Get the right coverage for your business" })] }), _jsx("div", { className: "flex gap-2 overflow-x-auto", children: ['business', 'coverage', 'risk', 'review', 'submitted'].map((s, idx) => (_jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${step === s
                                ? 'bg-primary-600 text-white'
                                : ['business', 'coverage', 'risk', 'review'].indexOf(s) < ['business', 'coverage', 'risk', 'review'].indexOf(step)
                                    ? 'bg-green-600 text-white'
                                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'}`, children: ['business', 'coverage', 'risk', 'review'].indexOf(s) < ['business', 'coverage', 'risk', 'review'].indexOf(step) ? (_jsx(Check, { className: "w-5 h-5" })) : (idx + 1) }), idx < 4 && _jsx("div", { className: "w-8 h-1 bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" })] }, s))) }), step === 'business' && (_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white", children: "Tell us about your business" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Company Name *" }), _jsx("input", { type: "text", value: business.companyName, onChange: (e) => setBusiness({ ...business, companyName: e.target.value }), placeholder: "Enter your company name", className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Industry *" }), _jsx("select", { value: business.industry, onChange: (e) => setBusiness({ ...business, industry: e.target.value }), className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: INDUSTRIES.map((ind) => (_jsx("option", { value: ind.toLowerCase(), children: ind }, ind))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Number of Employees *" }), _jsx("input", { type: "number", value: business.employees, onChange: (e) => setBusiness({ ...business, employees: parseInt(e.target.value) }), min: "1", className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Years in Business *" }), _jsx("input", { type: "number", value: business.yearsInBusiness, onChange: (e) => setBusiness({ ...business, yearsInBusiness: parseInt(e.target.value) }), min: "1", className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Annual Revenue *" }), _jsxs("select", { value: business.annualRevenue, onChange: (e) => setBusiness({ ...business, annualRevenue: e.target.value }), className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: [_jsx("option", { value: "0-250k", children: "$0 - $250K" }), _jsx("option", { value: "250k-500k", children: "$250K - $500K" }), _jsx("option", { value: "500k-1m", children: "$500K - $1M" }), _jsx("option", { value: "1m-5m", children: "$1M - $5M" }), _jsx("option", { value: "5m+", children: "$5M+" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Existing Coverage" }), _jsxs("select", { value: business.existingCoverage, onChange: (e) => setBusiness({ ...business, existingCoverage: e.target.value }), className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: [_jsx("option", { value: "none", children: "No existing coverage" }), _jsx("option", { value: "expired", children: "Expired coverage" }), _jsx("option", { value: "limited", children: "Limited coverage" }), _jsx("option", { value: "adequate", children: "Adequate coverage" })] })] })] }), _jsxs("button", { onClick: handleBusinessNext, disabled: !business.companyName.trim(), className: "w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2", children: ["Next ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] })), step === 'coverage' && (_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white", children: "Select your coverage" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3", children: "General Liability Limit *" }), _jsx("div", { className: "space-y-2", children: ['1m', '2m', '3m'].map((limit) => (_jsxs("label", { className: "flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer", children: [_jsx("input", { type: "radio", name: "glLimit", value: limit, checked: coverage.glLimit === limit, onChange: (e) => setCoverage({ ...coverage, glLimit: e.target.value }) }), _jsxs("span", { className: "text-neutral-900 dark:text-white font-medium", children: ["$", limit === '1m' ? '1M' : limit === '2m' ? '2M' : '3M', " Aggregate"] })] }, limit))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3", children: "Property Coverage Limit *" }), _jsx("div", { className: "space-y-2", children: ['500k', '1m', '2m'].map((limit) => (_jsxs("label", { className: "flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer", children: [_jsx("input", { type: "radio", name: "propertyLimit", value: limit, checked: coverage.propertyLimit === limit, onChange: (e) => setCoverage({ ...coverage, propertyLimit: e.target.value }) }), _jsxs("span", { className: "text-neutral-900 dark:text-white font-medium", children: ["$", limit === '500k' ? '500K' : limit === '1m' ? '1M' : '2M'] })] }, limit))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: coverage.cyberLiability, onChange: (e) => setCoverage({ ...coverage, cyberLiability: e.target.checked }) }), _jsxs("div", { children: [_jsx("p", { className: "text-neutral-900 dark:text-white font-medium", children: "Add Cyber Liability" }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Data breach & ransomware protection" })] })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: coverage.workersComp, onChange: (e) => setCoverage({ ...coverage, workersComp: e.target.checked }) }), _jsxs("div", { children: [_jsx("p", { className: "text-neutral-900 dark:text-white font-medium", children: "Add Workers' Compensation" }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Employee injury & illness coverage" })] })] })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setStep('business'), className: "flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors", children: "Back" }), _jsxs("button", { onClick: handleCoverageNext, className: "flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2", children: ["Next ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] })), step === 'risk' && (_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white", children: "Risk assessment" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3", children: "Claims History *" }), _jsxs("select", { value: risk.claimsHistory, onChange: (e) => setRisk({ ...risk, claimsHistory: e.target.value }), className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: [_jsx("option", { value: "none", children: "No claims in past 3 years" }), _jsx("option", { value: "minor", children: "1-2 minor claims" }), _jsx("option", { value: "moderate", children: "3+ claims or 1 major claim" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: risk.highRiskOps, onChange: (e) => setRisk({ ...risk, highRiskOps: e.target.checked }) }), _jsxs("div", { children: [_jsx("p", { className: "text-neutral-900 dark:text-white font-medium", children: "High-Risk Operations" }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Hazardous work, heights, or heavy machinery" })] })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: risk.safetyProgram, onChange: (e) => setRisk({ ...risk, safetyProgram: e.target.checked }) }), _jsxs("div", { children: [_jsx("p", { className: "text-neutral-900 dark:text-white font-medium", children: "Active Safety Program" }), _jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "OSHA training, safety manager, incident tracking" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3", children: "Compliance Certifications" }), _jsxs("select", { value: risk.complianceCertifications, onChange: (e) => setRisk({ ...risk, complianceCertifications: e.target.value }), className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: [_jsx("option", { value: "none", children: "None" }), _jsx("option", { value: "iso", children: "ISO certified" }), _jsx("option", { value: "osha", children: "OSHA certified" }), _jsx("option", { value: "multiple", children: "Multiple certifications" })] })] })] }), _jsx("div", { className: "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-blue-800 dark:text-blue-200", children: [_jsx("strong", { children: "\uD83D\uDCA1 Risk Score Impact:" }), " Your answers help underwriters assess your risk profile and determine the best premium for your business."] }) }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setStep('coverage'), className: "flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors", children: "Back" }), _jsxs("button", { onClick: handleRiskNext, className: "flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2", children: ["Next ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] })), step === 'review' && (_jsxs("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white", children: "Review your information" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Company" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: business.companyName })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Industry" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white capitalize", children: business.industry })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Employees" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: business.employees })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: "Years in Business" }), _jsx("p", { className: "font-semibold text-neutral-900 dark:text-white", children: business.yearsInBusiness })] })] }), _jsxs("div", { className: "border-t border-neutral-200 dark:border-neutral-700 pt-4", children: [_jsx("p", { className: "text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2", children: "Coverage Selected" }), _jsxs("div", { className: "space-y-1 text-sm text-neutral-900 dark:text-white", children: [_jsxs("p", { children: ["\u2713 GL Limit: $", coverage.glLimit === '1m' ? '1M' : coverage.glLimit === '2m' ? '2M' : '3M'] }), _jsxs("p", { children: ["\u2713 Property: $", coverage.propertyLimit === '500k' ? '500K' : coverage.propertyLimit === '1m' ? '1M' : '2M'] }), coverage.cyberLiability && _jsx("p", { children: "\u2713 Cyber Liability" }), coverage.workersComp && _jsx("p", { children: "\u2713 Workers' Compensation" })] })] })] }), _jsx("div", { className: "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-green-800 dark:text-green-200", children: [_jsx("strong", { children: "Ready to compare quotes?" }), " We'll get you competitive bids from top commercial carriers within minutes."] }) }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setStep('risk'), className: "flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium transition-colors", children: "Back" }), _jsx("button", { onClick: handleGenerateQuotes, className: "flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors", children: "Get Commercial Quotes" })] })] }))] }));
}

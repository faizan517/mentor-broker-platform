import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useDataStore } from '@stores/dataStore';
import { useAuthStore } from '@stores/authStore';
export default function QuoteRequest() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const customers = useDataStore((state) => state.customers);
    const addLead = useDataStore((state) => state.addLead);
    const [productType, setProductType] = React.useState('auto');
    const [message, setMessage] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    const myCustomer = customers.find((c) => c.name === currentUser?.name);
    const handleSubmit = (e) => {
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
        return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Request a Quote" }), _jsxs("div", { className: "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center", children: [_jsx("div", { className: "text-4xl mb-4", children: "\u2713" }), _jsx("h2", { className: "text-2xl font-bold text-green-800 dark:text-green-200 mb-2", children: "Quote Request Received!" }), _jsx("p", { className: "text-green-700 dark:text-green-300", children: "Thank you for your interest. One of our agents will contact you within 24 hours to discuss your coverage needs and provide personalized quotes." })] })] }));
    }
    return (_jsxs("div", { className: "space-y-6 animate-fade-in max-w-2xl", children: [_jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Request a Quote" }), _jsx("div", { className: "bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Full Name" }), _jsx("input", { type: "text", value: myCustomer?.name || '', disabled: true, className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Email" }), _jsx("input", { type: "email", value: myCustomer?.email || '', disabled: true, className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Phone" }), _jsx("input", { type: "tel", value: myCustomer?.phone || '', disabled: true, className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white disabled:opacity-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Type of Coverage Needed" }), _jsxs("select", { value: productType, onChange: (e) => setProductType(e.target.value), className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white", children: [_jsx("option", { value: "auto", children: "Auto Insurance" }), _jsx("option", { value: "home", children: "Home Insurance" }), _jsx("option", { value: "commercial", children: "Commercial Insurance" }), _jsx("option", { value: "workers-comp", children: "Workers' Compensation" }), _jsx("option", { value: "medicare", children: "Medicare Supplement" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Additional Information" }), _jsx("textarea", { value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Tell us more about your coverage needs, current policies, or any specific questions you have...", rows: 5, className: "w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400" })] }), _jsx("div", { className: "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4", children: _jsxs("p", { className: "text-sm text-blue-800 dark:text-blue-200", children: [_jsx("strong", { children: "Next Steps:" }), " After you submit this request, our team will review your information and contact you with personalized quotes within 1 business day."] }) }), _jsx("button", { type: "submit", className: "w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold rounded-lg transition-colors", children: "Submit Quote Request" })] }) })] }));
}

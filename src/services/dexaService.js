const DEXA_RESPONSES = {
    dashboard: {
        default: {
            message: 'Welcome to your Mentor Broker Dashboard. I can help you manage customers, policies, claims, and renewals. What would you like to do today?',
            suggestedActions: [
                { label: 'View Leads', action: 'navigate:leads' },
                { label: 'New Quote', action: 'navigate:quotes' },
                { label: 'Claims Overview', action: 'navigate:claims' },
            ],
        },
    },
    leads: {
        'new': {
            message: 'Great! I\'ve identified a qualified lead. Based on their profile, they\'re an excellent fit for commercial general liability coverage. Would you like me to auto-qualify them?',
            suggestedActions: [
                { label: 'Auto-Qualify Lead', action: 'lead:qualify' },
                { label: 'View Details', action: 'lead:details' },
                { label: 'Schedule Callback', action: 'lead:schedule' },
            ],
        },
        'qualified': {
            message: 'This prospect is ready for a quote. I recommend starting with their primary coverage need (business type suggests GL is critical). Shall I prepare quote templates?',
            suggestedActions: [
                { label: 'Generate Quote', action: 'quote:generate' },
                { label: 'Email Prospect', action: 'lead:email' },
                { label: 'Add to Pipeline', action: 'lead:pipeline' },
            ],
        },
        'converted': {
            message: 'Excellent conversion! I\'ve updated their customer record. Now tracking their first policy lifecycle. Would you like to set up renewal reminders?',
            suggestedActions: [
                { label: 'View Customer Profile', action: 'customer:view' },
                { label: 'Set Renewal Date', action: 'renewal:schedule' },
            ],
        },
    },
    quotes: {
        'draft': {
            message: 'Quote in progress. I\'ve pulled current market rates from our top 3 carriers. The best price-to-coverage ratio is State Farm at $1,250/year. Ready to send?',
            suggestedActions: [
                { label: 'Send Quote', action: 'quote:send' },
                { label: 'Compare Rates', action: 'quote:compare' },
                { label: 'Add Coverage', action: 'quote:edit' },
            ],
        },
        'sent': {
            message: 'Quote delivered. Setting 30-day expiration window. I\'ll monitor for customer response and alert you on day 25 if no action taken.',
            suggestedActions: [
                { label: 'Resend Quote', action: 'quote:resend' },
                { label: 'Follow Up', action: 'quote:followup' },
                { label: 'View Details', action: 'quote:details' },
            ],
        },
        'accepted': {
            message: 'Quote accepted! Triggering policy issue workflow. I\'m pre-filling documents with customer data. ETA: 24 hours to active policy.',
            suggestedActions: [
                { label: 'Issue Policy', action: 'policy:issue' },
                { label: 'Send Confirmation', action: 'policy:confirm' },
            ],
        },
    },
    claims: {
        'reported': {
            message: 'New FNOL received. I\'ve validated policy coverage and assigned adjuster Robert Martinez. Initial reserve estimate: $35,000. Ready to proceed?',
            suggestedActions: [
                { label: 'Assign Adjuster', action: 'claim:assign' },
                { label: 'Request Documents', action: 'claim:docs' },
                { label: 'Schedule Inspection', action: 'claim:inspect' },
            ],
        },
        'investigating': {
            message: 'Investigation underway. We\'ve received damage photos and repair estimates. Recommended reserve increase to $42,500 based on supplemental damage found.',
            suggestedActions: [
                { label: 'Review Evidence', action: 'claim:evidence' },
                { label: 'Update Reserve', action: 'claim:reserve' },
                { label: 'Send Estimate', action: 'claim:estimate' },
            ],
        },
        'approved': {
            message: 'Claim approved for $40,000 payment. All documentation verified. Processing for wire transfer tomorrow morning.',
            suggestedActions: [
                { label: 'Process Payment', action: 'claim:pay' },
                { label: 'Send Notice', action: 'claim:notice' },
            ],
        },
        'paid': {
            message: 'Payment issued successfully. Customer confirmed receipt. Closing claim - all parties notified.',
            suggestedActions: [
                { label: 'Close Claim', action: 'claim:close' },
                { label: 'Archive', action: 'claim:archive' },
            ],
        },
    },
    renewals: {
        'pending': {
            message: 'Renewal coming in 45 days. This customer is a retention risk (churn score: 72%). I recommend 8% price concession + cross-sell home coverage to strengthen relationship.',
            suggestedActions: [
                { label: 'Generate Renewal Quote', action: 'renewal:quote' },
                { label: 'Offer Discount', action: 'renewal:discount' },
                { label: 'Cross-Sell', action: 'renewal:crosssell' },
            ],
        },
        'quoted': {
            message: 'Renewal quote sent. Current premium $1,500 → renewed at $1,380 (8% savings). Awaiting customer confirmation.',
            suggestedActions: [
                { label: 'Follow Up', action: 'renewal:followup' },
                { label: 'Send Reminder', action: 'renewal:remind' },
            ],
        },
    },
    commission: {
        'default': {
            message: 'Commission dashboard updated with latest earned commissions. YTD total: $47,500 across 156 policies. Top earner this month: Mike Johnson ($3,200).',
            suggestedActions: [
                { label: 'View Details', action: 'commission:details' },
                { label: 'Export Report', action: 'commission:export' },
                { label: 'Set Goals', action: 'commission:goals' },
            ],
        },
    },
    customers: {
        'default': {
            message: 'Customer management interface ready. You have 200 customers with 500 active policies. 15 renewals pending this month. Top customer by premium: Acme Corp ($8,500/year).',
            suggestedActions: [
                { label: 'Search Customers', action: 'customer:search' },
                { label: 'View Renewals', action: 'renewal:list' },
                { label: 'Generate Report', action: 'customer:report' },
            ],
        },
    },
    'commercial-gl': {
        'default': {
            message: 'Welcome to Commercial General Liability quotes. I\'ll help you find the best coverage for your business. Let\'s start with your company details.',
            suggestedActions: [
                { label: 'View Coverage Options', action: 'coverage:details' },
                { label: 'Risk Assessment Guide', action: 'risk:guide' },
            ],
        },
        'business-info': {
            message: 'Great! I\'ve noted your business details. For a construction business with 10 employees, I\'d recommend focusing on strong GL limits and property coverage. Let\'s select your coverage options.',
            suggestedActions: [
                { label: 'Recommend Coverage', action: 'coverage:recommend' },
                { label: 'View Limits', action: 'coverage:limits' },
            ],
        },
        'coverage': {
            message: 'Excellent coverage choices. With $2M GL and property coverage, plus cyber add-on, you\'ll have comprehensive protection. Now let\'s assess your risk profile.',
            suggestedActions: [
                { label: 'Risk Assessment', action: 'risk:start' },
                { label: 'Review Coverage', action: 'coverage:review' },
            ],
        },
        'risk': {
            message: 'Your claims history and safety program are strong factors. Based on your profile, you\'re looking at competitive rates. Ready to see quotes from top commercial carriers?',
            suggestedActions: [
                { label: 'Generate Quotes', action: 'quotes:generate' },
                { label: 'Modify Risk', action: 'risk:modify' },
            ],
        },
        'comparison': {
            message: 'You\'ve got quotes from Chubb, Liberty Mutual, Hartford, and Travelers. Based on your risk score, Chubb and Liberty offer the best value. Ready to submit?',
            suggestedActions: [
                { label: 'Submit Quote', action: 'quote:submit' },
                { label: 'Compare Details', action: 'quote:compare' },
            ],
        },
    },
    default: {
        default: {
            message: 'I\'m here to help with your insurance broker workflows. I can assist with leads, quotes, claims, renewals, commissions, and customer management. What do you need?',
            suggestedActions: [
                { label: 'Quick Stats', action: 'dashboard:stats' },
                { label: 'Pending Actions', action: 'dashboard:pending' },
            ],
        },
    },
};
export function generateDexaResponse(userMessage, context) {
    const contextMap = context?.split(':') || ['default'];
    const module = contextMap[0] || 'default';
    const action = contextMap[1] || 'default';
    const responses = DEXA_RESPONSES[module];
    if (!responses) {
        return DEXA_RESPONSES.default.default;
    }
    const response = responses[action] || responses.default;
    if (!response) {
        return DEXA_RESPONSES.default.default;
    }
    return response;
}
export function generateSuggestedActions(module, action) {
    const context = action ? `${module}:${action}` : module;
    const response = generateDexaResponse('', context);
    return response.suggestedActions;
}

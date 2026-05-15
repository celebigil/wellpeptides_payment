// Trust signal strip rendered automatically right below the hero on
// every landing. Same four pills that used to live in the footer —
// moving them to the top of the page maximises the psychological
// effect for cold Instagram traffic that may bounce before scrolling
// past the first viewport.
//
// Admin doesn't add this as a block; it's a fixed component so every
// landing gets the same baseline trust treatment.
export default function TrustStrip() {
    return (
        <div className="ep-trust-strip" aria-label="Trust signals">
            <span className="ep-trust-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                256-bit SSL
            </span>
            <span className="ep-trust-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l8 3v5c0 5-3.4 9.1-8 10-4.6-.9-8-5-8-10V6l8-3z"
                          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                PayPal Verified Merchant
            </span>
            <span className="ep-trust-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Third-Party Lab Tested
            </span>
            <span className="ep-trust-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                          stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Discreet Shipping
            </span>
        </div>
    );
}

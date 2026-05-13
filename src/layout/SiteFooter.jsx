// Stripped-down footer — trust signals only, no nav links. Anything
// that lets the visitor leave for another page hurts conversion.
export default function SiteFooter() {
    const year = new Date().getFullYear();
    return (
        <footer className="ep-site-footer">
            <div className="ep-site-footer__row">
                <div className="ep-site-footer__trust">
                    <span className="ep-trust-pill">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="11" width="18" height="11" rx="2"
                                  stroke="currentColor" strokeWidth="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor"
                                  strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        SSL encrypted
                    </span>
                    <span className="ep-trust-pill">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                            <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Third-party tested
                    </span>
                    <span className="ep-trust-pill">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                                  stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Discreet shipping
                    </span>
                </div>
                <div className="ep-site-footer__legal">
                    © {year} Well (+) Peptides · For research use only.
                </div>
            </div>
        </footer>
    );
}

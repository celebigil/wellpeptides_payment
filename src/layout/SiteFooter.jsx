// The landing is shown to cold Instagram traffic that has never seen
// the brand. The footer keeps just the trust strip + bottom copyright;
// the contact/legal grid and disclaimer were removed by request and
// live in git history if they need to come back.
const SUPPORT_EMAIL = "support@wellsociety.com";

export default function SiteFooter() {
    const year = new Date().getFullYear();
    return (
        <footer className="ep-site-footer">
            <div className="ep-site-footer__inner">

                {/* Trust strip — repeated near the footer because users
                    that scroll past CTA still see reassurance. */}
                <div className="ep-site-footer__trust">
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

                </div>

                <div className="ep-site-footer__bottom">
                    <span className="ep-site-footer__copyright">
                        © {year} Well Society. All rights reserved.
                    </span>
                    <span className="ep-site-footer__address">
                        Operated by Well Society · {SUPPORT_EMAIL}
                    </span>
                </div>
            </div>
        </footer>
    );
}

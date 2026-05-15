import logo from "../assets/logo-well-society.svg";

// The landing is shown to cold Instagram traffic that has never seen
// the brand. A real footer with contact + legal links + verified marks
// is the single highest-leverage trust signal we can show, so this one
// is intentionally heavier than the storefront's funnel-protecting
// minimal footer.

// Landing brand is Well Society — kept distinct from the storefront's
// `wellpeptides.com` so Instagram visitors never see two competing
// names. All buyer-facing strings and links point at wellsociety.com.
const STOREFRONT_ORIGIN = "https://wellsociety.com";
const SUPPORT_EMAIL = "support@wellsociety.com";

const DISCLAIMER =
    "";

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
                    <span className="ep-trust-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                                  stroke="currentColor" strokeWidth="1.5"/>
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        Discreet Shipping
                    </span>
                </div>

                <div className="ep-site-footer__grid">
                    <div className="ep-site-footer__brand">
                        <a href={STOREFRONT_ORIGIN} aria-label="Well Society home">
                            <img src={logo} alt="Well Society" className="ep-site-footer__logo" />
                        </a>
                        <p className="ep-site-footer__tagline">
                            Research-grade peptides, delivered with care since 2021.
                        </p>
                    </div>

                    <div className="ep-site-footer__col">
                        <h4 className="ep-site-footer__col-title">Support</h4>
                        <ul>
                            <li>
                                <a href={`${STOREFRONT_ORIGIN}/contact`} rel="noopener" target="_blank">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href={`${STOREFRONT_ORIGIN}/faq`} rel="noopener" target="_blank">
                                    Help &amp; FAQ
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                            </li>
                        </ul>
                    </div>

                    <div className="ep-site-footer__col">
                        <h4 className="ep-site-footer__col-title">Legal</h4>
                        <ul>
                            <li>
                                <a href={`${STOREFRONT_ORIGIN}/privacy-policy`} rel="noopener" target="_blank">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href={`${STOREFRONT_ORIGIN}/terms`} rel="noopener" target="_blank">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href={`${STOREFRONT_ORIGIN}/refund-policy`} rel="noopener" target="_blank">
                                    Refund Policy
                                </a>
                            </li>
                            <li>
                                <a href={`${STOREFRONT_ORIGIN}/shipping`} rel="noopener" target="_blank">
                                    Shipping &amp; Returns
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="ep-site-footer__col">
                        <h4 className="ep-site-footer__col-title">Payments</h4>
                        <p className="ep-site-footer__paypal">
                            <svg width="64" height="18" viewBox="0 0 100 28" aria-label="PayPal">
                                <text x="0" y="20" fontFamily="Arial, sans-serif"
                                      fontSize="20" fontWeight="700" fill="#003087">Pay</text>
                                <text x="40" y="20" fontFamily="Arial, sans-serif"
                                      fontSize="20" fontWeight="700" fill="#009cde">Pal</text>
                            </svg>
                            <span>Processed securely by PayPal.<br />We never see your card details.</span>
                        </p>
                    </div>
                </div>

                <p className="ep-site-footer__disclaimer">{DISCLAIMER}</p>

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

import logo from "../assets/logo-well-society.svg";

const DISCLAIMER =
    "Well Society products are research compounds intended for laboratory and research use only. Not intended for human or veterinary diagnosis or treatment.";

// Mirrors the storefront footer's gray surface and bottom-bar layout
// without the full 6-column nav grid — those links would compete with
// the funnel CTA. Disclaimer + brand identity + trust pills only.
export default function SiteFooter() {
    const year = new Date().getFullYear();
    return (
        <footer className="ep-site-footer">
            <div className="ep-site-footer__inner">
                <p className="ep-site-footer__disclaimer">{DISCLAIMER}</p>
                <div className="ep-site-footer__bottom">
                    <a href="https://wellsociety.com" aria-label="Well Society home">
                        <img src={logo} alt="Well Society" className="ep-site-footer__logo" />
                    </a>
                    <div className="ep-site-footer__badges">
                        <span className="ep-trust-pill">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="11" width="18" height="11" rx="2"
                                      stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M7 11V7a5 5 0 0110 0v4"
                                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            SSL Encrypted
                        </span>
                        <span className="ep-trust-pill">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M8 12l3 3 5-6"
                                      stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Third-Party Tested
                        </span>
                        <span className="ep-trust-pill">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                                      stroke="currentColor" strokeWidth="1.5"/>
                                <circle cx="12" cy="10" r="3"
                                        stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            Discreet Shipping
                        </span>
                    </div>
                    <span className="ep-site-footer__copyright">
                        © {year} Well Society
                    </span>
                </div>
            </div>
        </footer>
    );
}

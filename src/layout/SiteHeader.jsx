import logo from "../assets/logo-well_peptides.png";

// Deliberately minimal compared to the main storefront header — no nav,
// no cart, no auth. The whole point of this surface is to funnel to a
// single PayPal CTA, so removing every other affordance is the design.
export default function SiteHeader() {
    return (
        <header className="ep-site-header">
            <div className="ep-site-header__inner">
                <a href="https://wellpeptides.com" className="ep-site-header__brand">
                    <img src={logo} alt="Well (+) Peptides" className="ep-site-header__logo" />
                </a>
                <span className="ep-site-header__badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"
                              stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Secure checkout
                </span>
            </div>
        </header>
    );
}

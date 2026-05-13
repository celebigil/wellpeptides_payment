import logo from "../assets/logo-well_peptides.png";

// Visually mirrors the new_wel storefront header — same height, blurred
// translucent backdrop, same logo sizing. Intentionally strips the nav,
// cart, search and auth icons: on a payment funnel surface, every extra
// affordance is a reason for the visitor not to tap the CTA.
export default function SiteHeader() {
    return (
        <header className="ep-site-header">
            <div className="ep-site-header__inner">
                <a href="https://wellpeptides.com" className="ep-site-header__brand">
                    <img src={logo} alt="Well Peptides" className="ep-site-header__logo" />
                </a>
                <span className="ep-site-header__badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2"
                              stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Secure checkout
                </span>
            </div>
        </header>
    );
}

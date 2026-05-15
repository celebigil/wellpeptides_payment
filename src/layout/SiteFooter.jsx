// The landing's footer is intentionally minimal now: trust signals
// moved to a TrustStrip rendered right below the hero (highest-leverage
// position for cold IG traffic that may bounce before scrolling), and
// the contact/legal grid was removed by request. What stays here is
// just the copyright + operator line.
const SUPPORT_EMAIL = "support@wellsociety.com";

export default function SiteFooter() {
    const year = new Date().getFullYear();
    return (
        <footer className="ep-site-footer">
            <div className="ep-site-footer__inner">
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

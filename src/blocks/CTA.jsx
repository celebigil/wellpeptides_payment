import { trackCtaClick } from "../analytics.js";

export default function CTA({ data, page }) {
    const { label, url, style = "primary" } = data || {};
    // CTA-level URL wins; otherwise fall back to the page's PayPal URL.
    const href = url || page?.paypalUrl || "#";
    const cls = `ep-cta ep-cta--${style}`;
    return (
        <div className="ep-cta__wrap">
            <a
                className={cls}
                href={href}
                onClick={() => trackCtaClick({ label, href, slug: page?.slug, pageId: page?.id })}
            >
                <span className="ep-cta__label">{label || "Continue"}</span>
                <svg className="ep-cta__arrow" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7"
                          stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </a>
            <p className="ep-cta__reassurance">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2"
                          stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Secure checkout via PayPal
            </p>
        </div>
    );
}

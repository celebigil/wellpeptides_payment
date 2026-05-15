// Reusable CTA pill — used both as a standalone block (blocks/CTA.jsx)
// and embedded inside the hero (blocks/Hero.jsx). The href-building
// rules and analytics hook live here so both surfaces stay in sync.
import { trackCtaClick } from "../analytics.js";

function buildHref({ blockId, data, page }) {
    if (data?.amount) {
        const slug = page?.slug || "";
        const params = new URLSearchParams();
        if (blockId) params.set("cta", blockId);
        const qs = params.toString();
        const path = slug ? `/api/v1/pp/checkout/${slug}` : "/api/v1/pp/checkout";
        return qs ? `${path}?${qs}` : path;
    }
    return data?.url || page?.paypalUrl || "#";
}

function formatPrice(amount, currency) {
    if (amount == null || amount === "") return null;
    const value = typeof amount === "string" ? parseFloat(amount) : amount;
    if (Number.isNaN(value)) return null;
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
            minimumFractionDigits: 2,
        }).format(value);
    } catch {
        return `${value.toFixed(2)} ${currency || "USD"}`;
    }
}

// `variant` controls the surrounding palette:
//   - "light" (default): used on the cream/white page surface
//   - "dark": used inside the hero (button stays mavi but reassurance
//             line flips to a translucent white so it stays legible)
export default function CtaButton({ blockId, data, page, variant = "light" }) {
    const { label, style = "primary", amount, currency } = data || {};
    const href = buildHref({ blockId, data, page });
    const styleCls = `ep-cta ep-cta--${style}`;
    const variantCls = variant === "dark" ? "ep-cta-wrap--dark" : "";
    const priceText = formatPrice(amount, currency);
    return (
        <div className={`ep-cta__wrap ${variantCls}`}>
            <a
                className={styleCls}
                href={href}
                onClick={() => trackCtaClick({ label, href, slug: page?.slug, pageId: page?.id })}
            >
                <span className="ep-cta__label">
                    {label || "Continue"}
                    {priceText ? <span className="ep-cta__price"> · {priceText}</span> : null}
                </span>
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
                <span className="ep-cta__reassurance-text">
                    Secure PayPal Checkout
                    <span className="ep-cta__reassurance-dot" aria-hidden="true">·</span>
                    256-bit SSL
                    <span className="ep-cta__reassurance-dot" aria-hidden="true">·</span>
                    Buyer Protection Included
                </span>
            </p>
        </div>
    );
}

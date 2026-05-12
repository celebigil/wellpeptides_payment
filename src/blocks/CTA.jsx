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
                {label || "Continue"}
            </a>
        </div>
    );
}

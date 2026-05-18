// Self-contained "longevity" template — bespoke dark-hero landing with
// stars + glowing horizon + glowing blue CTA pill, followed by a cream
// card section. Doesn't go through the blocks renderer; pulls data
// from page.blocksJson.longevity instead so admins edit one keyed
// object in BO rather than juggling 4-5 separate blocks.
//
// PayPal CTA reuses the same href rules as CtaButton: amount + slug ->
// `/api/v1/pp/checkout/<slug>?cta=<blockId>`, else page.paypalUrl.
import { useMemo } from "react";
import { trackCtaClick } from "../analytics.js";

function buildHref({ blockId, amount, ctaUrl, page }) {
    if (amount) {
        const slug = page?.slug || "";
        const params = new URLSearchParams();
        if (blockId) params.set("cta", blockId);
        const qs = params.toString();
        const path = slug ? `/api/v1/pp/checkout/${slug}` : "/api/v1/pp/checkout";
        return qs ? `${path}?${qs}` : path;
    }
    return ctaUrl || page?.paypalUrl || "#";
}

function formatPrice(amount, currency) {
    if (amount == null || amount === "") return null;
    const value = typeof amount === "string" ? parseFloat(amount) : amount;
    if (Number.isNaN(value)) return null;
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return `$${Math.round(value)}`;
    }
}

// SVG library — every icon used by the landing in one place. Tracks the
// reference HTML 1:1 so the visual stays consistent if either file is
// updated later. Sizes/strokes are controlled by the wrapping element.
function I({ name }) {
    switch (name) {
        case "lock":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            );
        case "shield":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            );
        case "card":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
            );
        case "clock":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            );
        case "sparkle":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
                </svg>
            );
        case "target":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
            );
        case "chart":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            );
        case "user":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            );
        case "leaf":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
            );
        case "chat":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            );
        case "shield-check":
            // Reference uses the same shield silhouette for the "Important
            // notes" card-header icon AND for the "informational purposes"
            // row — they're the same SVG. We expose it under both names so
            // BO content authoring stays explicit.
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            );
        case "clipboard":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                </svg>
            );
        case "globe":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            );
        case "age":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            );
        default:
            return null;
    }
}

// Twinkling stars — generated once on mount and memoised so React
// doesn't reshuffle the field on re-render. 90 stars matches the
// reference; a handful are deliberately rendered 2.5px wide for depth.
function Stars() {
    const stars = useMemo(() => {
        const out = [];
        for (let i = 0; i < 90; i++) {
            const big = Math.random() > 0.85;
            const size = big ? 2.5 : 1.5;
            out.push({
                top: Math.random() * 85,
                left: Math.random() * 100,
                d: 3 + Math.random() * 5,
                delay: Math.random() * 6,
                op: 0.3 + Math.random() * 0.6,
                size,
            });
        }
        return out;
    }, []);
    return (
        <div className="lv-stars" aria-hidden="true">
            {stars.map((s, i) => (
                <span
                    key={i}
                    className="lv-star"
                    style={{
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        "--lv-d": `${s.d}s`,
                        "--lv-delay": `${s.delay}s`,
                        "--lv-op": s.op,
                    }}
                />
            ))}
        </div>
    );
}

function FeatureList({ heading, headingIcon, items }) {
    return (
        <section className="lv-card" aria-label={heading}>
            <header className="lv-card__header">
                <span className="lv-card__icon" aria-hidden="true">
                    <I name={headingIcon || "sparkle"} />
                </span>
                <h2 className="lv-card__heading">{heading}</h2>
            </header>
            <ul className="lv-card__list">
                {items.map((it, i) => (
                    <li key={i} className="lv-card__row">
                        <span className="lv-card__row-icon" aria-hidden="true">
                            <I name={it.icon} />
                        </span>
                        <span className="lv-card__row-text">{it.text}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function LongevityLanding({ page }) {
    const cfg = page?.blocksJson?.longevity || {};
    const eyebrow = cfg.eyebrow || "Longevity Assessment";
    const headlineTop = cfg.headline_top || "Miami's First";
    const headlineBottom = cfg.headline_bottom || "Social Longevity Center";
    const subheadline = cfg.subheadline ||
        "A comprehensive, science-driven assessment that uncovers your biological age and informs a personalized longevity program designed for you.";
    const amount = cfg.amount;
    const currency = cfg.currency || "USD";
    const ctaLabel = cfg.cta_label || "Complete Secure Payment";
    const ctaUrl = cfg.cta_url;
    const blockId = cfg.block_id || "longevity_cta";

    const priceText = formatPrice(amount, currency);
    const href = buildHref({ blockId, amount, ctaUrl, page });

    const includes = cfg.includes || [
        { icon: "target", text: "Comprehensive biomarker & health analysis" },
        { icon: "chart", text: "Biological age calculation & risk insights" },
        { icon: "user", text: "Personalized longevity program roadmap" },
        { icon: "leaf", text: "Lifestyle, nutrition & recovery recommendations" },
        { icon: "chat", text: "Expert review & results consultation" },
    ];
    const notes = cfg.notes || [
        { icon: "shield-check", text: "This assessment is for informational purposes and not a substitute for medical advice." },
        { icon: "clipboard", text: "A licensed clinician will review your results." },
        { icon: "lock", text: "Your data is encrypted and never shared without your consent." },
        { icon: "globe", text: "Services are provided in compliance with applicable laws and regulations." },
        { icon: "age", text: "You must be 18 years or older to purchase." },
    ];

    return (
        <div className="lv-shell">
            {/* Fixed rounded-pill nav, floats over the hero */}
            <nav className="lv-nav" aria-label="Site">
                <a href="https://wellsociety.com" className="lv-nav__brand">
                    <span className="lv-nav__brand-text">Well Society</span>
                </a>
                <span className="lv-nav__badge">
                    <I name="lock" />
                    <span>Secure checkout</span>
                </span>
            </nav>

            {/* Hero — stars + horizon glow + content */}
            <section className="lv-hero">
                <Stars />
                <div className="lv-hero__horizon" aria-hidden="true" />

                <div className="lv-hero__content">
                    <p className="lv-hero__eyebrow">{eyebrow}</p>
                    <h1 className="lv-hero__title">
                        <span>{headlineTop}</span>
                        <span>{headlineBottom}</span>
                    </h1>
                    <p className="lv-hero__subtitle">{subheadline}</p>

                    <a
                        className="lv-cta"
                        href={href}
                        onClick={() => trackCtaClick({
                            label: ctaLabel, href, slug: page?.slug, pageId: page?.id,
                        })}
                    >
                        <span className="lv-cta__icon" aria-hidden="true"><I name="lock" /></span>
                        <span className="lv-cta__label">
                            {ctaLabel}
                            {priceText ? <span className="lv-cta__price"> — {priceText}</span> : null}
                        </span>
                    </a>

                    <ul className="lv-trust" aria-label="Trust signals">
                        <li><I name="shield" /><span>256-bit SSL</span></li>
                        <li className="lv-trust__dot" aria-hidden="true" />
                        <li><I name="card" /><span>PayPal Buyer Protection</span></li>
                        <li className="lv-trust__dot" aria-hidden="true" />
                        <li><I name="clock" /><span>No hidden fees</span></li>
                    </ul>
                </div>
            </section>

            <section className="lv-cards">
                <div className="lv-cards__grid">
                    <FeatureList
                        heading={cfg.includes_heading || "Your assessment includes"}
                        headingIcon="sparkle"
                        items={includes}
                    />
                    <FeatureList
                        heading={cfg.notes_heading || "Important notes"}
                        headingIcon="shield"
                        items={notes}
                    />
                </div>
            </section>
        </div>
    );
}

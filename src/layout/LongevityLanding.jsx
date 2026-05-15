// Self-contained "longevity" template — full bespoke layout matching the
// Miami Social Longevity Center mock. Doesn't go through the blocks
// renderer; pulls data from page.blocksJson.longevity instead so admins
// edit one keyed object in BO rather than juggling 4-5 separate blocks.
//
// PayPal CTA reuses the same href rules as CtaButton: amount + slug ->
// `/api/v1/pp/checkout/<slug>?cta=<blockId>`, else page.paypalUrl.
import logo from "../assets/logo-well-society.svg";
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

function I({ name }) {
    const s = "currentColor";
    switch (name) {
        case "lock":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="11" width="16" height="10" rx="2" stroke={s} strokeWidth="1.7"/>
                    <path d="M8 11V7a4 4 0 018 0v4" stroke={s} strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
            );
        case "shield":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l8 3v5c0 5-3.4 9.1-8 10-4.6-.9-8-5-8-10V6l8-3z"
                          stroke={s} strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
            );
        case "shield-check":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l8 3v5c0 5-3.4 9.1-8 10-4.6-.9-8-5-8-10V6l8-3z"
                          stroke={s} strokeWidth="1.6" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke={s} strokeWidth="1.6"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "paypal":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 20l1.3-8.2h3.4c2.7 0 4.5-1.3 4.9-3.8.4-2.4-1-3.8-3.7-3.8H8.2L6 20h1z"
                          stroke={s} strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M9 16l1-6.4h2.9c1.6 0 2.5-.8 2.7-2.2"
                          stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "check-circle":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke={s} strokeWidth="1.6"/>
                    <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke={s} strokeWidth="1.6"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "sparkle":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"
                          stroke={s} strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
            );
        case "target":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke={s} strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="5" stroke={s} strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="1.5" fill={s}/>
                </svg>
            );
        case "chart":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 20h16M7 20V10M12 20V4M17 20v-7"
                          stroke={s} strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
            );
        case "user":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" stroke={s} strokeWidth="1.6"/>
                    <path d="M4.5 20a7.5 7.5 0 0115 0" stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            );
        case "leaf":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 19c5 2 13-2 14-13C8 4 4 12 5 19zM5 19l8-8"
                          stroke={s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "chat":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 6h14v10H9l-4 4V6z" stroke={s} strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
            );
        case "clipboard":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="6" y="5" width="12" height="16" rx="2" stroke={s} strokeWidth="1.6"/>
                    <rect x="9" y="3" width="6" height="4" rx="1" stroke={s} strokeWidth="1.6"/>
                    <path d="M9 12h6M9 16h4" stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            );
        case "globe":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke={s} strokeWidth="1.6"/>
                    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
                          stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            );
        case "age":
            return (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke={s} strokeWidth="1.6"/>
                    <path d="M8 14c.7-1.5 2.1-2.5 4-2.5s3.3 1 4 2.5"
                          stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="9.5" cy="9.5" r="1" fill={s}/>
                    <circle cx="14.5" cy="9.5" r="1" fill={s}/>
                </svg>
            );
        default:
            return null;
    }
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
    const headlineTop = cfg.headlineTop || "Miami's First";
    const headlineBottom = cfg.headlineBottom || "Social Longevity Center";
    const subheadline = cfg.subheadline ||
        "A comprehensive, science-driven assessment that uncovers your biological age and informs a personalized longevity program designed for you.";
    const amount = cfg.amount;
    const currency = cfg.currency || "USD";
    const ctaLabel = cfg.ctaLabel || "Complete Secure Payment";
    const ctaUrl = cfg.ctaUrl;
    const blockId = cfg.blockId || "longevity_cta";

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
            {/* Hero: dark navy with horizon glow + rounded outline header */}
            <section className="lv-hero">
                <div className="lv-hero__glow" aria-hidden="true" />
                <div className="lv-hero__horizon" aria-hidden="true" />

                <header className="lv-nav">
                    <a href="https://wellsociety.com" className="lv-nav__brand" aria-label="Well Society">
                        <img src={logo} alt="Well Society" className="lv-nav__logo" />
                    </a>
                    <span className="lv-nav__badge">
                        <I name="lock" />
                        <span>Secure checkout</span>
                    </span>
                </header>

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
                        <li className="lv-trust__dot" aria-hidden="true">•</li>
                        <li><I name="paypal" /><span>PayPal Buyer Protection</span></li>
                        <li className="lv-trust__dot" aria-hidden="true">•</li>
                        <li><I name="check-circle" /><span>No hidden fees</span></li>
                    </ul>
                </div>
            </section>

            <section className="lv-cards">
                <div className="lv-cards__grid">
                    <FeatureList
                        heading={cfg.includesHeading || "Your assessment includes"}
                        headingIcon="sparkle"
                        items={includes}
                    />
                    <FeatureList
                        heading={cfg.notesHeading || "Important notes"}
                        headingIcon="shield"
                        items={notes}
                    />
                </div>
            </section>
        </div>
    );
}

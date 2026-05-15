// Horizontal trust signal row — psychological scaffolding for cold
// Instagram traffic landing on the checkout. Icons are inline SVG so
// nothing extra has to load over the network.

function Icon({ name }) {
    const stroke = "currentColor";
    const w = 18;
    switch (name) {
        case "lock":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke={stroke} strokeWidth="1.6"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            );
        case "shield":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l8 3v5c0 5-3.4 9.1-8 10-4.6-.9-8-5-8-10V6l8-3z"
                          stroke={stroke} strokeWidth="1.6" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.6"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "guarantee":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 12a9 9 0 1018 0M21 12v4h-4M3 12v4h4"
                          stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "truck":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" stroke={stroke} strokeWidth="1.6"
                          strokeLinejoin="round"/>
                    <circle cx="7" cy="18" r="1.8" stroke={stroke} strokeWidth="1.6"/>
                    <circle cx="17" cy="18" r="1.8" stroke={stroke} strokeWidth="1.6"/>
                </svg>
            );
        case "verified":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2l2.4 2.4 3.3-.3.3 3.3L20.4 9.8l-2.4 2.4.3 3.3-3.3.3L12.6 18l-2.4-2.4-3.3.3-.3-3.3L4.2 9.8l2.4-2.4-.3-3.3 3.3-.3z"
                          stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.6"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "support":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6"/>
                    <path d="M9 10a3 3 0 116 0c0 1.3-1 1.8-1.7 2.3-.6.4-1 .8-1 1.7M12 17.5h.01"
                          stroke={stroke} strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            );
        case "lab":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 3v6L4 18a2 2 0 002 3h12a2 2 0 002-3l-5-9V3M8 3h8"
                          stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        case "discreet":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 6h18l-2 12H5L3 6z" stroke={stroke} strokeWidth="1.6"
                          strokeLinejoin="round"/>
                    <path d="M9 6V4h6v2" stroke={stroke} strokeWidth="1.6"/>
                </svg>
            );
        case "card":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke={stroke} strokeWidth="1.6"/>
                    <path d="M3 10h18M7 15h3" stroke={stroke} strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            );
        case "leaf":
            return (
                <svg width={w} height={w} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 19c5 2 13-2 14-13C8 4 4 12 5 19zM5 19l8-8"
                          stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        default:
            return null;
    }
}

export default function TrustBadges({ data }) {
    const badges = (data && data.badges) || [];
    if (badges.length === 0) return null;
    return (
        <ul className="ep-trust-badges" aria-label="Trust signals">
            {badges.map((b, i) => (
                <li key={i} className="ep-trust-badges__item">
                    <span className="ep-trust-badges__icon" aria-hidden="true">
                        <Icon name={b.icon || "lock"} />
                    </span>
                    <span className="ep-trust-badges__label">{b.label}</span>
                </li>
            ))}
        </ul>
    );
}

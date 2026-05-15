import { Icon } from "./icons.jsx";

// Horizontal trust signal row — psychological scaffolding for cold
// Instagram traffic landing on the checkout. Icons are inline SVG so
// nothing extra has to load over the network.
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

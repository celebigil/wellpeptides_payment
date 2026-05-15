import { Icon } from "./icons.jsx";

// 2-4 feature cards in a responsive grid (1 col mobile → 3 cols desktop).
// Each card: large mavi icon, Aeonik Fono title, short Aeonik Pro
// description. Sits right under the trust strip to expand on what makes
// the brand trustworthy in one scrollable row.
export default function FeatureCards({ data }) {
    const items = (data && Array.isArray(data.items)) ? data.items : [];
    if (items.length === 0) return null;
    const title = data && data.title;
    return (
        <section className="ep-feature-cards" aria-label={title || "Features"}>
            {title ? <h3 className="ep-feature-cards__title">{title}</h3> : null}
            <ul className="ep-feature-cards__grid">
                {items.map((it, i) => (
                    <li key={i} className="ep-feature-cards__item">
                        <span className="ep-feature-cards__icon" aria-hidden="true">
                            <Icon name={it.icon || "shield"} size={28} />
                        </span>
                        <h4 className="ep-feature-cards__heading">{it.title}</h4>
                        <p className="ep-feature-cards__desc">{it.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

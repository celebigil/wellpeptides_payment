import { Fragment } from "react";
import { Icon } from "./icons.jsx";

// Render plain text + honour <br> tags admins type from BO. We avoid
// dangerouslySetInnerHTML so the rest of the string stays safely text;
// only <br> / <br/> / <br /> turn into real line breaks.
function withLineBreaks(text) {
    if (text == null) return null;
    const parts = String(text).split(/<br\s*\/?>/i);
    return parts.map((p, i) => (
        <Fragment key={i}>
            {p}
            {i < parts.length - 1 ? <br /> : null}
        </Fragment>
    ));
}

// Responsive 2-up grid of feature cards. Visually mirrors the longevity
// template's bottom cards: white surface, soft border, Cormorant title
// with the icon inline, then either a short paragraph OR a vertical
// bullet list (each row gets its own icon).
//
// Each `items[i]` may carry:
//   - description: single paragraph rendered under the title
//   - bullets: list of {icon, text} sub-rows rendered as a list
// At least one of the two is expected (BO + BE enforce this).
export default function FeatureCards({ data }) {
    const items = (data && Array.isArray(data.items)) ? data.items : [];
    if (items.length === 0) return null;
    const title = data && data.title;
    return (
        <section className="ep-feature-cards" aria-label={title || "Features"}>
            {title ? <h3 className="ep-feature-cards__title">{title}</h3> : null}
            <ul className="ep-feature-cards__grid">
                {items.map((it, i) => {
                    const bullets = Array.isArray(it.bullets) ? it.bullets : [];
                    return (
                        <li key={i} className="ep-feature-cards__item">
                            <div className="ep-feature-cards__header">
                                <span className="ep-feature-cards__icon" aria-hidden="true">
                                    <Icon name={it.icon || "shield"} size={22} />
                                </span>
                                <h4 className="ep-feature-cards__heading">
                                    {withLineBreaks(it.title)}
                                </h4>
                            </div>
                            {bullets.length > 0 ? (
                                <ul className="ep-feature-cards__list">
                                    {bullets.map((b, j) => (
                                        <li key={j} className="ep-feature-cards__row">
                                            <span className="ep-feature-cards__row-icon" aria-hidden="true">
                                                <Icon name={b.icon || "shield"} size={18} />
                                            </span>
                                            <span className="ep-feature-cards__row-text">
                                                {withLineBreaks(b.text)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : it.description ? (
                                <p className="ep-feature-cards__desc">
                                    {withLineBreaks(it.description)}
                                </p>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

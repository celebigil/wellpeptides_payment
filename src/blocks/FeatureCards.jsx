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

// 2-4 feature cards in a responsive grid (auto-fit by item count).
// Each card: icon + title on the same row, description below. Sits
// right under the trust strip to expand on the trust signals with one
// extra line of context per pillar.
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
                        <div className="ep-feature-cards__header">
                            <span className="ep-feature-cards__icon" aria-hidden="true">
                                <Icon name={it.icon || "shield"} size={24} />
                            </span>
                            <h4 className="ep-feature-cards__heading">
                                {withLineBreaks(it.title)}
                            </h4>
                        </div>
                        <p className="ep-feature-cards__desc">
                            {withLineBreaks(it.description)}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

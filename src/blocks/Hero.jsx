// Mirrors the new_wel Hero card pattern (see new_wel/src/components/
// sections/Hero.module.css): one wide card with a colored top zone,
// centered uppercase title + serif subtitle, image below.
const DEFAULT_BG = "#DDD3B9"; // matches new_wel `--color-beige`

export default function Hero({ data }) {
    const { headline, subheadline, image_url, bg_color } = data || {};
    const cardBg = bg_color || DEFAULT_BG;
    return (
        <section className="ep-hero" aria-label={headline || "Hero"}>
            <div className="ep-hero__card">
                <div
                    className="ep-hero__inner"
                    style={{ "--ep-hero-bg": cardBg }}
                >
                    <div className="ep-hero__text">
                        {headline ? (
                            <h1 className="ep-hero__title">{headline}</h1>
                        ) : null}
                        {subheadline ? (
                            <p className="ep-hero__subtitle">{subheadline}</p>
                        ) : null}
                    </div>
                    {image_url ? (
                        <div className="ep-hero__image">
                            <img src={image_url} alt={headline || ""} loading="eager" />
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

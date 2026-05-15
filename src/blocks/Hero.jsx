// Hero block — mirrors the new_wel canonical hero (NewHomePage6):
// black backdrop, optional video/image bg under a dark overlay, big
// Aeonik white headline left-aligned, faded white subtitle, scroll
// hint line at the bottom. Designed for cold Instagram traffic —
// the visual weight of a full dark hero reads as "real product page".

export default function Hero({ data }) {
    const { headline, subheadline, image_url, video_url, bg_color } = data || {};
    // Black is the brand default; bg_color is an optional override (e.g.
    // for a "light" variant page). The dark overlay still sits over any
    // media so legibility is consistent regardless of which asset loads.
    const style = bg_color ? { backgroundColor: bg_color } : undefined;
    return (
        <section className="ep-hero" style={style} aria-label={headline || "Hero"}>
            {video_url ? (
                <div className="ep-hero__media" aria-hidden="true">
                    <video
                        className="ep-hero__video"
                        src={video_url}
                        autoPlay
                        muted
                        playsInline
                        loop
                    />
                    <div className="ep-hero__overlay" />
                </div>
            ) : image_url ? (
                <div className="ep-hero__media" aria-hidden="true">
                    <img className="ep-hero__image" src={image_url} alt="" />
                    <div className="ep-hero__overlay" />
                </div>
            ) : null}

            <div className="ep-hero__content">
                {headline ? <h1 className="ep-hero__title">{headline}</h1> : null}
                {subheadline ? (
                    <p className="ep-hero__subtitle">{subheadline}</p>
                ) : null}
            </div>
            <div className="ep-hero__scroll-hint" aria-hidden="true">
                <span className="ep-hero__scroll-line" />
            </div>
        </section>
    );
}

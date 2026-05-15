// Hero block — mirrors the new_wel canonical hero (NewHomePage6):
// black backdrop, optional video/image bg under a dark overlay, big
// Aeonik white headline left-aligned, faded white subtitle, optional
// CTA pill inline at the bottom (when data.cta is set), scroll hint.
import CtaButton from "./CtaButton.jsx";

export default function Hero({ blockId, data, page }) {
    const { headline, subheadline, tagline, image_url, video_url, bg_color, cta } = data || {};
    const style = bg_color ? { backgroundColor: bg_color } : undefined;
    const hasCta = cta && (cta.label || cta.amount || cta.url);
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
                {tagline ? (
                    <p className="ep-hero__tagline">{tagline}</p>
                ) : null}
                {hasCta ? (
                    <div className="ep-hero__cta">
                        {/* blockId is the hero's id — paypal_service.resolve_cta
                            knows to look inside hero.data.cta for the amount. */}
                        <CtaButton blockId={blockId} data={cta} page={page} variant="dark" />
                    </div>
                ) : null}
            </div>
            <div className="ep-hero__scroll-hint" aria-hidden="true">
                <span className="ep-hero__scroll-line" />
            </div>
        </section>
    );
}

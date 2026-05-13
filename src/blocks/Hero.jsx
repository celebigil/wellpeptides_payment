export default function Hero({ data }) {
    const { headline, subheadline, image_url, bg_color } = data || {};
    // bg_color from BO becomes the lower stop of a soft vertical gradient,
    // blending into the page so the hero feels like an editorial intro
    // rather than a flat block.
    const style = bg_color
        ? { background: `linear-gradient(180deg, ${bg_color}00 0%, ${bg_color} 100%)` }
        : undefined;
    return (
        <section className="ep-hero" style={style}>
            {image_url ? (
                <img src={image_url} alt="" className="ep-hero__img" />
            ) : (
                <span className="ep-hero__eyebrow">— The Well Society —</span>
            )}
            <div className="ep-hero__content">
                {headline ? <h1 className="ep-hero__headline">{headline}</h1> : null}
                {subheadline ? (
                    <p className="ep-hero__subheadline">{subheadline}</p>
                ) : null}
            </div>
        </section>
    );
}

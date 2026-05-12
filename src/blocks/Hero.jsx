export default function Hero({ data }) {
    const { headline, subheadline, image_url, bg_color } = data || {};
    const style = bg_color ? { backgroundColor: bg_color } : undefined;
    return (
        <section className="ep-hero" style={style}>
            {image_url ? (
                <img src={image_url} alt="" className="ep-hero__img" />
            ) : null}
            <div className="ep-hero__content">
                {headline ? <h1 className="ep-hero__headline">{headline}</h1> : null}
                {subheadline ? (
                    <p className="ep-hero__subheadline">{subheadline}</p>
                ) : null}
            </div>
        </section>
    );
}

export default function Image({ data }) {
    const { url, alt, caption, title } = data || {};
    if (!url) return null;
    return (
        <figure className="ep-image">
            {title ? <h3 className="ep-block__title ep-image__title">{title}</h3> : null}
            <img src={url} alt={alt || ""} loading="lazy" />
            {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
    );
}

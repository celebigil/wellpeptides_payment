export default function Image({ data }) {
    const { url, alt, caption } = data || {};
    if (!url) return null;
    return (
        <figure className="ep-image">
            <img src={url} alt={alt || ""} loading="lazy" />
            {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
    );
}

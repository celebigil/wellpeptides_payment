// Single customer quote card. Social proof on a public landing where
// the visitor has no relationship with the brand yet.

function Stars({ count }) {
    if (!count) return null;
    const filled = Math.max(0, Math.min(5, parseInt(count, 10) || 0));
    return (
        <div className="ep-testimonial__stars" aria-label={`${filled} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                     className={i < filled ? "ep-testimonial__star--on" : "ep-testimonial__star--off"}
                     aria-hidden="true">
                    <path d="M12 2.5l2.9 6 6.6.6-5 4.5 1.5 6.5L12 16.8 5.9 20l1.5-6.5-5-4.5 6.6-.6L12 2.5z"
                          fill="currentColor"/>
                </svg>
            ))}
        </div>
    );
}

function Initials({ name }) {
    const parts = String(name || "").trim().split(/\s+/).slice(0, 2);
    const letters = parts.map(p => p.charAt(0).toUpperCase()).join("") || "?";
    return <span className="ep-testimonial__initials" aria-hidden="true">{letters}</span>;
}

export default function Testimonial({ data }) {
    const { quote, author, author_role, avatar_url, rating, verified } = data || {};
    if (!quote || !author) return null;
    return (
        <figure className="ep-testimonial">
            <Stars count={rating} />
            <blockquote className="ep-testimonial__quote">{quote}</blockquote>
            <figcaption className="ep-testimonial__author">
                <span className="ep-testimonial__avatar">
                    {avatar_url ? <img src={avatar_url} alt="" loading="lazy" /> : <Initials name={author} />}
                </span>
                <span className="ep-testimonial__author-text">
                    <span className="ep-testimonial__author-name">
                        {author}
                        {verified ? (
                            <span className="ep-testimonial__verified" title="Verified buyer">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" fill="currentColor"/>
                                    <path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="2"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Verified
                            </span>
                        ) : null}
                    </span>
                    {author_role ? (
                        <span className="ep-testimonial__author-role">{author_role}</span>
                    ) : null}
                </span>
            </figcaption>
        </figure>
    );
}

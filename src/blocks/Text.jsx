import DOMPurify from "dompurify";

// Admin-edited HTML — narrow allowlist matches the BO field hint.
const SANITIZE_OPTS = {
    ALLOWED_TAGS: ["h2", "h3", "p", "ul", "ol", "li", "strong", "em", "a", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
};

export default function Text({ data }) {
    const raw = data?.html ?? "";
    const clean = DOMPurify.sanitize(raw, SANITIZE_OPTS);
    return (
        <section
            className="ep-text"
            dangerouslySetInnerHTML={{ __html: clean }}
        />
    );
}

// Decorative divider — thin lines on either side with a centered diamond
// glyph. Reads more "editorial" than a flat <hr> and signals "new section".
export default function Divider() {
    return (
        <div className="ep-divider" role="separator" aria-hidden="true">
            <span className="ep-divider__line" />
            <span className="ep-divider__mark">◆</span>
            <span className="ep-divider__line" />
        </div>
    );
}

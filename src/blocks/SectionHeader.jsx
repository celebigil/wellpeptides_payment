export default function SectionHeader({ data }) {
    const { eyebrow, title, subtitle, align = "center" } = data || {};
    if (!title) return null;
    const cls = `ep-section-header ep-section-header--${align === "left" ? "left" : "center"}`;
    return (
        <header className={cls}>
            {eyebrow ? <p className="ep-section-header__eyebrow">{eyebrow}</p> : null}
            <h2 className="ep-section-header__title">{title}</h2>
            {subtitle ? <p className="ep-section-header__subtitle">{subtitle}</p> : null}
        </header>
    );
}

export default function List({ data }) {
    const { style = "bullets", items = [] } = data || {};
    if (items.length === 0) return null;
    if (style === "numbers") {
        return (
            <ol className="ep-list ep-list--numbers">
                {items.map((it, i) => <li key={i}>{it}</li>)}
            </ol>
        );
    }
    const cls = style === "checkmarks" ? "ep-list ep-list--checkmarks" : "ep-list";
    return (
        <ul className={cls}>
            {items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
    );
}

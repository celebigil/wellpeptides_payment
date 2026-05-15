export default function List({ data }) {
    const { style = "bullets", items = [], title } = data || {};
    if (items.length === 0) return null;

    const listEl = (() => {
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
    })();

    if (!title) return listEl;
    return (
        <div className="ep-block">
            <h3 className="ep-block__title">{title}</h3>
            {listEl}
        </div>
    );
}

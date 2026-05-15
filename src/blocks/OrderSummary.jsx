// Itemised order summary card. "What am I paying for and how much" —
// removes ambiguity right before the user clicks Pay.
export default function OrderSummary({ data }) {
    const items = (data && Array.isArray(data.items)) ? data.items : [];
    if (items.length === 0) return null;
    const totalLabel = (data && data.total_label) || "Total";
    const totalValue = data && data.total_value;
    const note = data && data.note;
    return (
        <section className="ep-order-summary" aria-label="Order summary">
            <ul className="ep-order-summary__list">
                {items.map((it, i) => (
                    <li key={i} className="ep-order-summary__row">
                        <span className="ep-order-summary__label">{it.label}</span>
                        <span className="ep-order-summary__value">{it.value}</span>
                    </li>
                ))}
            </ul>
            {totalValue ? (
                <div className="ep-order-summary__total">
                    <span className="ep-order-summary__total-label">{totalLabel}</span>
                    <span className="ep-order-summary__total-value">{totalValue}</span>
                </div>
            ) : null}
            {note ? <p className="ep-order-summary__note">{note}</p> : null}
        </section>
    );
}

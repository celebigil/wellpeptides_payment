// FAQ accordion. Uses native <details>/<summary> so it works without
// JS (Instagram in-app browser sometimes throttles JS in odd ways).

export default function Faq({ data }) {
    const items = (data && Array.isArray(data.items)) ? data.items : [];
    if (items.length === 0) return null;
    return (
        <section className="ep-faq" aria-label={data?.title || "Frequently asked questions"}>
            {data?.title ? <h3 className="ep-faq__title">{data.title}</h3> : null}
            <div className="ep-faq__list">
                {items.map((it, i) => (
                    <details key={i} className="ep-faq__item">
                        <summary className="ep-faq__question">
                            <span>{it.question}</span>
                            <svg className="ep-faq__chevron" width="14" height="14"
                                 viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </summary>
                        <div className="ep-faq__answer">{it.answer}</div>
                    </details>
                ))}
            </div>
        </section>
    );
}

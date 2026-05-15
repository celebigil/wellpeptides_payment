// Horizontal "Review → Pay → Confirm" strip telling the buyer where they
// are in the funnel. Three states per step: complete / active / pending.
export default function StepIndicator({ data }) {
    const steps = (data && Array.isArray(data.steps)) ? data.steps : [];
    if (steps.length < 2) return null;
    const active = Math.max(0, Math.min(parseInt(data.active_index || 0, 10), steps.length - 1));
    return (
        <ol className="ep-steps" aria-label="Checkout progress">
            {steps.map((label, i) => {
                const state =
                    i < active ? "complete" :
                    i === active ? "active" : "pending";
                return (
                    <li key={i} className={`ep-steps__item ep-steps__item--${state}`}>
                        <span className="ep-steps__dot" aria-hidden="true">
                            {state === "complete" ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.4"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <span className="ep-steps__dot-fill" />
                            )}
                        </span>
                        <span className="ep-steps__label">{label}</span>
                    </li>
                );
            })}
        </ol>
    );
}

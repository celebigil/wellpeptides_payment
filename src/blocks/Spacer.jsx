export default function Spacer({ data }) {
    const height = Math.max(0, Math.min(400, Number(data?.height ?? 24)));
    return <div className="ep-spacer" style={{ height: `${height}px` }} aria-hidden="true" />;
}

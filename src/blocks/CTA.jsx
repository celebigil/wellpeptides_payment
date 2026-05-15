import CtaButton from "./CtaButton.jsx";

// Standalone CTA block — wraps CtaButton without changes. The shared
// button is reused by the hero block too (blocks/Hero.jsx).
export default function CTA({ blockId, data, page }) {
    return <CtaButton blockId={blockId} data={data} page={page} variant="light" />;
}

import Hero from "./blocks/Hero.jsx";
import SectionHeader from "./blocks/SectionHeader.jsx";
import Text from "./blocks/Text.jsx";
import Image from "./blocks/Image.jsx";
import List from "./blocks/List.jsx";
import CTA from "./blocks/CTA.jsx";
import Spacer from "./blocks/Spacer.jsx";
import Divider from "./blocks/Divider.jsx";
import TrustBadges from "./blocks/TrustBadges.jsx";
import StepIndicator from "./blocks/StepIndicator.jsx";
import OrderSummary from "./blocks/OrderSummary.jsx";
import Testimonial from "./blocks/Testimonial.jsx";
import Faq from "./blocks/Faq.jsx";
import FeatureCards from "./blocks/FeatureCards.jsx";
import SiteHeader from "./layout/SiteHeader.jsx";
import SiteFooter from "./layout/SiteFooter.jsx";
import LongevityLanding from "./layout/LongevityLanding.jsx";
// TrustStrip is now rendered INSIDE the Hero block (see blocks/Hero.jsx).
// Landings without a hero won't show one — which is the correct trade-off
// since trust strip without brand context above is just visual noise.

const RENDERERS = {
    hero: Hero,
    section_header: SectionHeader,
    text: Text,
    image: Image,
    list: List,
    cta: CTA,
    spacer: Spacer,
    divider: Divider,
    trust_badges: TrustBadges,
    step_indicator: StepIndicator,
    order_summary: OrderSummary,
    testimonial: Testimonial,
    faq: Faq,
    feature_cards: FeatureCards,
};

function Blocks({ blocks, page }) {
    return (
        <>
            {blocks.map((b) => {
                const Renderer = RENDERERS[b.type];
                if (!Renderer) return null;
                return <Renderer key={b.id} blockId={b.id} data={b.data} page={page} />;
            })}
        </>
    );
}

// Read PayPal return state from the URL — set when the BE redirects the
// buyer back from /api/v1/pp/return or /pp/cancel with `?pp=success|cancel`.
function readPaypalResult() {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const status = params.get("pp");
    if (!status) return null;
    return {
        status,
        orderId: params.get("order"),
        message: params.get("message"),
    };
}

function PaypalResultBanner({ result }) {
    if (!result) return null;
    const kind = result.status; // success | cancel | error
    const title =
        kind === "success" ? "Payment received" :
        kind === "cancel"  ? "Checkout cancelled" :
        "Payment could not be completed";
    const body =
        kind === "success" ? "Thank you — your order has been confirmed. We'll email you the details shortly." :
        kind === "cancel"  ? "No charge was made. You can resume checkout anytime by tapping the button below." :
        (result.message || "Please try again, or contact support if the issue persists.");
    return (
        <div className={`ep-pp-banner ep-pp-banner--${kind}`} role="status">
            <strong>{title}</strong>
            <p>{body}</p>
            {result.orderId ? (
                <p className="ep-pp-banner__ref">Reference: <code>{result.orderId}</code></p>
            ) : null}
        </div>
    );
}

export default function App({ page }) {
    const blocks = page?.blocksJson?.blocks ?? [];
    // Default to "wrapped" so older rows (created before the template
    // column existed) get the full site chrome rather than a bare page.
    const template = page?.template || "wrapped";
    const ppResult = readPaypalResult();

    if (template === "bare") {
        return (
            <main className="ep-page">
                <PaypalResultBanner result={ppResult} />
                <Blocks blocks={blocks} page={page} />
            </main>
        );
    }

    if (template === "longevity") {
        // Bespoke dark-hero landing — no SiteHeader/SiteFooter, no Blocks
        // renderer. LongevityLanding owns its own nav, footer-less layout
        // and reads content from page.blocksJson.longevity.
        return (
            <>
                <PaypalResultBanner result={ppResult} />
                <LongevityLanding page={page} />
            </>
        );
    }

    return (
        <div className="ep-shell">
            <SiteHeader />
            <main className="ep-page">
                <PaypalResultBanner result={ppResult} />
                <Blocks blocks={blocks} page={page} />
            </main>
            <SiteFooter />
        </div>
    );
}

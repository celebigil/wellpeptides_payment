import Hero from "./blocks/Hero.jsx";
import Text from "./blocks/Text.jsx";
import Image from "./blocks/Image.jsx";
import List from "./blocks/List.jsx";
import CTA from "./blocks/CTA.jsx";
import Spacer from "./blocks/Spacer.jsx";
import Divider from "./blocks/Divider.jsx";
import SiteHeader from "./layout/SiteHeader.jsx";
import SiteFooter from "./layout/SiteFooter.jsx";

const RENDERERS = {
    hero: Hero,
    text: Text,
    image: Image,
    list: List,
    cta: CTA,
    spacer: Spacer,
    divider: Divider,
};

function Blocks({ blocks, page }) {
    return (
        <>
            {blocks.map((b) => {
                const Renderer = RENDERERS[b.type];
                if (!Renderer) return null;
                return <Renderer key={b.id} data={b.data} page={page} />;
            })}
        </>
    );
}

export default function App({ page }) {
    const blocks = page?.blocksJson?.blocks ?? [];
    // Default to "wrapped" so older rows (created before the template
    // column existed) get the full site chrome rather than a bare page.
    const template = page?.template || "wrapped";

    if (template === "bare") {
        return (
            <main className="ep-page">
                <Blocks blocks={blocks} page={page} />
            </main>
        );
    }

    return (
        <div className="ep-shell">
            <SiteHeader />
            <main className="ep-page">
                <Blocks blocks={blocks} page={page} />
            </main>
            <SiteFooter />
        </div>
    );
}

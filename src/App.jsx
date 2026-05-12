import Hero from "./blocks/Hero.jsx";
import Text from "./blocks/Text.jsx";
import Image from "./blocks/Image.jsx";
import List from "./blocks/List.jsx";
import CTA from "./blocks/CTA.jsx";
import Spacer from "./blocks/Spacer.jsx";
import Divider from "./blocks/Divider.jsx";

const RENDERERS = {
    hero: Hero,
    text: Text,
    image: Image,
    list: List,
    cta: CTA,
    spacer: Spacer,
    divider: Divider,
};

export default function App({ page }) {
    const blocks = page?.blocksJson?.blocks ?? [];
    return (
        <main className="ep-page">
            {blocks.map((b) => {
                const Renderer = RENDERERS[b.type];
                if (!Renderer) return null;
                return <Renderer key={b.id} data={b.data} page={page} />;
            })}
        </main>
    );
}

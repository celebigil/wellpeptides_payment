import posthog from "posthog-js";

let ready = false;

export function initAnalytics(page) {
    const key = import.meta.env.VITE_POSTHOG_KEY;
    // Without a key we silently no-op so previews/dev builds don't error.
    if (!key) return;
    const host = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

    posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        autocapture: false,
        persistence: "memory",
    });
    ready = true;

    posthog.capture("ep_page_view", {
        page_id: page?.id,
        slug: page?.slug,
        is_default: page?.isDefault,
    });
}

export function trackCtaClick({ label, href, slug, pageId }) {
    if (!ready) return;
    posthog.capture("ep_cta_click", {
        cta_label: label,
        cta_href: href,
        slug,
        page_id: pageId,
    });
}

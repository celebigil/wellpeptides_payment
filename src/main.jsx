import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { initAnalytics } from "./analytics.js";
import "./styles.css";

// The BE Jinja shell injects window.__PAGE_DATA__ before this script
// loads. In dev, index.html sets a stub for the same shape.
const pageData = window.__PAGE_DATA__;

if (!pageData) {
    document.getElementById("root").innerHTML =
        '<div class="ep-error">Missing page data. The Jinja shell did not inject window.__PAGE_DATA__.</div>';
} else {
    initAnalytics(pageData);
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <App page={pageData} />
        </React.StrictMode>,
    );
}

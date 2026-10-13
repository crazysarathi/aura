import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App";
import "./styles/globals.css";

/**
 * Browser entry point. Routing uses HashRouter, so page URLs look like
 * https://aura.sks.clinic/#/cosmetic-dermatology/ and the host only ever serves index.html.
 *
 * Path-style URLs (old WordPress links, bookmarks, search results such as
 * /cosmetic-dermatology/#skin) are rewritten to their hash equivalent before rendering, so
 * they keep working: /cosmetic-dermatology/#skin → /#/cosmetic-dermatology/#skin.
 */
const base = import.meta.env.BASE_URL; // "/" unless the site is deployed under a sub-path
const { pathname, search, hash } = window.location;

if (pathname !== base && pathname !== `${base}index.html`) {
  const route = pathname.slice(base.length - 1); // keep the leading slash
  window.location.replace(`${base}#${route}${search}${hash}`);
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  );
}

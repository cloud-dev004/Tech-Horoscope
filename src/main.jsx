import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Lenis from "lenis";

// ── Smooth Scroll (Lenis) ─────────────────────────────────────────────────────
// autoRaf: true  → Lenis drives its own RAF loop, no manual raf() call needed.
// smoothWheel    → smooth wheel physics on desktop.
// lerp           → 0.08 gives a subtle, premium deceleration feel.
// Framer Motion's useScroll reads native scrollY which Lenis keeps in sync — no conflicts.
const lenis = new Lenis({
  autoRaf: true,
  smoothWheel: true,
  lerp: 0.08,
});

// Expose on window so Lenis can be paused/resumed by other code if ever needed.
window.__lenis = lenis;
// ─────────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

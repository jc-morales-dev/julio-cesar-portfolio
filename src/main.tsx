import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import "./index.css";
import App from "./App";
import VortexCaseStudy from "./pages/VortexCaseStudy";

// reducedMotion="user" hace que Framer respete prefers-reduced-motion.
// El @media del CSS solo frenaba las animaciones CSS; las de Framer son JS
// y seguian moviendose igual.
const path = window.location.pathname.replace(/\/+$/, "") || "/";
const isVortexCase =
  path === "/case-studies/vortex" || path === "/projects/vortex";

if (isVortexCase) {
  document.title = "Vortex Case Study | Julio Cesar Morales";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      {isVortexCase ? <VortexCaseStudy /> : <App />}
    </MotionConfig>
  </StrictMode>
);

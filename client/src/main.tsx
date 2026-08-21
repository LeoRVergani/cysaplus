import { createRoot } from "react-dom/client";
import App from "./App";
import { registerStudyPwa } from "./pwa";
import "./index.css";
import "./portable-visuals.css";
import "./learning-content.css";
import "./atlas-operational-details.css";
import "./chapter-learning.css";
import "./chapter-learning-atlas.css";

createRoot(document.getElementById("root")!).render(<App />);

registerStudyPwa();

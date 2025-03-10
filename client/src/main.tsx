import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply Inter font family to the document
document.documentElement.classList.add("font-sans");

createRoot(document.getElementById("root")!).render(<App />);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

/**
 * main.jsx
 * ---------
 * The entry point of the application.
 *
 * - StrictMode: Helps catch common React mistakes during development
 * - BrowserRouter: Enables client-side routing (URL-based navigation)
 * - App: Our root component that contains everything
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

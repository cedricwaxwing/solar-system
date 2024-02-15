import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./tailwind.css";
import App from "./App";
import FeaturesProvider from "./common/FeaturesProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FeaturesProvider>
      <App />
    </FeaturesProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./components/App";
import { UserProfileProvider } from "./contexts/UserProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProfileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProfileProvider>
  </React.StrictMode>
);

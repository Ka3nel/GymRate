import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ReviewsContextProvider } from "./context/ReviewsContext";
import { AuthContextProvider } from "./context/AuthContext";
import { GymsContextProvider } from "./context/GymsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReviewsContextProvider>
        <GymsContextProvider>
          <App />
        </GymsContextProvider>
      </ReviewsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

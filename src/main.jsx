import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
      toastStyle={{
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: "500",
        background: "#1f2937",
        color: "#fff",
      }}
    />
  </StrictMode>,
);

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "./Components/AppContext"; // Fixed import
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <Toaster/>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);

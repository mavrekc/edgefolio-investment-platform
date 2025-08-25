import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./store/AuthContext";
import { LanguageProvider } from "./store/LanguageProvider";
import "./fonts.css";
import "./index.css";

import 'bootstrap/dist/js/bootstrap.bundle.js';

import router from "./routes/router";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider
    disableTransitionOnChange={true}
    defaultTheme='dark'
    attribute="data-theme"
  >
    <Toaster
      position='top-right'
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        removeDelay: 1000,
        style: {
          padding: "0.75rem",
          margin: "0",
          minWidth: "200px",
        },
      }}
    />
    <AuthProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
    </AuthProvider>
  </ThemeProvider>,
);

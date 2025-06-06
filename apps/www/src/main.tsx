import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SuiWalletProvider from "./providers/SuiWalletProvider.tsx";
import "@mysten/dapp-kit/dist/index.css";
import "@mdxeditor/editor/style.css";
import { ModalProvider } from "./context/ModalContext.tsx";
import ModalContainer from "./components/modalContainer.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
            <QueryClientProvider client={queryClient}>
              <SuiWalletProvider>
                <App />
                <ModalContainer />
              </SuiWalletProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

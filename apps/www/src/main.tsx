import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SuiWalletProvider from "./providers/SuiWalletProvider.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import ModalContainer from "./components/modalContainer.tsx";
import { Toaster } from "sonner";
import "./index.css";
import "@mysten/dapp-kit/dist/index.css";
import "@mdxeditor/editor/style.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <SuiWalletProvider>
              <App />
              <ModalContainer />
              <Toaster richColors closeButton visibleToasts={1} />
            </SuiWalletProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

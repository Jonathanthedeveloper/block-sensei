import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuiProvider from "./SuiClientProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export default function Providers({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SuiProvider>{children}</SuiProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuiProvider from "./SuiClientProvider";

const queryClient = new QueryClient();
export default function Providers({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiProvider>{children}</SuiProvider>
    </QueryClientProvider>
  );
}

import { createContext, useContext, ReactNode } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

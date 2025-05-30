import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import React from "react";
import EnokiWalletProvider from "./EnokiWalletProvider";

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
  devnet: { url: getFullnodeUrl("devnet") },
});

export default function SuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
      <EnokiWalletProvider />
      <WalletProvider autoConnect>{children}</WalletProvider>
    </SuiClientProvider>
  );
}

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import React from "react";
import { useSuiClientContext } from "@mysten/dapp-kit";
import { isEnokiNetwork, registerEnokiWallets } from "@mysten/enoki";
import { useEffect } from "react";

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
  devnet: { url: getFullnodeUrl("devnet") },
});

export default function SuiWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <WalletProvider autoConnect>
        <EnokiWalletProvider />
        {children}
      </WalletProvider>
    </SuiClientProvider>
  );
}

function EnokiWalletProvider() {
  const { client, network } = useSuiClientContext();

  useEffect(() => {
    if (!isEnokiNetwork(network)) {
      console.warn(
        `Network ${network} is not supported by Enoki. Use testnet or mainnet.`
      );
      return;
    }
    const { unregister } = registerEnokiWallets({
      apiKey: import.meta.env.VITE_ENOKI_API_KEY,
      providers: {
        google: {
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        },
      },
      client,
      network,
    });

    return unregister;
  }, [client, network]);

  return null;
}

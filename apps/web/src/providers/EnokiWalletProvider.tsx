import { useSuiClientContext } from "@mysten/dapp-kit";
import { isEnokiNetwork, registerEnokiWallets } from "@mysten/enoki";
import { useEffect } from "react";

export default function EnokiWalletProvider() {
  const { client, network } = useSuiClientContext();

  useEffect(() => {
    if (!isEnokiNetwork(network)) return;

    const { unregister } = registerEnokiWallets({
      apiKey: "YOUR_PUBLIC_ENOKI_API_KEY",
      providers: {
        google: {
          clientId: "YOUR_GOOGLE_CLIENT_ID",
        },
        facebook: {
          clientId: "YOUR_FACEBOOK_CLIENT_ID",
        },
        twitch: {
          clientId: "YOUR_TWITCH_CLIENT_ID",
        },
      },
      client,
      network,
    });

    return unregister;
  }, [client, network]);

  return null;
}

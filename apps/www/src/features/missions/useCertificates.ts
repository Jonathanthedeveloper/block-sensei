import { useQuery } from "@tanstack/react-query";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";

export interface Certificate {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  missionId: string;
  completedAt: string;
  objectId: string;
}

export function useCertificates() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();

  return useQuery({
    queryKey: ["certificates", account?.address],
    queryFn: async (): Promise<Certificate[]> => {
      if (!account?.address) return [];

      try {
        // Get all objects owned by the account
        const objects = await suiClient.getOwnedObjects({
          owner: account.address,
          options: { showContent: true, showDisplay: true },
        });

        // Filter for certificate objects and map to our interface
        const certificates = objects.data
          .filter((obj) => {
            // Filter by certificate type
            return obj.data?.content?.type?.includes(
              import.meta.env.VITE_CERTIFICATE_TYPE_ID
            );
          })
          .map((obj) => {
            const content = obj.data?.content;
            const fields =
              content?.dataType === "moveObject" ? content.fields : null;
            const display = obj.data?.display?.data || {};

            return {
              id: obj.data?.objectId || "",
              title: fields?.name || display?.name || "Certificate",
              description: fields?.description || display?.description || "",
              imageUrl: fields?.url || display?.url || "",
              missionId: fields?.mission_id || "",
              completedAt: fields?.completed_at || "",
              objectId: obj.data?.objectId || "",
            };
          });

        return certificates;
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
        return [];
      }
    },
    enabled: !!account?.address,
  });
}

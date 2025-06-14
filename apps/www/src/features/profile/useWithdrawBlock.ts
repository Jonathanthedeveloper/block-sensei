import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

interface WithdrawBlockParams {
  amount: number;
  recipientAddress: string;
}

export function useWithdrawBlock() {
  const account = useCurrentAccount();
  const queryClient = useQueryClient();
  const signAndExecuteTransaction = useSignAndExecuteTransaction();
  const client = useSuiClient();

  return useMutation({
    mutationFn: async ({ amount, recipientAddress }: WithdrawBlockParams) => {
      if (!account?.address) {
        throw new Error("Wallet not connected");
      }

      try {

        // Create transaction block
        const tx = new Transaction();

        // Convert amount to blockchain format
        const amountInSmallestUnit = amount * 1_000_000_000;

        const coins = await client.getCoins({
          owner: account.address,
          coinType: import.meta.env.VITE_BLOCK_COIN_TYPE,
          limit: 1,
        });

        if (coins.data.length === 0) {
          throw new Error("No BLOCK coins found in wallet");
        }

        const [newCoin] = tx.splitCoins(coins.data[0].coinObjectId,[amountInSmallestUnit])

       tx.transferObjects([newCoin], recipientAddress);

        await signAndExecuteTransaction.mutateAsync({
          transaction: tx,
          account: account,
          chain: account.chains[0],
        });

        return true;
      } catch (error) {
        console.error("Withdrawal error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate queries to refresh balances
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      console.error(`Failed to withdraw BLOCK: ${error.message}`);
    },
  });
}

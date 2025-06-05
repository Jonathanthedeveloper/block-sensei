import { Injectable, OnModuleInit } from '@nestjs/common';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

@Injectable()
export class SuiService implements OnModuleInit {
  private suiClient: SuiClient;

  onModuleInit() {
    const fullnodeUrl = getFullnodeUrl('devnet');
    this.suiClient = new SuiClient({ url: fullnodeUrl });
  }

  async getTokenBalance(
    walletAddress: string,
    coinType: string = '0x2::sui::SUI',
  ): Promise<{ balance: string; formattedBalance: string }> {
    try {
      const balance = await this.suiClient.getBalance({
        owner: walletAddress,
        coinType: coinType,
      });

      return {
        balance: balance.totalBalance,
        formattedBalance: (
          Number(balance.totalBalance) / 1_000_000_000
        ).toFixed(9),
      };
    } catch (error: any) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to get token balance: ${message}`);
    }
  }

  async getAllTokenBalances(walletAddress: string) {
    try {
      const balances = await this.suiClient.getAllBalances({
        owner: walletAddress,
      });

      return balances.map((balance) => ({
        coinType: balance.coinType,
        balance: balance.totalBalance,
        formattedBalance: (
          Number(balance.totalBalance) / 1_000_000_000
        ).toFixed(9),
      }));
    } catch (error: any) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to get all token balances: ${message}`);
    }
  }

  async mintCertificate() {}

  async mintBadge() {}

  async sendBlocks(walletAddress: string, amount: number) {}
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { ConfigService } from '@nestjs/config';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';

type IMintCertificateParams = {
  title: string;
  description: string;
  imageUrl: string;
  completedAt: Date;
  recipient: string;
  missionId: string;
};

type IMintBadgeParams = {
  name: string;
  description: string;
  imageUrl: string;
  recipient: string;
};

type IMintBlockParams = {
  amount: number;
  recipient: string;
};

@Injectable()
export class SuiService implements OnModuleInit {
  private suiClient: SuiClient;
  private packageId: string;
  private adminCapabilityId: string;
  private treasuryCapId: string;
  private keyPair: Ed25519Keypair;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const fullnodeUrl = getFullnodeUrl('testnet');
    this.suiClient = new SuiClient({ url: fullnodeUrl });

    // Retrieve package and capability IDs from environment variables
    this.packageId = this.configService.get<string>('SUI_PACKAGE_ID')!;
    this.adminCapabilityId = this.configService.get<string>(
      'SUI_ADMIN_CAPABILITY_ID',
    )!;
    this.treasuryCapId = this.configService.get<string>(
      'SUI_TREASURY_CAPABILITY_ID',
    )!;

    // Initialize the keypair from the secret key stored in environment variables
    const privateKey = decodeSuiPrivateKey(
      this.configService.get('PRIVATE_KEY')!,
    );

    this.keyPair = Ed25519Keypair.fromSecretKey(privateKey.secretKey);
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

  async mintCertificate({
    title,
    description,
    imageUrl,
    completedAt,
    recipient,
    missionId,
  }: IMintCertificateParams) {
    const tx = new Transaction();

    tx.moveCall({
      target: `${this.packageId}::certificate::mint`,
      arguments: [
        tx.object(this.adminCapabilityId),
        tx.pure.string(title),
        tx.pure.string(description),
        tx.pure.string(missionId),
        tx.pure.string(imageUrl),
        tx.pure.u64(completedAt.getTime()),
        tx.pure.address(recipient),
      ],
    });

    const result = await this.suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keyPair,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    return result;
  }

  async mintBadge(data: IMintBadgeParams) {
    const tx = new Transaction();

    tx.moveCall({
      target: `${this.packageId}::badge::mint`,
      arguments: [
        tx.object(this.adminCapabilityId),
        tx.pure.string(data.name),
        tx.pure.string(data.description),
        tx.pure.string(data.imageUrl),
        tx.pure.address(data.recipient),
      ],
    });

    const result = await this.suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keyPair,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    return result;
  }

  async mintBlock(data: IMintBlockParams) {
    const tx = new Transaction();

    tx.moveCall({
      target: `${this.packageId}::block::mint`,
      arguments: [
        tx.object(this.adminCapabilityId),
        tx.object(this.treasuryCapId),
        tx.pure.u64(data.amount * 10 ** 9),
        tx.pure.address(data.recipient),
      ],
    });

    const result = await this.suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keyPair,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    return result;
  }
}

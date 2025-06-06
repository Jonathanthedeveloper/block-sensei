import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
export declare class SuiService implements OnModuleInit {
    private configService;
    private suiClient;
    private packageId;
    private adminCapabilityId;
    private treasuryCapId;
    private keyPair;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    getTokenBalance(walletAddress: string, coinType?: string): Promise<{
        balance: string;
        formattedBalance: string;
    }>;
    getAllTokenBalances(walletAddress: string): Promise<{
        coinType: string;
        balance: string;
        formattedBalance: string;
    }[]>;
    mintCertificate({ title, description, imageUrl, completedAt, recipient, missionId, }: IMintCertificateParams): Promise<import("@mysten/sui/dist/cjs/client").SuiTransactionBlockResponse>;
    mintBadge(data: IMintBadgeParams): Promise<import("@mysten/sui/dist/cjs/client").SuiTransactionBlockResponse>;
    mintBlock(data: IMintBlockParams): Promise<import("@mysten/sui/dist/cjs/client").SuiTransactionBlockResponse>;
}
export {};

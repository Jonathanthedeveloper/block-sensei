import { OnModuleInit } from '@nestjs/common';
export declare class SuiService implements OnModuleInit {
    private suiClient;
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
}

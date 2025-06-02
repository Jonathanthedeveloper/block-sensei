"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@mysten/sui/client");
let SuiService = class SuiService {
    suiClient;
    onModuleInit() {
        const fullnodeUrl = (0, client_1.getFullnodeUrl)('devnet');
        this.suiClient = new client_1.SuiClient({ url: fullnodeUrl });
    }
    async getTokenBalance(walletAddress, coinType = '0x2::sui::SUI') {
        try {
            const balance = await this.suiClient.getBalance({
                owner: walletAddress,
                coinType: coinType,
            });
            return {
                balance: balance.totalBalance,
                formattedBalance: (Number(balance.totalBalance) / 1_000_000_000).toFixed(9),
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to get token balance: ${message}`);
        }
    }
    async getAllTokenBalances(walletAddress) {
        try {
            const balances = await this.suiClient.getAllBalances({
                owner: walletAddress,
            });
            return balances.map((balance) => ({
                coinType: balance.coinType,
                balance: balance.totalBalance,
                formattedBalance: (Number(balance.totalBalance) / 1_000_000_000).toFixed(9),
            }));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to get all token balances: ${message}`);
        }
    }
};
exports.SuiService = SuiService;
exports.SuiService = SuiService = __decorate([
    (0, common_1.Injectable)()
], SuiService);
//# sourceMappingURL=sui.service.js.map
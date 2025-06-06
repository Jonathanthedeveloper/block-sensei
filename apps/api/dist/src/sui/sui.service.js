"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@mysten/sui/client");
const config_1 = require("@nestjs/config");
const transactions_1 = require("@mysten/sui/transactions");
const ed25519_1 = require("@mysten/sui/keypairs/ed25519");
const cryptography_1 = require("@mysten/sui/cryptography");
let SuiService = class SuiService {
    configService;
    suiClient;
    packageId;
    adminCapabilityId;
    treasuryCapId;
    keyPair;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const fullnodeUrl = (0, client_1.getFullnodeUrl)('testnet');
        this.suiClient = new client_1.SuiClient({ url: fullnodeUrl });
        this.packageId = this.configService.get('SUI_PACKAGE_ID');
        this.adminCapabilityId = this.configService.get('SUI_ADMIN_CAPABILITY_ID');
        this.treasuryCapId = this.configService.get('SUI_TREASURY_CAPALITY_ID');
        const privateKey = (0, cryptography_1.decodeSuiPrivateKey)(this.configService.get('PRIVATE_KEY'));
        this.keyPair = ed25519_1.Ed25519Keypair.fromSecretKey(privateKey.secretKey);
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
    async mintCertificate({ title, description, imageUrl, completedAt, recipient, missionId, }) {
        const tx = new transactions_1.Transaction();
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
    async mintBadge(data) {
        const tx = new transactions_1.Transaction();
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
    async mintBlock(data) {
        const tx = new transactions_1.Transaction();
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
};
exports.SuiService = SuiService;
exports.SuiService = SuiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SuiService);
//# sourceMappingURL=sui.service.js.map
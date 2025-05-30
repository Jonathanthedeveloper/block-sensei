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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const jwt_1 = require("@nestjs/jwt");
const node_crypto_1 = __importDefault(require("node:crypto"));
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(data) {
        let user = await this.prisma.user.findUnique({
            where: {
                wallet_address: data.address,
            },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    wallet_address: data.address,
                },
            });
        }
        const accessToken = await this.jwtService.signAsync({ id: user.id });
        const refreshToken = node_crypto_1.default.randomBytes(32).toString('hex');
        await this.prisma.refreshToken.upsert({
            where: {
                user_id: user.id,
            },
            create: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                token: refreshToken,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            update: {
                token: refreshToken,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return {
            session: {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
            user,
        };
    }
    async refreshAccessToken(data) {
        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                token: data.refresh_token,
            },
            include: {
                user: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!refreshToken)
            throw new common_1.HttpException('invalid or expired refresh token', common_1.HttpStatus.BAD_REQUEST);
        const accessToken = await this.jwtService.signAsync({
            id: refreshToken.user.id,
        });
        const newRefreshToken = node_crypto_1.default.randomBytes(32).toString('hex');
        await this.prisma.refreshToken.update({
            where: {
                user_id: refreshToken.user.id,
            },
            data: {
                token: newRefreshToken,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return {
            session: {
                access_token: accessToken,
                refresh_token: newRefreshToken,
            },
        };
    }
    async getCurrentUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                created_clans: true,
                joined_clans: true,
                mission_participations: true,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
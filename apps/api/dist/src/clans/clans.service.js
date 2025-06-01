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
exports.ClansService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let ClansService = class ClansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createClan(data, userId) {
        const existingClan = await this.prisma.clan.findUnique({
            where: { name: data.name },
        });
        if (existingClan) {
            throw new common_1.ConflictException('Clan name already exists');
        }
        return this.prisma.clan.create({
            data: {
                ...data,
                creator_id: userId,
            },
        });
    }
    async getAllClans(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [clans, total] = await Promise.all([
            this.prisma.clan.findMany({
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    creator: {
                        select: {
                            id: true,
                            wallet_address: true,
                        },
                    },
                    _count: {
                        select: {
                            followers: true,
                            missions: true,
                        },
                    },
                },
            }),
            this.prisma.clan.count(),
        ]);
        return {
            clans,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getClanById(id) {
        const clan = await this.prisma.clan.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        wallet_address: true,
                    },
                },
                followers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                wallet_address: true,
                            },
                        },
                    },
                },
                missions: true,
                _count: {
                    select: {
                        followers: true,
                        missions: true,
                    },
                },
            },
        });
        if (!clan) {
            throw new common_1.NotFoundException('Clan not found');
        }
        return clan;
    }
    async updateClan(id, updateClanDto, userId) {
        const clan = await this.prisma.clan.findUnique({
            where: { id },
        });
        if (!clan) {
            throw new common_1.NotFoundException('Clan not found');
        }
        if (clan.creator_id !== userId) {
            throw new common_1.ForbiddenException('Only the clan creator can update the clan');
        }
        if (updateClanDto.name && updateClanDto.name !== clan.name) {
            const existingClan = await this.prisma.clan.findUnique({
                where: { name: updateClanDto.name },
            });
            if (existingClan) {
                throw new common_1.ConflictException('Clan name already exists');
            }
        }
        return this.prisma.clan.update({
            where: { id },
            data: updateClanDto,
        });
    }
    async deleteClan(id, userId) {
        const clan = await this.prisma.clan.findUnique({
            where: { id },
        });
        if (!clan) {
            throw new common_1.NotFoundException('Clan not found');
        }
        if (clan.creator_id !== userId) {
            throw new common_1.ForbiddenException('Only the clan creator can delete the clan');
        }
        await this.prisma.clan.delete({
            where: { id },
        });
        return { message: 'Clan deleted successfully' };
    }
    async followClan(clanId, userId) {
        const clan = await this.prisma.clan.findUnique({
            where: { id: clanId },
        });
        if (!clan) {
            throw new common_1.NotFoundException('Clan not found');
        }
        const existingFollow = await this.prisma.userClan.findFirst({
            where: {
                user_id: userId,
                clan_id: clanId,
            },
        });
        if (existingFollow) {
            throw new common_1.ConflictException('You are already following this clan');
        }
        await this.prisma.userClan.create({
            data: {
                user_id: userId,
                clan_id: clanId,
            },
        });
        return { success: true, message: 'Successfully followed clan' };
    }
    async unfollowClan(clanId, userId) {
        const follow = await this.prisma.userClan.findFirst({
            where: {
                user_id: userId,
                clan_id: clanId,
            },
        });
        if (!follow) {
            throw new common_1.NotFoundException('You are not following this clan');
        }
        await this.prisma.userClan.delete({
            where: { id: follow.id },
        });
        return { success: true, message: 'Successfully unfollowed clan' };
    }
    async getUserFollowedClans(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [userClans, total] = await Promise.all([
            this.prisma.userClan.findMany({
                where: { user_id: userId },
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    clan: {
                        include: {
                            creator: {
                                select: {
                                    id: true,
                                    wallet_address: true,
                                },
                            },
                            _count: {
                                select: {
                                    followers: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.userClan.count({
                where: { user_id: userId },
            }),
        ]);
        const clans = userClans.map((userClan) => userClan.clan);
        return {
            clans,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getUserCreatedClans(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [clans, total] = await Promise.all([
            this.prisma.clan.findMany({
                where: { creator_id: userId },
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    creator: {
                        select: {
                            id: true,
                            wallet_address: true,
                        },
                    },
                    _count: {
                        select: {
                            followers: true,
                        },
                    },
                },
            }),
            this.prisma.clan.count({
                where: { creator_id: userId },
            }),
        ]);
        return {
            clans,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getClanFollowers(clanId, page = 1, limit = 10) {
        const clan = await this.prisma.clan.findUnique({
            where: { id: clanId },
        });
        if (!clan) {
            throw new common_1.NotFoundException('Clan not found');
        }
        const skip = (page - 1) * limit;
        const [followers, total] = await Promise.all([
            this.prisma.userClan.findMany({
                where: { clan_id: clanId },
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            wallet_address: true,
                            created_at: true,
                        },
                    },
                },
            }),
            this.prisma.userClan.count({
                where: { clan_id: clanId },
            }),
        ]);
        const users = followers.map((follower) => follower.user);
        return {
            followers: users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};
exports.ClansService = ClansService;
exports.ClansService = ClansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ClansService);
//# sourceMappingURL=clans.service.js.map
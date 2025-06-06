import { PrismaService } from 'nestjs-prisma';
import { CreateClanDto } from './dtos/create-clan.dto';
import { UpdateClanDto } from './dtos/update-clan.dto';
export declare class ClansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createClan(data: CreateClanDto, userId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        logo_url: string;
        x_url: string | null;
        website_url: string | null;
        creator_id: string;
    }>;
    getAllClans(page?: number, limit?: number): Promise<{
        clans: ({
            _count: {
                followers: number;
                missions: number;
            };
            creator: {
                id: string;
                wallet_address: string;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            description: string | null;
            logo_url: string;
            x_url: string | null;
            website_url: string | null;
            creator_id: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getClanById(id: string): Promise<{
        _count: {
            followers: number;
            missions: number;
        };
        creator: {
            id: string;
            wallet_address: string;
        };
        followers: ({
            user: {
                id: string;
                wallet_address: string;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            clan_id: string;
        })[];
        missions: {
            id: string;
            title: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
            clan_id: string;
            brief: string;
            status: import("@prisma/client").$Enums.MissionStatus;
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        logo_url: string;
        x_url: string | null;
        website_url: string | null;
        creator_id: string;
    }>;
    updateClan(id: string, updateClanDto: UpdateClanDto, userId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        logo_url: string;
        x_url: string | null;
        website_url: string | null;
        creator_id: string;
    }>;
    deleteClan(id: string, userId: string): Promise<{
        message: string;
    }>;
    followClan(clanId: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    unfollowClan(clanId: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getUserFollowedClans(userId: string, page?: number, limit?: number): Promise<{
        clans: ({
            _count: {
                followers: number;
            };
            creator: {
                id: string;
                wallet_address: string;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            description: string | null;
            logo_url: string;
            x_url: string | null;
            website_url: string | null;
            creator_id: string;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserCreatedClans(userId: string, page?: number, limit?: number): Promise<{
        clans: ({
            _count: {
                followers: number;
                missions: number;
            };
            creator: {
                id: string;
                wallet_address: string;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            description: string | null;
            logo_url: string;
            x_url: string | null;
            website_url: string | null;
            creator_id: string;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getClanFollowers(clanId: string, page?: number, limit?: number): Promise<{
        followers: {
            id: string;
            created_at: Date;
            wallet_address: string;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}

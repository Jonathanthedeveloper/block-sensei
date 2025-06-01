import { PrismaService } from 'nestjs-prisma';
import { CreateClanDto } from './dtos/create-clan.dto';
import { UpdateClanDto } from './dtos/update-clan.dto';
export declare class ClansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createClan(data: CreateClanDto, userId: string): Promise<{
        id: string;
        name: string;
        creator_id: string;
        logo_url: string;
        description: string | null;
        x_url: string | null;
        website_url: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getAllClans(page?: number, limit?: number): Promise<{
        clans: ({
            creator: {
                id: string;
                wallet_address: string;
            };
            _count: {
                followers: number;
                missions: number;
            };
        } & {
            id: string;
            name: string;
            creator_id: string;
            logo_url: string;
            description: string | null;
            x_url: string | null;
            website_url: string | null;
            created_at: Date;
            updated_at: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getClanById(id: string): Promise<{
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
            description: string | null;
            created_at: Date;
            updated_at: Date;
            clan_id: string;
            title: string;
            brief: string;
            status: import("@prisma/client").$Enums.MissionStatus;
        }[];
        _count: {
            followers: number;
            missions: number;
        };
    } & {
        id: string;
        name: string;
        creator_id: string;
        logo_url: string;
        description: string | null;
        x_url: string | null;
        website_url: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    updateClan(id: string, updateClanDto: UpdateClanDto, userId: string): Promise<{
        id: string;
        name: string;
        creator_id: string;
        logo_url: string;
        description: string | null;
        x_url: string | null;
        website_url: string | null;
        created_at: Date;
        updated_at: Date;
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
            creator: {
                id: string;
                wallet_address: string;
            };
            _count: {
                followers: number;
            };
        } & {
            id: string;
            name: string;
            creator_id: string;
            logo_url: string;
            description: string | null;
            x_url: string | null;
            website_url: string | null;
            created_at: Date;
            updated_at: Date;
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
            creator: {
                id: string;
                wallet_address: string;
            };
            _count: {
                followers: number;
            };
        } & {
            id: string;
            name: string;
            creator_id: string;
            logo_url: string;
            description: string | null;
            x_url: string | null;
            website_url: string | null;
            created_at: Date;
            updated_at: Date;
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

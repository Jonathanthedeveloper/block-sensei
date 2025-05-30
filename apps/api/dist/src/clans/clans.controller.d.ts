import { ClansService } from './clans.service';
import { CreateClanDto } from './dtos/create-clan.dto';
import { UpdateClanDto } from './dtos/update-clan.dto';
export declare class ClansController {
    private readonly clansService;
    constructor(clansService: ClansService);
    createClan(createClanDto: CreateClanDto, request: any): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        logo_url: string;
        description: string | null;
        x_url: string | null;
        website_url: string | null;
        creator_id: string;
    }>;
    getAllClans(page?: string, limit?: string): Promise<{
        clans: ({
            _count: {
                followers: number;
            };
            creator: {
                id: string;
                wallet_address: string;
            };
        } & {
            name: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            logo_url: string;
            description: string | null;
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
    } & {
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        logo_url: string;
        description: string | null;
        x_url: string | null;
        website_url: string | null;
        creator_id: string;
    }>;
    updateClan(id: string, updateClanDto: UpdateClanDto, request: any): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        logo_url: string;
        description: string | null;
        x_url: string | null;
        website_url: string | null;
        creator_id: string;
    }>;
    deleteClan(id: string, request: any): Promise<{
        message: string;
    }>;
    followClan(clanId: string, request: any): Promise<{
        success: boolean;
        message: string;
    }>;
    unfollowClan(clanId: string, request: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getClanFollowers(clanId: string, page?: string, limit?: string): Promise<{
        followers: {
            id: string;
            wallet_address: string;
            created_at: Date;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserFollowedClans(request: any, page?: string, limit?: string): Promise<{
        clans: ({
            _count: {
                followers: number;
            };
            creator: {
                id: string;
                wallet_address: string;
            };
        } & {
            name: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            logo_url: string;
            description: string | null;
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
    getUserCreatedClans(request: any, page?: string, limit?: string): Promise<{
        clans: ({
            _count: {
                followers: number;
            };
            creator: {
                id: string;
                wallet_address: string;
            };
        } & {
            name: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            logo_url: string;
            description: string | null;
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
}

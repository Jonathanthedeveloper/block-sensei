import { PrismaService } from 'nestjs-prisma';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(data: LoginDto): Promise<{
        session: {
            access_token: string;
            refresh_token: string;
        };
        user: {
            id: string;
            wallet_address: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    refreshAccessToken(data: RefreshTokenDto): Promise<{
        session: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getCurrentUser(userId: string): Promise<{
        created_clans: {
            name: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            creator_id: string;
            logo_url: string;
            description: string | null;
            x_url: string | null;
            website_url: string | null;
        }[];
        joined_clans: {
            id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            clan_id: string;
        }[];
        mission_participations: {
            id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            mission_id: string;
            status: import("@prisma/client").$Enums.MissionParticipationStatus;
            started_at: Date;
            completed_at: Date | null;
        }[];
    } & {
        id: string;
        wallet_address: string;
        created_at: Date;
        updated_at: Date;
    }>;
}

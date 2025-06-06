import { PrismaService } from 'nestjs-prisma';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SuiService } from 'src/sui/sui.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly suiService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, suiService: SuiService, configService: ConfigService);
    login(data: LoginDto): Promise<{
        session: {
            access_token: string;
            refresh_token: string;
        };
        user: {
            id: string;
            created_at: Date;
            updated_at: Date;
            wallet_address: string;
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
            description: string | null;
            created_at: Date;
            updated_at: Date;
            creator_id: string;
            logo_url: string;
            x_url: string | null;
            website_url: string | null;
        }[];
        joined_clans: {
            id: string;
            clan_id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
        }[];
        mission_participations: {
            id: string;
            status: import("@prisma/client").$Enums.MissionParticipationStatus;
            created_at: Date;
            updated_at: Date;
            mission_id: string;
            user_id: string;
            started_at: Date;
            completed_at: Date | null;
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        wallet_address: string;
    }>;
}

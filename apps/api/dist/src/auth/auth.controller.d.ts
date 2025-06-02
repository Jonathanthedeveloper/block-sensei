import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
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
    refreshAccessToken(body: RefreshTokenDto): Promise<{
        session: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getCurrentUser(request: any): Promise<{
        created_clans: {
            name: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            logo_url: string;
            description: string | null;
            x_url: string | null;
            website_url: string | null;
            creator_id: string;
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

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
            created_at: Date;
            updated_at: Date;
            wallet_address: string;
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

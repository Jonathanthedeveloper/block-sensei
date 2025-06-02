import { UpdateMissionRoundDto } from './update-mission-round-nested.dto';
export declare class UpdateMissionDto {
    title?: string;
    brief?: string;
    description?: string;
    clan_id?: string;
    mission_rounds?: UpdateMissionRoundDto[];
}

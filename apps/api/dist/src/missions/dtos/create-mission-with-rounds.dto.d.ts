import { CreateMissionRoundDto } from './create-mission-round.dto';
export declare class CreateMissionWithRoundsDto {
    title: string;
    brief: string;
    description?: string;
    clan_id: string;
    mission_rounds?: CreateMissionRoundDto[];
}

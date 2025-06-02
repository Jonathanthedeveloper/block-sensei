import { CreateQuizDto } from './create-quiz.dto';
import { CreateRewardDto } from './create-reward.dto';
export declare class UpdateQuestWithRewardDto {
    type?: 'QUIZ';
    description?: string;
    reward?: CreateRewardDto;
    quiz?: CreateQuizDto[];
}
export declare class UpdateMissionRoundDto {
    id?: string;
    title?: string;
    content?: string;
    welcome_message?: string;
    introduction?: string;
    quest?: UpdateQuestWithRewardDto;
    _action?: 'create' | 'update' | 'delete';
}

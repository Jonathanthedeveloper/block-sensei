import { CreateRewardDto } from './create-reward.dto';
import { CreateQuizDto } from './create-quiz.dto';
export declare class CreateQuestWithRewardDto {
    type: 'QUIZ';
    description: string;
    reward: CreateRewardDto;
    quiz: CreateQuizDto[];
}
export declare class CreateMissionRoundDto {
    title: string;
    content: string;
    welcome_message: string;
    introduction: string;
    quest?: CreateQuestWithRewardDto;
}

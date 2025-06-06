export declare class QuizAnswerDto {
    quest_quiz_id: string;
    user_answer: string;
}
export declare class CompleteRoundDto {
    mission_round_id: string;
    quiz_answers: QuizAnswerDto[];
}

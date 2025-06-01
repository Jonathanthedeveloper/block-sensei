import { PrismaService } from 'nestjs-prisma';
import { UpdateMissionDto } from './dtos/update-mission.dto';
import { CreateMissionWithRoundsDto } from './dtos/create-mission-with-rounds.dto';
import { StartMissionDto } from './dtos/start-mission.dto';
import { StartRoundDto } from './dtos/start-round.dto';
import { CompleteRoundDto } from './dtos/complete-round.dto';
export declare class MissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMissionWithRounds(data: CreateMissionWithRoundsDto): Promise<({
        clan: {
            name: string;
            id: string;
            logo_url: string;
            creator: {
                id: string;
                wallet_address: string;
            };
        } | null;
        mission_rounds: ({
            quest: ({
                reward: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    token: string;
                    amount: number;
                };
                quiz: {
                    id: string;
                    created_at: Date;
                    question: string;
                    options: string;
                    answer: string;
                    quest_id: string;
                    updated_At: Date;
                }[];
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                description: string;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            content: string;
            welcome_message: string;
            introduction: string;
            mission_id: string;
            quest_id: string | null;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        clan_id: string;
        title: string;
        brief: string;
        status: import("@prisma/client").$Enums.MissionStatus;
    }) | null>;
    getAllMissions(page?: number, limit?: number): Promise<{
        missions: ({
            clan: {
                name: string;
                id: string;
                logo_url: string;
                creator: {
                    id: string;
                    wallet_address: string;
                };
            } | null;
            mission_rounds: ({
                quest: ({
                    reward: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        token: string;
                        amount: number;
                    };
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    description: string;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            })[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
            clan_id: string;
            title: string;
            brief: string;
            status: import("@prisma/client").$Enums.MissionStatus;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getMissionById(id: string): Promise<{
        clan: {
            name: string;
            id: string;
            logo_url: string;
            creator: {
                id: string;
                wallet_address: string;
            };
        } | null;
        mission_rounds: ({
            quest: ({
                reward: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    token: string;
                    amount: number;
                };
                quiz: {
                    id: string;
                    created_at: Date;
                    question: string;
                    options: string;
                    answer: string;
                    quest_id: string;
                    updated_At: Date;
                }[];
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                description: string;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            content: string;
            welcome_message: string;
            introduction: string;
            mission_id: string;
            quest_id: string | null;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        clan_id: string;
        title: string;
        brief: string;
        status: import("@prisma/client").$Enums.MissionStatus;
    }>;
    updateMission(id: string, data: UpdateMissionDto): Promise<({
        clan: {
            name: string;
            id: string;
            logo_url: string;
            creator: {
                id: string;
                wallet_address: string;
            };
        } | null;
        mission_rounds: ({
            quest: ({
                reward: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    token: string;
                    amount: number;
                };
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                description: string;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            content: string;
            welcome_message: string;
            introduction: string;
            mission_id: string;
            quest_id: string | null;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string | null;
        clan_id: string;
        title: string;
        brief: string;
        status: import("@prisma/client").$Enums.MissionStatus;
    }) | null>;
    deleteMission(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getMissionsByClan(clanId: string, page?: number, limit?: number): Promise<{
        missions: ({
            clan: {
                name: string;
                id: string;
                logo_url: string;
                creator: {
                    id: string;
                    wallet_address: string;
                };
            } | null;
            mission_rounds: ({
                quest: ({
                    reward: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        token: string;
                        amount: number;
                    };
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    description: string;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            })[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
            clan_id: string;
            title: string;
            brief: string;
            status: import("@prisma/client").$Enums.MissionStatus;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    startMission(userId: string, data: StartMissionDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        mission_id: string;
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        started_at: Date;
        completed_at: Date | null;
    }>;
    startRound(userId: string, data: StartRoundDto): Promise<{
        participation: {
            id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            mission_id: string;
            status: import("@prisma/client").$Enums.MissionParticipationStatus;
            started_at: Date;
            completed_at: Date | null;
        };
        mission_round: {
            quest: ({
                reward: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    token: string;
                    amount: number;
                };
                quiz: {
                    id: string;
                    created_at: Date;
                    question: string;
                    options: string;
                    answer: string;
                    quest_id: string;
                    updated_At: Date;
                }[];
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                description: string;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            content: string;
            welcome_message: string;
            introduction: string;
            mission_id: string;
            quest_id: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        mission_round_id: string;
        status: import("@prisma/client").$Enums.RoundCompletionStatus;
        started_at: Date | null;
        completed_at: Date | null;
        participation_id: string;
    }>;
    completeRound(userId: string, data: CompleteRoundDto): Promise<{
        roundProgress: {
            participation: {
                mission: {
                    mission_rounds: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        title: string;
                        content: string;
                        welcome_message: string;
                        introduction: string;
                        mission_id: string;
                        quest_id: string | null;
                    }[];
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    description: string | null;
                    clan_id: string;
                    title: string;
                    brief: string;
                    status: import("@prisma/client").$Enums.MissionStatus;
                };
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                user_id: string;
                mission_id: string;
                status: import("@prisma/client").$Enums.MissionParticipationStatus;
                started_at: Date;
                completed_at: Date | null;
            };
            quest_answers: {
                id: string;
                created_at: Date;
                updated_at: Date;
                quest_quiz_id: string;
                user_answer: string;
                round_progress_id: string;
                is_correct: boolean;
                answered_at: Date;
            }[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            mission_round_id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
        };
        questType: import("@prisma/client").$Enums.QuestType;
        completionStatus: "COMPLETED" | "FAILED";
        missionCompleted: boolean;
        questAnswers: any[];
    }>;
    private handleQuizCompletion;
    getUserMissionProgress(userId: string, missionId: string): Promise<{
        mission: {
            clan: {
                name: string;
                id: string;
                logo_url: string;
            } | null;
            mission_rounds: ({
                quest: ({
                    reward: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        token: string;
                        amount: number;
                    };
                    quiz: {
                        id: string;
                        created_at: Date;
                        question: string;
                        options: string;
                        answer: string;
                        quest_id: string;
                        updated_At: Date;
                    }[];
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    description: string;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            })[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
            clan_id: string;
            title: string;
            brief: string;
            status: import("@prisma/client").$Enums.MissionStatus;
        };
        round_progress: ({
            mission_round: {
                quest: ({
                    reward: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        token: string;
                        amount: number;
                    };
                    quiz: {
                        id: string;
                        created_at: Date;
                        question: string;
                        options: string;
                        answer: string;
                        quest_id: string;
                        updated_At: Date;
                    }[];
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    description: string;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            };
            quest_answers: {
                id: string;
                created_at: Date;
                updated_at: Date;
                quest_quiz_id: string;
                user_answer: string;
                round_progress_id: string;
                is_correct: boolean;
                answered_at: Date;
            }[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            mission_round_id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        mission_id: string;
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        started_at: Date;
        completed_at: Date | null;
    }>;
    getUserMissions(userId: string, page?: number, limit?: number): Promise<{
        participations: ({
            mission: {
                clan: {
                    name: string;
                    id: string;
                    logo_url: string;
                } | null;
                mission_rounds: ({
                    quest: ({
                        reward: {
                            id: string;
                            created_at: Date;
                            updated_at: Date;
                            token: string;
                            amount: number;
                        };
                    } & {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        type: import("@prisma/client").$Enums.QuestType;
                        description: string;
                        reward_id: string;
                    }) | null;
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    title: string;
                    content: string;
                    welcome_message: string;
                    introduction: string;
                    mission_id: string;
                    quest_id: string | null;
                })[];
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                description: string | null;
                clan_id: string;
                title: string;
                brief: string;
                status: import("@prisma/client").$Enums.MissionStatus;
            };
            round_progress: ({
                mission_round: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    title: string;
                    content: string;
                    welcome_message: string;
                    introduction: string;
                    mission_id: string;
                    quest_id: string | null;
                };
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                mission_round_id: string;
                status: import("@prisma/client").$Enums.RoundCompletionStatus;
                started_at: Date | null;
                completed_at: Date | null;
                participation_id: string;
            })[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            user_id: string;
            mission_id: string;
            status: import("@prisma/client").$Enums.MissionParticipationStatus;
            started_at: Date;
            completed_at: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getMissionLeaderboard(missionId: string, page?: number, limit?: number): Promise<{
        leaderboard: {
            rank: number;
            user: {
                id: string;
                wallet_address: string;
            };
            completed_at: Date | null;
            score: number;
            total_questions: number;
            correct_answers: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserCompletedMissions(userId: string): Promise<({
        mission: {
            clan: {
                name: string;
                id: string;
                logo_url: string;
            } | null;
            mission_rounds: ({
                quest: ({
                    reward: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        token: string;
                        amount: number;
                    };
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    description: string;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            })[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
            clan_id: string;
            title: string;
            brief: string;
            status: import("@prisma/client").$Enums.MissionStatus;
        };
        round_progress: ({
            mission_round: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            mission_round_id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        mission_id: string;
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        started_at: Date;
        completed_at: Date | null;
    })[]>;
    getUserParticipatedMissions(userId: string): Promise<({
        mission: {
            clan: {
                name: string;
                id: string;
                logo_url: string;
            } | null;
            mission_rounds: ({
                quest: ({
                    reward: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        token: string;
                        amount: number;
                    };
                } & {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    description: string;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            })[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            description: string | null;
            clan_id: string;
            title: string;
            brief: string;
            status: import("@prisma/client").$Enums.MissionStatus;
        };
        round_progress: ({
            mission_round: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                content: string;
                welcome_message: string;
                introduction: string;
                mission_id: string;
                quest_id: string | null;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            mission_round_id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        mission_id: string;
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        started_at: Date;
        completed_at: Date | null;
    })[]>;
}

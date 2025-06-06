import { PrismaService } from 'nestjs-prisma';
import { UpdateMissionDto } from './dtos/update-mission.dto';
import { CreateMissionWithRoundsDto } from './dtos/create-mission-with-rounds.dto';
import { StartMissionDto } from './dtos/start-mission.dto';
import { StartRoundDto } from './dtos/start-round.dto';
import { CompleteRoundDto } from './dtos/complete-round.dto';
import { SuiService } from 'src/sui/sui.service';
export declare class MissionsService {
    private readonly prisma;
    private readonly suiService;
    constructor(prisma: PrismaService, suiService: SuiService);
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
                    amount: number;
                    token: string;
                };
                quiz: {
                    id: string;
                    created_at: Date;
                    quest_id: string;
                    question: string;
                    options: string;
                    answer: string;
                    updated_At: Date;
                }[];
            } & {
                id: string;
                description: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            title: string;
            created_at: Date;
            updated_at: Date;
            mission_id: string;
            quest_id: string | null;
            content: string;
            welcome_message: string;
            introduction: string;
        })[];
    } & {
        id: string;
        title: string;
        brief: string;
        description: string | null;
        status: import("@prisma/client").$Enums.MissionStatus;
        clan_id: string;
        created_at: Date;
        updated_at: Date;
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
                        amount: number;
                        token: string;
                    };
                } & {
                    id: string;
                    description: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            })[];
        } & {
            id: string;
            title: string;
            brief: string;
            description: string | null;
            status: import("@prisma/client").$Enums.MissionStatus;
            clan_id: string;
            created_at: Date;
            updated_at: Date;
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
                    amount: number;
                    token: string;
                };
                quiz: {
                    id: string;
                    created_at: Date;
                    quest_id: string;
                    question: string;
                    options: string;
                    answer: string;
                    updated_At: Date;
                }[];
            } & {
                id: string;
                description: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            title: string;
            created_at: Date;
            updated_at: Date;
            mission_id: string;
            quest_id: string | null;
            content: string;
            welcome_message: string;
            introduction: string;
        })[];
    } & {
        id: string;
        title: string;
        brief: string;
        description: string | null;
        status: import("@prisma/client").$Enums.MissionStatus;
        clan_id: string;
        created_at: Date;
        updated_at: Date;
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
                    amount: number;
                    token: string;
                };
            } & {
                id: string;
                description: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            title: string;
            created_at: Date;
            updated_at: Date;
            mission_id: string;
            quest_id: string | null;
            content: string;
            welcome_message: string;
            introduction: string;
        })[];
    } & {
        id: string;
        title: string;
        brief: string;
        description: string | null;
        status: import("@prisma/client").$Enums.MissionStatus;
        clan_id: string;
        created_at: Date;
        updated_at: Date;
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
                        amount: number;
                        token: string;
                    };
                } & {
                    id: string;
                    description: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            })[];
        } & {
            id: string;
            title: string;
            brief: string;
            description: string | null;
            status: import("@prisma/client").$Enums.MissionStatus;
            clan_id: string;
            created_at: Date;
            updated_at: Date;
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
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        created_at: Date;
        updated_at: Date;
        mission_id: string;
        user_id: string;
        started_at: Date;
        completed_at: Date | null;
    }>;
    startRound(userId: string, data: StartRoundDto): Promise<{
        mission_round: {
            quest: ({
                reward: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    amount: number;
                    token: string;
                };
                quiz: {
                    id: string;
                    created_at: Date;
                    quest_id: string;
                    question: string;
                    options: string;
                    answer: string;
                    updated_At: Date;
                }[];
            } & {
                id: string;
                description: string;
                created_at: Date;
                updated_at: Date;
                type: import("@prisma/client").$Enums.QuestType;
                reward_id: string;
            }) | null;
        } & {
            id: string;
            title: string;
            created_at: Date;
            updated_at: Date;
            mission_id: string;
            quest_id: string | null;
            content: string;
            welcome_message: string;
            introduction: string;
        };
        participation: {
            id: string;
            status: import("@prisma/client").$Enums.MissionParticipationStatus;
            created_at: Date;
            updated_at: Date;
            mission_id: string;
            user_id: string;
            started_at: Date;
            completed_at: Date | null;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.RoundCompletionStatus;
        created_at: Date;
        updated_at: Date;
        started_at: Date | null;
        completed_at: Date | null;
        participation_id: string;
        mission_round_id: string;
    }>;
    completeRound(userId: string, data: CompleteRoundDto): Promise<{
        roundProgress: {
            quest_answers: {
                id: string;
                created_at: Date;
                updated_at: Date;
                round_progress_id: string;
                quest_quiz_id: string;
                user_answer: string;
                is_correct: boolean;
                answered_at: Date;
            }[];
            participation: {
                mission: {
                    mission_rounds: {
                        id: string;
                        title: string;
                        created_at: Date;
                        updated_at: Date;
                        mission_id: string;
                        quest_id: string | null;
                        content: string;
                        welcome_message: string;
                        introduction: string;
                    }[];
                } & {
                    id: string;
                    title: string;
                    brief: string;
                    description: string | null;
                    status: import("@prisma/client").$Enums.MissionStatus;
                    clan_id: string;
                    created_at: Date;
                    updated_at: Date;
                };
            } & {
                id: string;
                status: import("@prisma/client").$Enums.MissionParticipationStatus;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                user_id: string;
                started_at: Date;
                completed_at: Date | null;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            created_at: Date;
            updated_at: Date;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
            mission_round_id: string;
        };
        questType: import("@prisma/client").$Enums.QuestType;
        completionStatus: "COMPLETED";
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
                        amount: number;
                        token: string;
                    };
                    quiz: {
                        id: string;
                        created_at: Date;
                        quest_id: string;
                        question: string;
                        options: string;
                        answer: string;
                        updated_At: Date;
                    }[];
                } & {
                    id: string;
                    description: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            })[];
        } & {
            id: string;
            title: string;
            brief: string;
            description: string | null;
            status: import("@prisma/client").$Enums.MissionStatus;
            clan_id: string;
            created_at: Date;
            updated_at: Date;
        };
        round_progress: ({
            mission_round: {
                quest: ({
                    reward: {
                        id: string;
                        created_at: Date;
                        updated_at: Date;
                        amount: number;
                        token: string;
                    };
                    quiz: {
                        id: string;
                        created_at: Date;
                        quest_id: string;
                        question: string;
                        options: string;
                        answer: string;
                        updated_At: Date;
                    }[];
                } & {
                    id: string;
                    description: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            };
            quest_answers: {
                id: string;
                created_at: Date;
                updated_at: Date;
                round_progress_id: string;
                quest_quiz_id: string;
                user_answer: string;
                is_correct: boolean;
                answered_at: Date;
            }[];
        } & {
            id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            created_at: Date;
            updated_at: Date;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
            mission_round_id: string;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        created_at: Date;
        updated_at: Date;
        mission_id: string;
        user_id: string;
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
                            amount: number;
                            token: string;
                        };
                    } & {
                        id: string;
                        description: string;
                        created_at: Date;
                        updated_at: Date;
                        type: import("@prisma/client").$Enums.QuestType;
                        reward_id: string;
                    }) | null;
                } & {
                    id: string;
                    title: string;
                    created_at: Date;
                    updated_at: Date;
                    mission_id: string;
                    quest_id: string | null;
                    content: string;
                    welcome_message: string;
                    introduction: string;
                })[];
            } & {
                id: string;
                title: string;
                brief: string;
                description: string | null;
                status: import("@prisma/client").$Enums.MissionStatus;
                clan_id: string;
                created_at: Date;
                updated_at: Date;
            };
            round_progress: ({
                mission_round: {
                    id: string;
                    title: string;
                    created_at: Date;
                    updated_at: Date;
                    mission_id: string;
                    quest_id: string | null;
                    content: string;
                    welcome_message: string;
                    introduction: string;
                };
            } & {
                id: string;
                status: import("@prisma/client").$Enums.RoundCompletionStatus;
                created_at: Date;
                updated_at: Date;
                started_at: Date | null;
                completed_at: Date | null;
                participation_id: string;
                mission_round_id: string;
            })[];
        } & {
            id: string;
            status: import("@prisma/client").$Enums.MissionParticipationStatus;
            created_at: Date;
            updated_at: Date;
            mission_id: string;
            user_id: string;
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
                        amount: number;
                        token: string;
                    };
                } & {
                    id: string;
                    description: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            })[];
        } & {
            id: string;
            title: string;
            brief: string;
            description: string | null;
            status: import("@prisma/client").$Enums.MissionStatus;
            clan_id: string;
            created_at: Date;
            updated_at: Date;
        };
        round_progress: ({
            mission_round: {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            created_at: Date;
            updated_at: Date;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
            mission_round_id: string;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        created_at: Date;
        updated_at: Date;
        mission_id: string;
        user_id: string;
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
                        amount: number;
                        token: string;
                    };
                } & {
                    id: string;
                    description: string;
                    created_at: Date;
                    updated_at: Date;
                    type: import("@prisma/client").$Enums.QuestType;
                    reward_id: string;
                }) | null;
            } & {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            })[];
        } & {
            id: string;
            title: string;
            brief: string;
            description: string | null;
            status: import("@prisma/client").$Enums.MissionStatus;
            clan_id: string;
            created_at: Date;
            updated_at: Date;
        };
        round_progress: ({
            mission_round: {
                id: string;
                title: string;
                created_at: Date;
                updated_at: Date;
                mission_id: string;
                quest_id: string | null;
                content: string;
                welcome_message: string;
                introduction: string;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.RoundCompletionStatus;
            created_at: Date;
            updated_at: Date;
            started_at: Date | null;
            completed_at: Date | null;
            participation_id: string;
            mission_round_id: string;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.MissionParticipationStatus;
        created_at: Date;
        updated_at: Date;
        mission_id: string;
        user_id: string;
        started_at: Date;
        completed_at: Date | null;
    })[]>;
}

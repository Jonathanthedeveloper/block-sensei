"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let MissionsService = class MissionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMissionWithRounds(data) {
        const clan = await this.prisma.clan.findUnique({
            where: { id: data.clan_id },
        });
        if (!clan) {
            throw new common_1.NotFoundException('Clan not found');
        }
        return this.prisma.$transaction(async (prisma) => {
            const mission = await prisma.mission.create({
                data: {
                    title: data.title,
                    brief: data.brief,
                    description: data.description,
                    clan_id: data.clan_id,
                },
            });
            if (data.mission_rounds && data.mission_rounds.length > 0) {
                for (const roundData of data.mission_rounds) {
                    let questId = null;
                    if (roundData.quest) {
                        const reward = await prisma.reward.create({
                            data: {
                                amount: roundData.quest.reward.amount,
                                token: roundData.quest.reward.token,
                            },
                        });
                        const quest = await prisma.quest.create({
                            data: {
                                type: roundData.quest.type,
                                description: roundData.quest.description,
                                reward_id: reward.id,
                            },
                        });
                        questId = quest.id;
                        if (roundData.quest.quiz && roundData.quest.quiz.length > 0) {
                            for (const quizData of roundData.quest.quiz) {
                                await prisma.questQuiz.create({
                                    data: {
                                        quest_id: quest.id,
                                        question: quizData.question,
                                        options: JSON.stringify(quizData.options),
                                        answer: quizData.answer,
                                    },
                                });
                            }
                        }
                    }
                    await prisma.missionRound.create({
                        data: {
                            title: roundData.title,
                            content: roundData.content,
                            welcome_message: roundData.welcome_message,
                            introduction: roundData.introduction,
                            mission_id: mission.id,
                            quest_id: questId,
                        },
                    });
                }
            }
            return prisma.mission.findUnique({
                where: { id: mission.id },
                include: {
                    clan: {
                        select: {
                            id: true,
                            name: true,
                            logo_url: true,
                            creator: {
                                select: {
                                    id: true,
                                    wallet_address: true,
                                },
                            },
                        },
                    },
                    mission_rounds: {
                        include: {
                            quest: {
                                include: {
                                    reward: true,
                                    quiz: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    async getAllMissions(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [missions, total] = await Promise.all([
            this.prisma.mission.findMany({
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    clan: {
                        select: {
                            id: true,
                            name: true,
                            logo_url: true,
                            creator: {
                                select: {
                                    id: true,
                                    wallet_address: true,
                                },
                            },
                        },
                    },
                    mission_rounds: {
                        include: {
                            quest: {
                                include: {
                                    reward: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.mission.count(),
        ]);
        return {
            missions,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getMissionById(id) {
        const mission = await this.prisma.mission.findUnique({
            where: { id },
            include: {
                clan: {
                    select: {
                        id: true,
                        name: true,
                        logo_url: true,
                        creator: {
                            select: {
                                id: true,
                                wallet_address: true,
                            },
                        },
                    },
                },
                mission_rounds: {
                    include: {
                        quest: {
                            include: {
                                quiz: true,
                                reward: true,
                            },
                        },
                    },
                },
            },
        });
        if (!mission) {
            throw new common_1.NotFoundException('Mission not found');
        }
        return mission;
    }
    async updateMission(id, data) {
        const mission = await this.prisma.mission.findUnique({
            where: { id },
            include: {
                mission_rounds: {
                    include: {
                        quest: {
                            include: {
                                reward: true,
                            },
                        },
                    },
                },
            },
        });
        if (!mission) {
            throw new common_1.NotFoundException('Mission not found');
        }
        if (data.clan_id) {
            const clan = await this.prisma.clan.findUnique({
                where: { id: data.clan_id },
            });
            if (!clan) {
                throw new common_1.NotFoundException('Clan not found');
            }
        }
        return this.prisma.$transaction(async (prisma) => {
            const updatedMission = await prisma.mission.update({
                where: { id },
                data: {
                    title: data.title,
                    brief: data.brief,
                    description: data.description,
                    clan_id: data.clan_id,
                },
            });
            if (data.mission_rounds) {
                for (const roundData of data.mission_rounds) {
                    if (roundData._action === 'delete' && roundData.id) {
                        const existingRound = await prisma.missionRound.findUnique({
                            where: { id: roundData.id },
                            include: { quest: { include: { reward: true } } },
                        });
                        if (existingRound) {
                            if (existingRound.quest) {
                                await prisma.questQuiz.deleteMany({
                                    where: { quest_id: existingRound.quest.id },
                                });
                                await prisma.quest.delete({
                                    where: { id: existingRound.quest.id },
                                });
                                if (existingRound.quest.reward) {
                                    await prisma.reward.delete({
                                        where: { id: existingRound.quest.reward.id },
                                    });
                                }
                            }
                            await prisma.missionRound.delete({
                                where: { id: roundData.id },
                            });
                        }
                    }
                    else if (roundData._action === 'create') {
                        let questId = null;
                        if (roundData.quest) {
                            const reward = await prisma.reward.create({
                                data: {
                                    amount: roundData.quest.reward?.amount || 0,
                                    token: roundData.quest.reward?.token || '',
                                },
                            });
                            const quest = await prisma.quest.create({
                                data: {
                                    type: roundData.quest.type || 'QUIZ',
                                    description: roundData.quest.description || '',
                                    reward_id: reward.id,
                                },
                            });
                            questId = quest.id;
                            if (roundData.quest.quiz && roundData.quest.quiz.length > 0) {
                                for (const quizData of roundData.quest.quiz) {
                                    await prisma.questQuiz.create({
                                        data: {
                                            quest_id: quest.id,
                                            question: quizData.question,
                                            options: JSON.stringify(quizData.options),
                                            answer: quizData.answer,
                                        },
                                    });
                                }
                            }
                        }
                        await prisma.missionRound.create({
                            data: {
                                title: roundData.title || '',
                                content: roundData.content || '',
                                welcome_message: roundData.welcome_message || '',
                                introduction: roundData.introduction || '',
                                mission_id: updatedMission.id,
                                quest_id: questId,
                            },
                        });
                    }
                    else if (roundData._action === 'update' && roundData.id) {
                        const existingRound = await prisma.missionRound.findUnique({
                            where: { id: roundData.id },
                            include: { quest: { include: { reward: true } } },
                        });
                        if (existingRound) {
                            await prisma.missionRound.update({
                                where: { id: roundData.id },
                                data: {
                                    title: roundData.title,
                                    content: roundData.content,
                                    welcome_message: roundData.welcome_message,
                                    introduction: roundData.introduction,
                                },
                            });
                            if (roundData.quest && existingRound.quest) {
                                if (roundData.quest.reward) {
                                    await prisma.reward.update({
                                        where: { id: existingRound.quest.reward.id },
                                        data: {
                                            amount: roundData.quest.reward.amount,
                                            token: roundData.quest.reward.token,
                                        },
                                    });
                                }
                                await prisma.quest.update({
                                    where: { id: existingRound.quest.id },
                                    data: {
                                        type: roundData.quest.type,
                                        description: roundData.quest.description,
                                    },
                                });
                                if (roundData.quest.quiz) {
                                    await prisma.questQuiz.deleteMany({
                                        where: { quest_id: existingRound.quest.id },
                                    });
                                    for (const quizData of roundData.quest.quiz) {
                                        await prisma.questQuiz.create({
                                            data: {
                                                quest_id: existingRound.quest.id,
                                                question: quizData.question,
                                                options: JSON.stringify(quizData.options),
                                                answer: quizData.answer,
                                            },
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return prisma.mission.findUnique({
                where: { id: updatedMission.id },
                include: {
                    clan: {
                        select: {
                            id: true,
                            name: true,
                            logo_url: true,
                            creator: {
                                select: {
                                    id: true,
                                    wallet_address: true,
                                },
                            },
                        },
                    },
                    mission_rounds: {
                        include: {
                            quest: {
                                include: {
                                    reward: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    async deleteMission(id) {
        const mission = await this.prisma.mission.findUnique({
            where: { id },
            include: {
                mission_rounds: {
                    include: {
                        quest: {
                            include: {
                                reward: true,
                                quiz: true,
                            },
                        },
                    },
                },
            },
        });
        if (!mission) {
            throw new common_1.NotFoundException('Mission not found');
        }
        return this.prisma.$transaction(async (prisma) => {
            for (const round of mission.mission_rounds) {
                if (round.quest) {
                    await prisma.questQuiz.deleteMany({
                        where: { quest_id: round.quest.id },
                    });
                    await prisma.quest.delete({
                        where: { id: round.quest.id },
                    });
                    if (round.quest.reward) {
                        await prisma.reward.delete({
                            where: { id: round.quest.reward.id },
                        });
                    }
                }
                await prisma.missionRound.delete({
                    where: { id: round.id },
                });
            }
            await prisma.mission.delete({
                where: { id },
            });
            return { success: true, message: 'Mission deleted successfully' };
        });
    }
    async getMissionsByClan(clanId, page = 1, limit = 10) {
        const clan = await this.prisma.clan.findUnique({
            where: { id: clanId },
        });
        if (!clan) {
            throw new common_1.NotFoundException('Clan not found');
        }
        const skip = (page - 1) * limit;
        const [missions, total] = await Promise.all([
            this.prisma.mission.findMany({
                where: { clan_id: clanId },
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    clan: {
                        select: {
                            id: true,
                            name: true,
                            logo_url: true,
                            creator: {
                                select: {
                                    id: true,
                                    wallet_address: true,
                                },
                            },
                        },
                    },
                    mission_rounds: {
                        include: {
                            quest: {
                                include: {
                                    reward: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.mission.count({
                where: { clan_id: clanId },
            }),
        ]);
        return {
            missions,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async startMission(userId, data) {
        const mission = await this.prisma.mission.findUnique({
            where: { id: data.mission_id },
            include: {
                mission_rounds: true,
            },
        });
        if (!mission) {
            throw new common_1.NotFoundException('Mission not found');
        }
        const existingParticipation = await this.prisma.missionParticipation.findUnique({
            where: {
                user_id_mission_id: {
                    user_id: userId,
                    mission_id: data.mission_id,
                },
            },
        });
        if (existingParticipation) {
            throw new common_1.BadRequestException('User has already started this mission');
        }
        return this.prisma.$transaction(async (prisma) => {
            const participation = await prisma.missionParticipation.create({
                data: {
                    user_id: userId,
                    mission_id: data.mission_id,
                    status: 'STARTED',
                },
            });
            for (const round of mission.mission_rounds) {
                await prisma.roundProgress.create({
                    data: {
                        participation_id: participation.id,
                        mission_round_id: round.id,
                        status: 'NOT_STARTED',
                    },
                });
            }
            return participation;
        });
    }
    async startRound(userId, data) {
        const roundProgress = await this.prisma.roundProgress.findFirst({
            where: {
                mission_round_id: data.mission_round_id,
                participation: {
                    user_id: userId,
                },
            },
            include: {
                participation: true,
                mission_round: {
                    include: {
                        quest: {
                            include: {
                                quiz: true,
                            },
                        },
                    },
                },
            },
        });
        if (!roundProgress) {
            throw new common_1.NotFoundException('Round progress not found. User must start the mission first.');
        }
        if (roundProgress.status !== 'NOT_STARTED') {
            throw new common_1.BadRequestException('Round has already been started or completed');
        }
        const updatedProgress = await this.prisma.roundProgress.update({
            where: { id: roundProgress.id },
            data: {
                status: 'IN_PROGRESS',
                started_at: new Date(),
            },
            include: {
                participation: true,
                mission_round: {
                    include: {
                        quest: {
                            include: {
                                quiz: true,
                                reward: true,
                            },
                        },
                    },
                },
            },
        });
        await this.prisma.missionParticipation.update({
            where: { id: roundProgress.participation.id },
            data: { status: 'IN_PROGRESS' },
        });
        return updatedProgress;
    }
    async completeRound(userId, data) {
        const roundProgress = await this.prisma.roundProgress.findFirst({
            where: {
                mission_round_id: data.mission_round_id,
                participation: {
                    user_id: userId,
                },
            },
            include: {
                participation: true,
                mission_round: {
                    include: {
                        quest: {
                            include: {
                                quiz: true,
                                reward: true,
                            },
                        },
                    },
                },
            },
        });
        if (!roundProgress) {
            throw new common_1.NotFoundException('Round progress not found');
        }
        if (roundProgress.status !== 'IN_PROGRESS') {
            throw new common_1.BadRequestException('Round must be in progress to complete');
        }
        const quest = roundProgress.mission_round.quest;
        if (!quest) {
            throw new common_1.NotFoundException('Quest not found for this round');
        }
        return this.prisma.$transaction(async (prisma) => {
            let completionStatus = 'COMPLETED';
            let questAnswers = [];
            if (quest.type === 'QUIZ') {
                const result = await this.handleQuizCompletion(prisma, roundProgress, quest, data.quiz_answers || []);
                completionStatus = result.allCorrect ? 'COMPLETED' : 'FAILED';
                questAnswers = result.questAnswers;
            }
            else {
                completionStatus = 'COMPLETED';
            }
            const updatedProgress = await prisma.roundProgress.update({
                where: { id: roundProgress.id },
                data: {
                    status: completionStatus,
                    completed_at: new Date(),
                },
                include: {
                    participation: {
                        include: {
                            mission: {
                                include: {
                                    mission_rounds: true,
                                },
                            },
                        },
                    },
                    quest_answers: true,
                },
            });
            const allRoundsProgress = await prisma.roundProgress.findMany({
                where: {
                    participation_id: roundProgress.participation.id,
                },
            });
            const allRoundsCompleted = allRoundsProgress.every((rp) => rp.status === 'COMPLETED');
            if (allRoundsCompleted) {
                await prisma.missionParticipation.update({
                    where: { id: roundProgress.participation.id },
                    data: {
                        status: 'COMPLETED',
                        completed_at: new Date(),
                    },
                });
            }
            return {
                roundProgress: updatedProgress,
                questType: quest.type,
                completionStatus,
                missionCompleted: allRoundsCompleted,
                questAnswers,
            };
        });
    }
    async handleQuizCompletion(prisma, roundProgress, quest, quizAnswers) {
        let allCorrect = true;
        const questAnswers = [];
        if (!quest.quiz || quest.quiz.length === 0) {
            throw new common_1.BadRequestException('No quiz questions found for this quest');
        }
        if (quizAnswers.length === 0) {
            throw new common_1.BadRequestException('Quiz answers are required for quiz quests');
        }
        for (const answerData of quizAnswers) {
            const quizQuestion = quest.quiz.find((q) => q.id === answerData.quest_quiz_id);
            if (!quizQuestion) {
                throw new common_1.NotFoundException(`Quiz question ${answerData.quest_quiz_id} not found`);
            }
            const isCorrect = quizQuestion.answer === answerData.user_answer;
            if (!isCorrect) {
                allCorrect = false;
            }
            const questAnswer = await prisma.questAnswer.create({
                data: {
                    round_progress_id: roundProgress.id,
                    quest_quiz_id: answerData.quest_quiz_id,
                    user_answer: answerData.user_answer,
                    is_correct: isCorrect,
                },
            });
            questAnswers.push(questAnswer);
        }
        return { allCorrect, questAnswers };
    }
    async getUserMissionProgress(userId, missionId) {
        const participation = await this.prisma.missionParticipation.findUnique({
            where: {
                user_id_mission_id: {
                    user_id: userId,
                    mission_id: missionId,
                },
            },
            include: {
                mission: {
                    include: {
                        clan: {
                            select: {
                                id: true,
                                name: true,
                                logo_url: true,
                            },
                        },
                        mission_rounds: {
                            include: {
                                quest: {
                                    include: {
                                        reward: true,
                                        quiz: true,
                                    },
                                },
                            },
                        },
                    },
                },
                round_progress: {
                    include: {
                        mission_round: {
                            include: {
                                quest: {
                                    include: {
                                        reward: true,
                                        quiz: true,
                                    },
                                },
                            },
                        },
                        quest_answers: true,
                    },
                    orderBy: {
                        created_at: 'asc',
                    },
                },
            },
        });
        if (!participation) {
            throw new common_1.NotFoundException('Mission participation not found');
        }
        return participation;
    }
    async getUserMissions(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [participations, total] = await Promise.all([
            this.prisma.missionParticipation.findMany({
                where: { user_id: userId },
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    mission: {
                        include: {
                            clan: {
                                select: {
                                    id: true,
                                    name: true,
                                    logo_url: true,
                                },
                            },
                            mission_rounds: {
                                include: {
                                    quest: {
                                        include: {
                                            reward: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    round_progress: {
                        include: {
                            mission_round: true,
                        },
                    },
                },
            }),
            this.prisma.missionParticipation.count({
                where: { user_id: userId },
            }),
        ]);
        return {
            participations,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getMissionLeaderboard(missionId, page = 1, limit = 10) {
        const mission = await this.prisma.mission.findUnique({
            where: { id: missionId },
        });
        if (!mission) {
            throw new common_1.NotFoundException('Mission not found');
        }
        const skip = (page - 1) * limit;
        const [participations, total] = await Promise.all([
            this.prisma.missionParticipation.findMany({
                where: {
                    mission_id: missionId,
                    status: 'COMPLETED',
                },
                skip,
                take: limit,
                orderBy: {
                    completed_at: 'asc',
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            wallet_address: true,
                        },
                    },
                    round_progress: {
                        include: {
                            quest_answers: true,
                        },
                    },
                },
            }),
            this.prisma.missionParticipation.count({
                where: {
                    mission_id: missionId,
                    status: 'COMPLETED',
                },
            }),
        ]);
        const leaderboard = participations.map((participation, index) => {
            const totalQuestions = participation.round_progress.reduce((acc, rp) => acc + rp.quest_answers.length, 0);
            const correctAnswers = participation.round_progress.reduce((acc, rp) => acc + rp.quest_answers.filter((qa) => qa.is_correct).length, 0);
            return {
                rank: skip + index + 1,
                user: participation.user,
                completed_at: participation.completed_at,
                score: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
                total_questions: totalQuestions,
                correct_answers: correctAnswers,
            };
        });
        return {
            leaderboard,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getUserCompletedMissions(userId) {
        const participations = await this.prisma.missionParticipation.findMany({
            where: {
                user_id: userId,
                status: 'COMPLETED',
            },
            include: {
                mission: {
                    include: {
                        clan: {
                            select: {
                                id: true,
                                name: true,
                                logo_url: true,
                            },
                        },
                        mission_rounds: {
                            include: {
                                quest: {
                                    include: {
                                        reward: true,
                                    },
                                },
                            },
                        },
                    },
                },
                round_progress: {
                    include: {
                        mission_round: true,
                    },
                },
            },
        });
        return participations;
    }
    async getUserParticipatedMissions(userId) {
        const participations = await this.prisma.missionParticipation.findMany({
            where: {
                user_id: userId,
            },
            include: {
                mission: {
                    include: {
                        clan: {
                            select: {
                                id: true,
                                name: true,
                                logo_url: true,
                            },
                        },
                        mission_rounds: {
                            include: {
                                quest: {
                                    include: {
                                        reward: true,
                                    },
                                },
                            },
                        },
                    },
                },
                round_progress: {
                    include: {
                        mission_round: true,
                    },
                },
            },
        });
        return participations;
    }
};
exports.MissionsService = MissionsService;
exports.MissionsService = MissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], MissionsService);
//# sourceMappingURL=missions.service.js.map
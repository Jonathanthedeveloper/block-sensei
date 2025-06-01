import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateMissionDto } from './dtos/update-mission.dto';
import { CreateMissionWithRoundsDto } from './dtos/create-mission-with-rounds.dto';
import { StartMissionDto } from './dtos/start-mission.dto';
import { StartRoundDto } from './dtos/start-round.dto';
import { CompleteRoundDto } from './dtos/complete-round.dto';

@Injectable()
export class MissionsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create mission with rounds and nested quests/rewards
  async createMissionWithRounds(data: CreateMissionWithRoundsDto) {
    // Verify clan exists
    const clan = await this.prisma.clan.findUnique({
      where: { id: data.clan_id },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
    }

    return this.prisma.$transaction(async (prisma) => {
      // Create the mission first
      const mission = await prisma.mission.create({
        data: {
          title: data.title,
          brief: data.brief,
          description: data.description,
          clan_id: data.clan_id,
        },
      });

      // Create mission rounds with nested quests and rewards if provided
      if (data.mission_rounds && data.mission_rounds.length > 0) {
        for (const roundData of data.mission_rounds) {
          let questId: string | null = null; // Create quest and reward if provided
          if (roundData.quest) {
            // Create reward first
            const reward = await prisma.reward.create({
              data: {
                amount: roundData.quest.reward.amount,
                token: roundData.quest.reward.token,
              },
            });

            // Create quest with the reward
            const quest = await prisma.quest.create({
              data: {
                type: roundData.quest.type,
                description: roundData.quest.description,
                reward_id: reward.id,
              },
            });

            questId = quest.id;

            // Create quiz questions if provided
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

          // Create mission round
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
      } // Return the complete mission with all relations
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

  async getAllMissions(page: number = 1, limit: number = 10) {
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
  async getMissionById(id: string) {
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
      throw new NotFoundException('Mission not found');
    }

    return mission;
  }
  async updateMission(id: string, data: UpdateMissionDto) {
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
      throw new NotFoundException('Mission not found');
    }

    // If clan_id is being updated, verify the new clan exists
    if (data.clan_id) {
      const clan = await this.prisma.clan.findUnique({
        where: { id: data.clan_id },
      });

      if (!clan) {
        throw new NotFoundException('Clan not found');
      }
    }

    return this.prisma.$transaction(async (prisma) => {
      // Update basic mission fields
      const updatedMission = await prisma.mission.update({
        where: { id },
        data: {
          title: data.title,
          brief: data.brief,
          description: data.description,
          clan_id: data.clan_id,
        },
      });

      // Handle mission rounds updates if provided
      if (data.mission_rounds) {
        for (const roundData of data.mission_rounds) {
          if (roundData._action === 'delete' && roundData.id) {
            // Delete mission round and its related data
            const existingRound = await prisma.missionRound.findUnique({
              where: { id: roundData.id },
              include: { quest: { include: { reward: true } } },
            });

            if (existingRound) {
              // Delete quest quiz questions first
              if (existingRound.quest) {
                await prisma.questQuiz.deleteMany({
                  where: { quest_id: existingRound.quest.id },
                });

                // Delete quest
                await prisma.quest.delete({
                  where: { id: existingRound.quest.id },
                });

                // Delete reward
                if (existingRound.quest.reward) {
                  await prisma.reward.delete({
                    where: { id: existingRound.quest.reward.id },
                  });
                }
              }

              // Delete mission round
              await prisma.missionRound.delete({
                where: { id: roundData.id },
              });
            }
          } else if (roundData._action === 'create') {
            // Create new mission round
            let questId: string | null = null;

            if (roundData.quest) {
              // Create reward first
              const reward = await prisma.reward.create({
                data: {
                  amount: roundData.quest.reward?.amount || 0,
                  token: roundData.quest.reward?.token || '',
                },
              });

              // Create quest
              const quest = await prisma.quest.create({
                data: {
                  type: roundData.quest.type || 'QUIZ',
                  description: roundData.quest.description || '',
                  reward_id: reward.id,
                },
              });

              questId = quest.id;

              // Create quiz questions if provided
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

            // Create mission round
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
          } else if (roundData._action === 'update' && roundData.id) {
            // Update existing mission round
            const existingRound = await prisma.missionRound.findUnique({
              where: { id: roundData.id },
              include: { quest: { include: { reward: true } } },
            });

            if (existingRound) {
              // Update mission round basic fields
              await prisma.missionRound.update({
                where: { id: roundData.id },
                data: {
                  title: roundData.title,
                  content: roundData.content,
                  welcome_message: roundData.welcome_message,
                  introduction: roundData.introduction,
                },
              });

              // Update quest and reward if provided
              if (roundData.quest && existingRound.quest) {
                // Update reward
                if (roundData.quest.reward) {
                  await prisma.reward.update({
                    where: { id: existingRound.quest.reward.id },
                    data: {
                      amount: roundData.quest.reward.amount,
                      token: roundData.quest.reward.token,
                    },
                  });
                }

                // Update quest
                await prisma.quest.update({
                  where: { id: existingRound.quest.id },
                  data: {
                    type: roundData.quest.type,
                    description: roundData.quest.description,
                  },
                });

                // Update quiz questions if provided
                if (roundData.quest.quiz) {
                  // Delete existing quiz questions
                  await prisma.questQuiz.deleteMany({
                    where: { quest_id: existingRound.quest.id },
                  });

                  // Create new quiz questions
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

      // Return updated mission with all relations
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
  async deleteMission(id: string) {
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
      throw new NotFoundException('Mission not found');
    }

    return this.prisma.$transaction(async (prisma) => {
      // Delete all related data in the correct order
      for (const round of mission.mission_rounds) {
        if (round.quest) {
          // Delete quiz questions first
          await prisma.questQuiz.deleteMany({
            where: { quest_id: round.quest.id },
          });

          // Delete quest
          await prisma.quest.delete({
            where: { id: round.quest.id },
          });

          // Delete reward
          if (round.quest.reward) {
            await prisma.reward.delete({
              where: { id: round.quest.reward.id },
            });
          }
        }

        // Delete mission round
        await prisma.missionRound.delete({
          where: { id: round.id },
        });
      }

      // Finally delete the mission
      await prisma.mission.delete({
        where: { id },
      });

      return { success: true, message: 'Mission deleted successfully' };
    });
  }

  // Get missions by clan
  async getMissionsByClan(
    clanId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    // Verify clan exists
    const clan = await this.prisma.clan.findUnique({
      where: { id: clanId },
    });

    if (!clan) {
      throw new NotFoundException('Clan not found');
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

  // Mission Progress Tracking Methods
  async startMission(userId: string, data: StartMissionDto) {
    // Verify mission exists
    const mission = await this.prisma.mission.findUnique({
      where: { id: data.mission_id },
      include: {
        mission_rounds: true,
      },
    });

    if (!mission) {
      throw new NotFoundException('Mission not found');
    }

    // Check if user already started this mission
    const existingParticipation =
      await this.prisma.missionParticipation.findUnique({
        where: {
          user_id_mission_id: {
            user_id: userId,
            mission_id: data.mission_id,
          },
        },
      });

    if (existingParticipation) {
      throw new BadRequestException('User has already started this mission');
    }

    return this.prisma.$transaction(async (prisma) => {
      // Create mission participation
      const participation = await prisma.missionParticipation.create({
        data: {
          user_id: userId,
          mission_id: data.mission_id,
          status: 'STARTED',
        },
      });

      // Create round progress entries for all mission rounds
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

  async startRound(userId: string, data: StartRoundDto) {
    // Get the user's mission participation and round progress
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
      throw new NotFoundException(
        'Round progress not found. User must start the mission first.',
      );
    }

    if (roundProgress.status !== 'NOT_STARTED') {
      throw new BadRequestException(
        'Round has already been started or completed',
      );
    }

    // Update round progress status
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

    // Update mission participation status if needed
    await this.prisma.missionParticipation.update({
      where: { id: roundProgress.participation.id },
      data: { status: 'IN_PROGRESS' },
    });

    return updatedProgress;
  }

  async completeRound(userId: string, data: CompleteRoundDto) {
    // Get the user's round progress
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
      throw new NotFoundException('Round progress not found');
    }

    if (roundProgress.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Round must be in progress to complete');
    }

    const quest = roundProgress.mission_round.quest;
    if (!quest) {
      throw new NotFoundException('Quest not found for this round');
    }

    return this.prisma.$transaction(async (prisma) => {
      let completionStatus: 'COMPLETED' | 'FAILED' = 'COMPLETED';
      let questAnswers: any[] = [];

      // Handle completion based on quest type
      if (quest.type === 'QUIZ') {
        const result = await this.handleQuizCompletion(
          prisma,
          roundProgress,
          quest,
          data.quiz_answers || [],
        );
        completionStatus = result.allCorrect ? 'COMPLETED' : 'FAILED';
        questAnswers = result.questAnswers;
      } else {
        // For non-quiz quests, completion is typically automatic or verified externally
        // TODO: Implement specific completion logic for each quest type:
        // - VISIT_SITE: Verify URL visit through tracking pixels or callbacks
        // - WATCH_VIDEO: Verify video completion through player events
        // - SOCIAL_ACTION: Verify social media interactions (likes, shares, follows)
        // - BLOCKCHAIN_ACTION: Verify on-chain transactions or interactions
        // - USER_CONTENT: Review and approve user submissions (posts, comments, etc.)
        // - REFERRALS: Track successful referral completions and user signups
        // - TRACKER: Monitor achievement of specific metrics or goals
        completionStatus = 'COMPLETED';
      }

      // Update round progress status
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

      // Check if all rounds in the mission are completed
      const allRoundsProgress = await prisma.roundProgress.findMany({
        where: {
          participation_id: roundProgress.participation.id,
        },
      });

      const allRoundsCompleted = allRoundsProgress.every(
        (rp) => rp.status === 'COMPLETED',
      );

      // Update mission participation status if all rounds completed
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

  private async handleQuizCompletion(
    prisma: any,
    roundProgress: any,
    quest: any,
    quizAnswers: { quest_quiz_id: string; user_answer: string }[],
  ) {
    let allCorrect = true;
    const questAnswers: any[] = [];

    if (!quest.quiz || quest.quiz.length === 0) {
      throw new BadRequestException('No quiz questions found for this quest');
    }

    if (quizAnswers.length === 0) {
      throw new BadRequestException(
        'Quiz answers are required for quiz quests',
      );
    }

    // Process quiz answers
    for (const answerData of quizAnswers) {
      // Find the quiz question
      const quizQuestion = quest.quiz.find(
        (q: any) => q.id === answerData.quest_quiz_id,
      );

      if (!quizQuestion) {
        throw new NotFoundException(
          `Quiz question ${answerData.quest_quiz_id} not found`,
        );
      }

      // Check if answer is correct
      const isCorrect = quizQuestion.answer === answerData.user_answer;
      if (!isCorrect) {
        allCorrect = false;
      }

      // Save the user's answer
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

  async getUserMissionProgress(userId: string, missionId: string) {
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
      throw new NotFoundException('Mission participation not found');
    }

    return participation;
  }

  async getUserMissions(userId: string, page: number = 1, limit: number = 10) {
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

  async getMissionLeaderboard(
    missionId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    // Verify mission exists
    const mission = await this.prisma.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      throw new NotFoundException('Mission not found');
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
          completed_at: 'asc', // Earliest completion first (leaderboard)
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

    // Calculate scores for each participant
    const leaderboard = participations.map((participation, index) => {
      const totalQuestions = participation.round_progress.reduce(
        (acc, rp) => acc + rp.quest_answers.length,
        0,
      );
      const correctAnswers = participation.round_progress.reduce(
        (acc, rp) =>
          acc + rp.quest_answers.filter((qa) => qa.is_correct).length,
        0,
      );

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

  async getUserCompletedMissions(userId: string) {
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

  async getUserParticipatedMissions(userId: string) {
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
}

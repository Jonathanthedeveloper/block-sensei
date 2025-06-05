import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Progress from "@/components/ui/Progress";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Trophy,
  Users,
  Award,
  ArrowRight,
  Star,
  Flame,
  Gift,
  Target,
  Sparkles,
} from "lucide-react";
import { formatNumber, cn } from "../lib/utils";
import { useGetUserParticipatedMissions, useProfile } from "@/features";

export default function Dashboard() {
  const { data: profile } = useProfile();

  // Calculate user level based on block balance - fix for -Infinity
  const blockBalance = profile?.block_balance || 0;
  const userLevel = blockBalance > 0 ? Math.floor(Math.log2(blockBalance)) : 1;

  // Ensure userLevel is at least 1
  const safeUserLevel = Math.max(userLevel, 1);

  const nextLevelPoints = Math.pow(2, safeUserLevel + 1);
  const currentLevelPoints = Math.pow(2, safeUserLevel);

  const levelProgress =
    blockBalance > currentLevelPoints
      ? Math.min(
          ((blockBalance - currentLevelPoints) /
            (nextLevelPoints - currentLevelPoints)) *
            100,
          100
        )
      : 0;

  if (!profile) return null;

  const stats = [
    {
      title: "Missions Completed",
      value: profile.mission_participations.filter(
        (participation) => participation.status === "COMPLETED"
      ).length,
      icon: <Trophy className='w-6 h-6' />,
      color: "from-primary-500 to-secondary-500",
      change: "+2 this week",
    },
    {
      title: "Quests Completed",
      value: 2,
      icon: <Target className='w-6 h-6' />,
      color: "from-secondary-500 to-accent-500",
      change: "+5 this week",
    },
    {
      title: "Achievements",
      value: 2,
      icon: <Award className='w-6 h-6' />,
      color: "from-accent-500 to-primary-500",
      change: "New badge unlocked!",
    },
    {
      title: "BLOCK Earned",
      value: 2,
      icon: <Gift className='w-6 h-6' />,
      color: "from-success-500 to-primary-500",
      change: "+300 today",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header with Level Progress */}
      <div className='relative'>
        <motion.div className='absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 opacity-10 rounded-lg to-accent-500' />
        <div className='relative p-6 rounded-lg'>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <motion.h1
                className='flex items-start gap-2 font-bold text-gray-900 text-md dark:text-white sm:text-2xl'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span>Welcome back, Sui Explorer</span>
                <Badge variant='primary' className='text-sm shrink-0'>
                  Level {userLevel}
                </Badge>
              </motion.h1>
              <p className='mt-1 text-gray-600 dark:text-gray-300'>
                Your Sui adventure continues...
              </p>
            </div>
            <div className='flex items-center gap-2 shrink-0'>
              <Star className='size-4 sm:size-5 text-yellow-500' />
              <span className='font-bold text-gray-900 dark:text-white text-xs sm:text-lg shrink-0'>
                {formatNumber(profile.block_balance)} XP
              </span>
            </div>
          </div>

          <div className='relative'>
            <div className='flex justify-between items-center mb-2'>
              <span className='font-medium text-gray-600 dark:text-gray-400 text-sm'>
                Progress to Level {userLevel + 1}
              </span>
              <span className='font-medium text-gray-900 dark:text-white text-sm'>
                {Math.round(levelProgress)}%
              </span>
            </div>
            <Progress value={levelProgress} variant='primary' className='h-3' />
            <div className='mt-2 text-gray-500 dark:text-gray-400 text-xs'>
              {formatNumber(nextLevelPoints - profile.block_balance)} XP needed
              for next level
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className='group relative overflow-hidden'>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <CardContent className='p-6'>
                <div className='flex items-center gap-4'>
                  <div
                    className={cn(
                      "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
                      "bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900"
                    )}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p className='text-gray-500 dark:text-gray-400 text-sm'>
                      {stat.title}
                    </p>
                    <p className='font-bold text-gray-900 dark:text-white text-2xl'>
                      {stat.value}
                    </p>
                    <p className='mt-1 text-primary-500 dark:text-primary-400 text-xs'>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <QuickActions />

      <DailyChallenges />

      <ActiveMissions />
    </div>
  );
}

function QuickActions() {
  return (
    <div className=''>
      <h2 className='flex items-center gap-2 mb-4 font-bold text-gray-900 dark:text-white text-xl'>
        <Target className='w-5 h-5 text-primary-500' />
        Quick Actions
      </h2>
      <motion.div
        className='gap-4 grid grid-cols-1 md:grid-cols-3'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <Link to='/missions'>
          <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
            <CardContent className='p-4 text-center'>
              <Trophy className='mx-auto mb-2 w-8 h-8 text-primary-500' />
              <h3 className='font-semibold'>Start Mission</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Begin new adventure
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to='/clans'>
          <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
            <CardContent className='p-4 text-center'>
              <Users className='mx-auto mb-2 w-8 h-8 text-secondary-500' />
              <h3 className='font-semibold'>Join Clan</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Connect with others
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to='/leaderboard'>
          <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
            <CardContent className='p-4 text-center'>
              <Award className='mx-auto mb-2 w-8 h-8 text-accent-500' />
              <h3 className='font-semibold'>Leaderboard</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                See rankings
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
}

function DailyChallenges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className='hidden'
    >
      <Card className='border-2 border-primary-100 dark:border-primary-800'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='flex items-center gap-2'>
              <Flame className='w-5 h-5 text-primary-500' />
              Daily Challenges
            </CardTitle>
            <Badge variant='accent'>3/5 Completed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[
              { title: "Complete 2 Quests", reward: 100, completed: true },
              { title: "Earn 500 BLOCK", reward: 150, completed: true },
              { title: "Join a New Clan", reward: 200, completed: true },
              { title: "Complete a Mission", reward: 300, completed: false },
              { title: "Invite a Friend", reward: 250, completed: false },
            ].map((challenge, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all duration-300",
                  challenge.completed
                    ? "border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20"
                    : "border-gray-200 dark:border-gray-700"
                )}
              >
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-3'>
                    {challenge.completed ? (
                      <div className='flex justify-center items-center bg-success-100 dark:bg-success-900 rounded-full w-8 h-8'>
                        <CheckCircle className='w-5 h-5 text-success-500' />
                      </div>
                    ) : (
                      <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-full w-8 h-8'>
                        <Target className='w-5 h-5 text-gray-500' />
                      </div>
                    )}
                    <span
                      className={cn(
                        "font-medium",
                        challenge.completed
                          ? "text-success-700 dark:text-success-300"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      {challenge.title}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Gift className='w-4 h-4 text-primary-500' />
                    <span className='font-medium text-primary-600 dark:text-primary-400'>
                      {challenge.reward} BLOCK
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ActiveMissions() {
  const { data: missionParticipations } = useGetUserParticipatedMissions();

  const activeMissionsParticipation = missionParticipations?.filter(
    (missionParticipation) => missionParticipation.status !== "COMPLETED"
  );
  return (
    <motion.div
      className='space-y-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className='flex justify-between items-center'>
        <h2 className='flex items-center gap-2 font-bold text-gray-900 dark:text-white text-xl'>
          <Trophy className='w-5 h-5 text-primary-500' />
          Active Missions
        </h2>
        <Link to='/missions'>
          <Button variant='ghost' size='sm'>
            View All
            <ArrowRight className='ml-1 w-4 h-4' />
          </Button>
        </Link>
      </div>

      {(activeMissionsParticipation?.length || 0) > 0 ? (
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {activeMissionsParticipation?.map((missionParticipation, index) => {
            const mission = missionParticipation.mission;

            const totalRounds = missionParticipation.round_progress.length;

            const completedRounds = missionParticipation.round_progress.filter(
              (round) => round.status === "COMPLETED"
            ).length;

            const completionPercentage =
              totalRounds > 0
                ? Math.round((completedRounds / totalRounds) * 100)
                : 0;

            const reward = {
              amount: mission.mission_rounds.reduce(
                (total, round) => total + (round.quest?.reward?.amount || 0),
                0
              ),
              token: mission.mission_rounds[0]?.quest?.reward?.token,
            };

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link to={`/missions/${mission.id}`}>
                  <Card className='group relative border-2 hover:border-primary-500 dark:hover:border-primary-400 border-transparent overflow-hidden transition-all duration-300'>
                    <div className='top-0 left-0 absolute bg-gradient-to-r from-primary-500 via-secondary-500 w-full h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 to-accent-500 transform' />

                    <CardContent className='p-6'>
                      <div className='flex items-start gap-4'>
                        <div className='flex flex-shrink-0 justify-center items-center bg-primary-100 dark:bg-primary-900/20 rounded-lg w-12 h-12 group-hover:scale-110 transition-transform'>
                          <Trophy className='w-6 h-6 text-primary-500' />
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-2'>
                            <h3 className='font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors'>
                              {mission.title}
                            </h3>
                            <Badge variant='accent' size='sm'>
                              <Gift className='mr-1 w-3 h-3' />
                              {reward.amount} {reward.token}
                            </Badge>
                          </div>

                          <p className='mb-4 text-gray-500 dark:text-gray-400 text-sm'>
                            {mission.brief}
                          </p>

                          <div className='space-y-3'>
                            <div className='flex justify-between items-center text-sm'>
                              <span className='text-gray-600 dark:text-gray-400'>
                                Progress
                              </span>
                              <span className='font-medium text-gray-900 dark:text-white'>
                                {completionPercentage}%
                              </span>
                            </div>
                            <Progress
                              value={completionPercentage || 0}
                              variant='primary'
                              className='h-2 group-hover:h-3 transition-all duration-300'
                            />
                            <div className='flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs'>
                              <span className='flex items-center'>
                                <Clock className='mr-1 w-4 h-4' />2 hours left
                              </span>
                              <span className='flex items-center'>
                                <Users className='mr-1 w-4 h-4' />
                                {mission.clan?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className='py-12 text-center'>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='flex justify-center items-center bg-primary-100 dark:bg-primary-900/20 mx-auto mb-4 rounded-full w-16 h-16'
            >
              <Sparkles className='w-8 h-8 text-primary-500' />
            </motion.div>
            <h3 className='font-medium text-gray-900 dark:text-white text-lg'>
              Ready for a New Challenge?
            </h3>
            <p className='mt-1 mb-6 text-gray-500 dark:text-gray-400'>
              Start a new mission to continue your learning journey
            </p>
            <Link to='/missions'>
              <Button variant='primary' icon={<Trophy className='w-5 h-5' />}>
                Find New Missions
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
      <polyline points='22 4 12 14.01 9 11.01' />
    </svg>
  );
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}

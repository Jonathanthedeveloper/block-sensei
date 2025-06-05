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
      icon: <Trophy className="h-6 w-6" />,
      color: "from-primary-500 to-secondary-500",
      change: "+2 this week",
    },
    {
      title: "Quests Completed",
      value: 2,
      icon: <Target className="h-6 w-6" />,
      color: "from-secondary-500 to-accent-500",
      change: "+5 this week",
    },
    {
      title: "Achievements",
      value: 2,
      icon: <Award className="h-6 w-6" />,
      color: "from-accent-500 to-primary-500",
      change: "New badge unlocked!",
    },
    {
      title: "BLOCK Earned",
      value: 2,
      icon: <Gift className="h-6 w-6" />,
      color: "from-success-500 to-primary-500",
      change: "+300 today",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Level Progress */}
      <div className="relative">
        <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-10 rounded-lg" />
        <div className="relative p-6 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.h1
                className="text-md sm:text-2xl font-bold text-gray-900 dark:text-white flex items-start gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span>Welcome back, Sui Explorer</span>
                <Badge variant="primary" className="text-sm shrink-0">
                  Level {userLevel}
                </Badge>
              </motion.h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Your Sui adventure continues...
              </p>
            </div>
            <div className=" flex items-center gap-2 shrink-0">
              <Star className="size-4 sm:size-5 text-yellow-500" />
              <span className="text-xs sm:text-lg font-bold text-gray-900 dark:text-white shrink-0">
                {formatNumber(profile.block_balance)} XP
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Progress to Level {userLevel + 1}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {Math.round(levelProgress)}%
              </span>
            </div>
            <Progress value={levelProgress} variant="primary" className="h-3" />
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {formatNumber(nextLevelPoints - profile.block_balance)} XP needed
              for next level
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
            <Card className="relative overflow-hidden group">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
                      "bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900"
                    )}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">
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
    <div className="">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-primary-500" />
        Quick Actions
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <Link to="/missions">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-primary-500 mx-auto mb-2" />
              <h3 className="font-semibold">Start Mission</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Begin new adventure
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/clans">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-secondary-500 mx-auto mb-2" />
              <h3 className="font-semibold">Join Clan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect with others
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/leaderboard">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-accent-500 mx-auto mb-2" />
              <h3 className="font-semibold">Leaderboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
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
      className="hidden"
    >
      <Card className="border-2 border-primary-100 dark:border-primary-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary-500" />
              Daily Challenges
            </CardTitle>
            <Badge variant="accent">3/5 Completed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {challenge.completed ? (
                      <div className="h-8 w-8 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-success-500" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Target className="h-5 w-5 text-gray-500" />
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
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary-500" />
                    <span className="font-medium text-primary-600 dark:text-primary-400">
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
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary-500" />
          Active Missions
        </h2>
        <Link to="/missions">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {(activeMissionsParticipation?.length || 0) > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Trophy className="h-6 w-6 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                              {mission.title}
                            </h3>
                            <Badge variant="accent" size="sm">
                              <Gift className="w-3 h-3 mr-1" />
                              {reward.amount} {reward.token}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {mission.brief}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Progress
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {completionPercentage}%
                              </span>
                            </div>
                            <Progress
                              value={completionPercentage || 0}
                              variant="primary"
                              className="h-2 group-hover:h-3 transition-all duration-300"
                            />
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />2 hours left
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
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
          <CardContent className="py-12 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-4"
            >
              <Sparkles className="h-8 w-8 text-primary-500" />
            </motion.div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Ready for a New Challenge?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">
              Start a new mission to continue your learning journey
            </p>
            <Link to="/missions">
              <Button variant="primary" icon={<Trophy className="w-5 h-5" />}>
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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

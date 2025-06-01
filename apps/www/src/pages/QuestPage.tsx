import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Progress from "../components/ui/Progress";
import {
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Trophy,
  Clock,
  Users,
  Flame,
  Gift,
  Target,
  Lock,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useGetMissionById, useGetUserMissionProgress } from "@/features";

export default function QuestPage() {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();

  const { data: mission, isPending } = useGetMissionById(missionId);
  const { data: missionProgress } = useGetUserMissionProgress(missionId);

  console.log(missionProgress);

  const missionDuration: string = useMemo(() => {
    if (
      !mission ||
      !mission.mission_rounds ||
      mission.mission_rounds.length === 0
    ) {
      return "N/A";
    }
    const duration = mission.mission_rounds.length * 15;
    return `${Math.floor(duration / 60)}h ${duration % 60}m`;
  }, [mission]);

  const reward = useMemo(() => {
    if (
      !mission ||
      !mission.mission_rounds ||
      mission.mission_rounds.length === 0
    ) {
      return { amount: 0, token: "BLOCK" };
    }
    const amount = mission.mission_rounds.reduce((total, round) => {
      const reward = round.quest?.reward?.amount || 0;
      return total + reward;
    }, 0);

    return {
      amount,
      token: mission.mission_rounds?.[0]?.quest?.reward?.token || "BLOCK",
    };
  }, [mission]);

  const currentRoundIndex =
    missionProgress?.round_progress.findIndex(
      (round) =>
        round.status === "IN_PROGRESS" || round.status === "NOT_STARTED"
    ) || 0;

  if (!mission && !isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <HelpCircle className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Mission Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Oops! This mission seems to have vanished into the blockchain...
        </p>
        <Link to="/missions">
          <Button variant="primary">Back to Mission Control</Button>
        </Link>
      </div>
    );
  }

  const handleStartRound = (roundId: string) => {
    navigate(`/missions/${missionId}/rounds/${roundId}`);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Bar */}
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/missions">
          <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>
            Mission Control
          </Button>
        </Link>
        <Badge variant="primary" className="animate-pulse">
          <Flame className="w-3 h-3 mr-1" />
          Live Mission
        </Badge>
        <Badge variant="secondary">
          <Users className="w-3 h-3 mr-1" />
          {mission?.clan?.name}
        </Badge>
      </motion.div>

      {/* Mission Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-2 border-primary-200 dark:border-primary-800">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

          <div className="relative h-48 bg-gradient-to-br from-primary-600 to-secondary-600 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <Trophy className="h-24 w-24 text-white opacity-90" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent py-6 px-6">
              <motion.h1
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {mission?.title}
              </motion.h1>
              <motion.p
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {mission?.brief}
              </motion.p>
            </div>
          </div>

          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-1 text-primary-500" />
                    <span>
                      {reward.amount} {reward.token}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-secondary-500" />
                    <span>{missionDuration}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1 text-accent-500" />
                    <span>{mission?.mission_rounds.length} Rounds</span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mission Progress
                  </span>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {currentRoundIndex + 1} of {mission?.mission_rounds.length}{" "}
                    Rounds
                  </span>
                </div>
                <Progress
                  value={
                    (currentRoundIndex /
                      (mission?.mission_rounds?.length || 1)) *
                    100
                  }
                  variant="primary"
                  size="lg"
                  className="h-3"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rounds List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4"
      >
        {mission?.mission_rounds.map((round, index) => {
          const isLocked = index > currentRoundIndex;
          const isCompleted = index < currentRoundIndex;
          const isCurrent = index === currentRoundIndex;

          return (
            <motion.div
              key={round.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "relative overflow-hidden transition-all duration-300",
                  isLocked ? "opacity-75 grayscale" : "hover:shadow-lg",
                  isCurrent &&
                    "border-2 border-primary-500 dark:border-primary-400",
                  isCompleted && "bg-primary-50 dark:bg-primary-900/20"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                        isCompleted
                          ? "bg-primary-100 dark:bg-primary-900"
                          : isCurrent
                            ? "bg-secondary-100 dark:bg-secondary-900"
                            : "bg-gray-100 dark:bg-gray-800"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                      ) : (
                        <span className="text-xl font-bold text-secondary-600 dark:text-secondary-400">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                          {round.title}
                        </h3>
                        {round.quest && (
                          <Badge variant="accent" size="sm">
                            <Gift className="w-3 h-3 mr-1" />
                            {round.quest.reward.amount}{" "}
                            {round.quest.reward.token}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {round.introduction}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="secondary" size="sm">
                          {round.quest?.type.replace("_", " ")}
                        </Badge>
                        <span className="text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          15 min
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <Button variant="ghost" size="sm" disabled>
                          Completed
                        </Button>
                      ) : isCurrent ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleStartRound(round.id)}
                        >
                          Start Round
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled={isLocked}>
                          {isLocked ? "Locked" : "Start"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>

                {isCurrent && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
                )}
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

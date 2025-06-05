import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Progress from "@/components/ui/Progress";
import Button from "@/components/ui/Button";
import { Search, ArrowUpDown, Trophy, Clock, Users } from "lucide-react";
import {
  useGetAllMissions,
  useGetUserParticipatedMissions,
  useStartMission,
} from "@/features";
import { useMemo } from "react";
import { AllMissions } from "@/services/api";

export default function MissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: allMissions } = useGetAllMissions();
  const { data: participatedMissions } = useGetUserParticipatedMissions();

  console.log(participatedMissions);

  // Consolidated filtering and sorting in useMemo
  const filteredMissions = useMemo(() => {
    if (!allMissions?.missions) return [];

    let filtered = [...allMissions.missions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (mission) =>
          mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mission.brief.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [allMissions?.missions, searchTerm, sortOrder]);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Missions
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Complete missions to earn rewards and enhance your blockchain
          knowledge
        </p>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search missions..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <ArrowUpDown className="h-5 w-5 mr-2" />
          <span>{sortOrder === "asc" ? "Oldest First" : "Newest First"}</span>
        </button>
      </motion.div>

      {filteredMissions.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredMissions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </motion.div>
      ) : (
        <Card variant="bordered">
          <CardContent className="py-12 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800">
              <Search className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No missions found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MissionCard({
  mission,
  index,
}: {
  mission: AllMissions;
  index: number;
}) {
  const startMission = useStartMission();
  const navigate = useNavigate();

  const { data: participatedMissions } = useGetUserParticipatedMissions();

  const participatedMission = participatedMissions?.find(
    (p) => p.mission_id === mission.id
  );

  function handleStartMission() {
    if (!participatedMission) {
      startMission.mutate(mission.id, {
        onSuccess: () => {
          navigate(`/missions/${mission.id}`);
        },
      });
    } else {
      navigate(`/missions/${mission.id}`);
    }
  }

  const completionPercentage = useMemo(() => {
    if (!participatedMission) return 0;

    const totalRounds = participatedMission.round_progress.length;
    if (totalRounds === 0) return 0;

    const completedRounds = participatedMission.round_progress.filter(
      (round) => round.status === "COMPLETED"
    ).length;

    return Math.round((completedRounds / totalRounds) * 100);
  }, [participatedMission]);

  const buttonProps = useMemo(() => {
    if (!participatedMission) {
      return {
        text: "Start Mission",
        variant: "primary" as const,
      };
    }

    if (participatedMission.status === "IN_PROGRESS") {
      return {
        text: "Continue Mission",
        variant: "primary" as const,
      };
    }

    if (participatedMission.status === "COMPLETED") {
      return {
        text: "Review Mission",
        variant: "secondary" as const,
      };
    }

    // Default fallback
    return {
      text: "View Mission",
      variant: "outline" as const,
    };
  }, [participatedMission]);

  // Calculate mission duration based on number of rounds
  const missionDuration: string = useMemo(() => {
    const duration = mission.mission_rounds.length * 15;
    return `${Math.floor(duration / 60)}h ${duration % 60}m`;
  }, [mission]);

  const reward = useMemo(() => {
    const amount = mission.mission_rounds.reduce((total, round) => {
      const reward = round.quest?.reward?.amount || 0;
      return total + reward;
    }, 0);

    return {
      amount,
      token: mission.mission_rounds?.[0]?.quest?.reward?.token || "BLOCK",
    };
  }, [mission]);

  return (
    <motion.div
      key={mission.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="group"
      onClick={handleStartMission}
      role="button"
      tabIndex={0}
    >
      <Card className="relative overflow-hidden border-2 border-transparent group-hover:border-primary-500 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

        <CardContent className="pt-6">
          {/* Mission Title & Clan */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {mission.title}
              </h3>
              <div className="flex items-center mt-2">
                <Badge
                  variant="secondary"
                  size="sm"
                  className="flex items-center"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {mission.clan?.name || "Unknown Clan"}
                </Badge>
              </div>
            </div>
            {completionPercentage === 100 && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full">
                <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            )}
          </div>

          {/* Mission Brief */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
            {mission.brief}
          </p>

          {/* Progress & Rewards Section */}
          <div className="space-y-4">
            {/* Progress Bar - Show only if mission is started */}

            {participatedMission?.status === "IN_PROGRESS" && (
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Progress
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {completionPercentage}%
                  </span>
                </div>
                <Progress
                  value={completionPercentage}
                  variant="primary"
                  className="h-2 group-hover:h-3 transition-all duration-300"
                />
              </div>
            )}

            {/* Mission Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Trophy className="w-4 h-4 mr-1" />
                <span>
                  {reward.amount} {reward.token}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>{missionDuration}</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              isLoading={startMission.isPending}
              fullWidth
              variant={buttonProps?.variant}
              className="cursor-pointer mt-4 group-hover:shadow-lg transition-shadow duration-300"
              disabled={startMission.isPending}
            >
              {startMission.isPending ? "" : buttonProps?.text}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

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
import Coin from "../assets/coin.png";
import Logo from "../assets/Logo.png";

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
    <div className='space-y-6'>
      <header className='mb-8'>
        <motion.h1
          className='font-bold text-gray-900 dark:text-white text-2xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Missions
        </motion.h1>
        <p className='mt-1 text-gray-600 dark:text-gray-300'>
          Complete missions to earn rewards and enhance your blockchain
          knowledge
        </p>
      </header>

      <motion.div
        className='gap-4 grid grid-cols-1 md:grid-cols-4 mb-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className='relative'>
          <div className='left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
            <Search className='w-5 h-5 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search missions...'
            className='block bg-white dark:bg-gray-700 py-2 pr-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full text-gray-900 dark:text-white placeholder-gray-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className='flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200'
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <ArrowUpDown className='mr-2 w-5 h-5' />
          <span>{sortOrder === "asc" ? "Oldest First" : "Newest First"}</span>
        </button>
      </motion.div>

      {filteredMissions.length > 0 ? (
        <motion.div
          className='gap-3 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredMissions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </motion.div>
      ) : (
        <Card variant='bordered'>
          <CardContent className='py-12 text-center'>
            <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-800 mx-auto rounded-full w-12 h-12'>
              <Search className='w-6 h-6 text-gray-500' />
            </div>
            <h3 className='mt-2 font-medium text-gray-900 dark:text-white text-lg'>
              No missions found
            </h3>
            <p className='mt-1 text-gray-500 dark:text-gray-400 text-sm'>
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
      className='group'
      onClick={handleStartMission}
      role='button'
      tabIndex={0}
    >
      <Card className='relative bg-gradient-to-br from-white dark:from-gray-800 to-gray-50 dark:to-gray-900 border-2 group-hover:border-primary-500 border-transparent overflow-hidden transition-all duration-300'>
        <div className='top-0 left-0 absolute bg-gradient-to-r from-primary-500 via-secondary-500 w-full h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 to-accent-500 transform' />

        <CardContent className='pt-6'>
          {/* Mission Stats */}
          <div className='flex flex-wrap justify-between items-center gap-2 mb-4 text-sm'>
            <div className='flex items-center bg-gradient-to-r to-secondary-500 px-3 py-2 rounded-full text-black from-accent-400'>
              {/* <Trophy className='mr-1 w-4 h-4' /> */}
              <img src={Coin} alt='coin' className='mr-1 w-4 h-4' />
              <span className='whitespace-nowrap'>
                {reward.amount} {reward.token}
              </span>
            </div>
            <div className='flex items-center bg-primary-500 px-3 py-2 rounded-full text-white'>
              <Clock className='mr-1 w-4 h-4' />
              <span className='whitespace-nowrap'>{missionDuration}</span>
            </div>
          </div>

          {/* Mission Title & Clan */}
          <div className='flex justify-between items-start mb-4'>
            <div className='flex-1'>
              <h3 className='font-bold text-gray-900 dark:group-hover:text-primary-400 dark:text-white group-hover:text-primary-600 text-xl transition-colors'>
                {mission.title}
              </h3>
              <div className='flex items-center mt-2'>
                <Badge
                  variant='secondary'
                  size='sm'
                  className='flex items-center'
                >
                  <Users className='mr-1 w-3 h-3' />
                  {mission.clan?.name || "Unknown Clan"}
                </Badge>
              </div>
            </div>
            {completionPercentage === 100 && (
              <div className='flex justify-center items-center bg-green-100 dark:bg-green-900 rounded-full w-8 h-8'>
                <Trophy className='w-4 h-4 text-green-600 dark:text-green-400' />
              </div>
            )}
          </div>

          {/* Mission Brief */}
          <p className='mb-6 text-gray-600 dark:text-gray-400 text-center md:text-start line-clamp-2'>
            {mission.brief}
          </p>

          {/* Progress & Rewards Section */}
          <div className='space-y-4'>
            {/* Progress Bar - Show only if mission is started */}

            {participatedMission?.status === "IN_PROGRESS" && (
              <div>
                <div className='flex justify-between items-center mb-2 text-sm'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    Progress
                  </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {completionPercentage}%
                  </span>
                </div>
                <Progress
                  value={completionPercentage}
                  variant='primary'
                  className='h-2 group-hover:h-3 transition-all duration-300'
                />
              </div>
            )}

            {/* Action Button */}
            <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4 mt-4'>
              <div className='flex justify-center md:justify-start'>
                <img
                  src={Logo}
                  alt='coin'
                  className='w-20 max-w-[80px] object-contain'
                />
              </div>
              <div className='w-full md:w-auto'>
                <Button
                  isLoading={startMission.isPending}
                  fullWidth
                  variant={buttonProps?.variant}
                  className='group-hover:shadow-lg transition-shadow duration-300 cursor-pointer'
                  disabled={startMission.isPending}
                >
                  {startMission.isPending ? "" : buttonProps?.text}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

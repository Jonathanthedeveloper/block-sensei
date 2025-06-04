import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import {
  Plus,
  Edit3,
  Trash2,
  Users,
  Trophy,
  Shield,
  Crown,
  Scroll,
  ArrowRight,
} from "lucide-react";
import { mockMissions } from "../data/mockData";
import { formatNumber } from "../lib/utils";
import { useGetUserCreatedClans } from "@/features";

export default function StudioPage() {
  const navigate = useNavigate();
  const [selectedClan, setSelectedClan] = useState<string | null>(null);
  const { data: clans } = useGetUserCreatedClans();

  const handleClanSelect = (clanId: string) => {
    setSelectedClan(clanId);
  };

  return (
    <div className="space-y-6">
      <header>
        <motion.h1
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Crown className="h-8 w-8 text-primary-500" />
          Command Center
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your clans and create engaging missions
        </p>
      </header>

      {!selectedClan ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary-500" />
              Your Clans
            </h2>
            <Button
              variant="primary"
              onClick={() => navigate("/studio/create-clan")}
              icon={<Plus className="w-4 h-4" />}
              className="bg-gradient-to-r from-primary-500 to-secondary-500"
            >
              Create New Clan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clans?.clans?.map((clan) => (
              <motion.div
                key={clan.id}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <button
                  onClick={() => handleClanSelect(clan.id)}
                  className="w-full text-left"
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400">
                    <div className="h-32 bg-gradient-to-br from-primary-500 to-secondary-500 relative">
                      <div className="absolute -bottom-6 left-6">
                        <Avatar
                          src={clan.logo_url}
                          alt={clan.name}
                          fallback={clan.name.substring(0, 2)}
                          size="lg"
                          className="border-4 border-white dark:border-gray-800 group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>

                    <CardContent className="pt-10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                            {clan.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                            {clan.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" size="sm">
                          <Users className="w-3 h-3 mr-1" />
                          {formatNumber(clan._count.followers)} Members
                        </Badge>
                        <Badge variant="accent" size="sm">
                          <Trophy className="w-3 h-3 mr-1" />
                          {clan._count.missions} Missions
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Clan Header */}
          <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={
                      clans?.clans.find((c) => c.id === selectedClan)?.logo_url
                    }
                    alt={clans?.clans.find((c) => c.id === selectedClan)?.name}
                    fallback={clans?.clans
                      .find((c) => c.id === selectedClan)
                      ?.name.substring(0, 2)}
                    size="lg"
                    className="border-4 border-white/20"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {clans?.clans.find((c) => c.id === selectedClan)?.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        size="sm"
                        className="bg-white/10 border-white/20"
                      >
                        <Users className="w-3 h-3 mr-1" />
                        {formatNumber(
                          clans?.clans.find((c) => c.id === selectedClan)
                            ?._count.followers || 0
                        )}{" "}
                        Members
                      </Badge>
                      <Badge
                        variant="accent"
                        size="sm"
                        className="bg-white/10 border-white/20"
                      >
                        <Trophy className="w-3 h-3 mr-1" />
                        {clans?.clans.find((c) => c.id === selectedClan)?._count
                          .missions || 0}{" "}
                        Missions
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedClan(null)}
                  >
                    Back to Clans
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/studio/mission/${selectedClan}`)}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Create Mission
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Missions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMissions
              .filter((m) => m.clan_id === selectedClan)
              .map((mission) => (
                <motion.div key={mission.id} whileHover={{ scale: 1.02 }}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400">
                    <div className="h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Scroll className="w-6 h-6 text-primary-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                              {mission.title}
                            </h3>
                            <Badge variant="secondary" size="sm">
                              {mission.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                            {mission.brief}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<Edit3 className="w-4 h-4" />}
                              className="hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<Trash2 className="w-4 h-4" />}
                              onClick={() => {}}
                              className="hover:bg-error-50 dark:hover:bg-error-900/20 hover:text-error-600 dark:hover:text-error-400"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

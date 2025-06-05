import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { Globe, ExternalLink, Trophy, Users, Rocket } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatNumber, cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import {
  useFollowClan,
  useGetClanById,
  useProfile,
  useUnfollowClan,
} from "@/features";

export default function ClanPage() {
  const { clanId } = useParams<{ clanId: string }>();
  const { data: clan } = useGetClanById(clanId);
  const { data: profile } = useProfile();
  const followClan = useFollowClan();
  const unFollowClan = useUnfollowClan();

  const isFollowingClan = profile?.joined_clans?.some(
    (followedClan) => followedClan.clan_id === clanId
  );

  function handleFollow() {
    if (!clanId) return;

    if (isFollowingClan) {
      unFollowClan.mutate(clanId);
    } else {
      followClan.mutate(clanId);
    }
  }

  if (!clan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Clan Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          This clan seems to have vanished into the metaverse! Maybe it's on a
          secret mission? 🕵️‍♂️
        </p>
        <Link to="/clans">
          <Button variant="primary" icon={<Rocket className="w-4 h-4" />}>
            Explore Other Clans
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Clan Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 bg-transparent">
          <div className="relative h-64 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] animate-[spin_20s_linear_infinite]" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Avatar
                  src={clan.logo_url}
                  alt={clan.name}
                  fallback={clan.name.substring(0, 2)}
                  size="xl"
                  className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl"
                />
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" size="sm">
                      <Users className="w-3 h-3 mr-1" />
                      {formatNumber(clan._count.followers)} Members
                    </Badge>
                    <Badge variant="accent" size="sm">
                      <Trophy className="w-3 h-3 mr-1" />
                      {clan._count.missions} Missions
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {clan.name}
                  </h1>
                  <p className="text-white/80 max-w-2xl">{clan.description}</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="primary" onClick={handleFollow}>
                    {isFollowingClan ? "Unfollow Clan" : "Follow Clan"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-xl shadow-lg">
            <div className="flex items-center gap-6 px-6 py-4">
              {clan.website_url && (
                <a
                  href={clan.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {clan.x_url && (
                <a
                  href={clan.x_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span>Twitter</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs: Missions, Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card variant="bordered" className="overflow-hidden">
          <Tabs.Root defaultValue="missions">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <Tabs.List className="flex space-x-1">
                <Tabs.Trigger
                  value="missions"
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-900/20",
                    "data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>Missions ({clan.missions.length})</span>
                  </div>
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="members"
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-900/20",
                    "data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Members ({clan._count.followers})</span>
                  </div>
                </Tabs.Trigger>
              </Tabs.List>
            </CardHeader>

            <CardContent>
              <Tabs.Content value="missions" className="pt-4">
                {clan.missions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clan.missions.map((mission) => (
                      <Link
                        key={mission.id}
                        to={`/missions/${mission.id}`}
                        className="group"
                      >
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400">
                          <div className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Trophy className="w-6 h-6 text-primary-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                  {mission.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {mission.brief}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      No missions yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      This clan is still preparing their first mission!
                    </p>
                  </div>
                )}
              </Tabs.Content>

              <Tabs.Content value="members" className="pt-4">
                {clan.followers.length > 0 ? (
                  <div className="space-y-4">
                    {clan.followers.map((member) => (
                      <motion.div
                        key={member.user.id}
                        className="group"
                        whileHover={{ scale: 1.01 }}
                      >
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400">
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar
                                  fallback={member.user.wallet_address.substring(
                                    0,
                                    2
                                  )}
                                  size="md"
                                  className="group-hover:scale-110 transition-transform"
                                />
                                <div className="ml-4">
                                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                    {member.user.wallet_address}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      No members yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Be the first to join this awesome clan!
                    </p>
                  </div>
                )}
              </Tabs.Content>
            </CardContent>
          </Tabs.Root>
        </Card>
      </motion.div>
    </div>
  );
}

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
import { toast } from "sonner";

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
      unFollowClan.mutate(clanId, {
        onSuccess() {
          toast.success("Clan unfollowed successfully!");
        },
      });
    } else {
      followClan.mutate(clanId, {
        onSuccess() {
          toast.success("Clan followed successfully!");
        },
      });
    }
  }

  if (!clan) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[50vh] text-center'>
        <div className='flex justify-center items-center bg-primary-100 dark:bg-primary-900/20 mb-6 rounded-full w-24 h-24'>
          <Users className='w-12 h-12 text-primary-500' />
        </div>
        <h2 className='mb-2 font-bold text-gray-900 dark:text-white text-2xl'>
          Oops! Clan Not Found
        </h2>
        <p className='mb-6 max-w-md text-gray-600 dark:text-gray-400'>
          This clan seems to have vanished into the metaverse! Maybe it's on a
          secret mission? 🕵️‍♂️
        </p>
        <Link to='/clans'>
          <Button variant='primary' icon={<Rocket className='w-4 h-4' />}>
            Explore Other Clans
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Clan Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='bg-transparent border-0 overflow-hidden'>
          <div className='relative bg-gradient-to-br from-primary-600 via-secondary-500 h-64 to-accent-500'>
            {/* Animated Background Pattern */}
            <div className='absolute inset-0 opacity-10'>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] animate-[spin_20s_linear_infinite]" />
            </div>

            <div className='absolute inset-0 flex justify-center items-center'>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='relative'
              >
                <Avatar
                  src={clan.logo_url}
                  alt={clan.name}
                  fallback={clan.name.substring(0, 2)}
                  size='xl'
                  className='shadow-xl border-4 border-white dark:border-gray-800 w-32 h-32'
                />
              </motion.div>
            </div>

            <div className='right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6'>
              <div className='flex md:flex-row flex-col justify-between items-end'>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <Badge variant='secondary' size='sm'>
                      <Users className='mr-1 w-3 h-3' />
                      {formatNumber(clan._count.followers)} Members
                    </Badge>
                    <Badge variant='accent' size='sm'>
                      <Trophy className='mr-1 w-3 h-3' />
                      {clan._count.missions} Missions
                    </Badge>
                  </div>
                  <h1 className='mb-1 font-bold text-white text-3xl'>
                    {clan.name}
                  </h1>
                  <p className='max-w-2xl text-white/80 text-xs md:text-base line-clamp-3 md:line-clamp-none'>
                    {clan.description}
                  </p>
                </div>

                <div className='flex gap-3 mt-2'>
                  <Button variant='primary' onClick={handleFollow}>
                    {isFollowingClan ? "Unfollow Clan" : "Follow Clan"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-b-xl'>
            <div className='flex items-center gap-6 px-6 py-4'>
              {clan.website_url && (
                <a
                  href={clan.website_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-primary-500 dark:hover:text-primary-400 dark:text-gray-400 transition-colors'
                >
                  <Globe className='w-5 h-5' />
                  <span>Website</span>
                  <ExternalLink className='w-4 h-4' />
                </a>
              )}

              {clan.x_url && (
                <a
                  href={clan.x_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-gray-600 hover:text-primary-500 dark:hover:text-primary-400 dark:text-gray-400 transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                  </svg>
                  <span>Twitter</span>
                  <ExternalLink className='w-4 h-4' />
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
        <Card variant='bordered' className='overflow-hidden'>
          <Tabs.Root defaultValue='missions'>
            <CardHeader className='border-gray-200 dark:border-gray-700 border-b'>
              <Tabs.List className='flex space-x-1'>
                <Tabs.Trigger
                  value='missions'
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-900/20",
                    "data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400"
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <Trophy className='w-4 h-4' />
                    <span>Missions ({clan.missions.length})</span>
                  </div>
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='members'
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-900/20",
                    "data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400"
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <Users className='w-4 h-4' />
                    <span>Members ({clan._count.followers})</span>
                  </div>
                </Tabs.Trigger>
              </Tabs.List>
            </CardHeader>

            <CardContent>
              <Tabs.Content value='missions' className='pt-4'>
                {clan.missions.length > 0 ? (
                  <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                    {clan.missions.map((mission) => (
                      <Link
                        key={mission.id}
                        to={`/missions/${mission.id}`}
                        className='group'
                      >
                        <Card className='hover:shadow-lg border-2 hover:border-primary-500 dark:hover:border-primary-400 border-transparent overflow-hidden transition-all duration-300'>
                          <div className='p-4'>
                            <div className='flex items-start gap-4'>
                              <div className='flex flex-shrink-0 justify-center items-center bg-primary-100 dark:bg-primary-900/20 rounded-lg w-12 h-12 group-hover:scale-110 transition-transform'>
                                <Trophy className='w-6 h-6 text-primary-500' />
                              </div>
                              <div className='flex-1 min-w-0'>
                                <h3 className='font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors'>
                                  {mission.title}
                                </h3>
                                <p className='mt-1 text-gray-500 dark:text-gray-400 text-sm'>
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
                  <div className='py-12 text-center'>
                    <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-800 mx-auto mb-4 rounded-full w-16 h-16'>
                      <Trophy className='w-8 h-8 text-gray-400' />
                    </div>
                    <h3 className='font-medium text-gray-900 dark:text-white text-lg'>
                      No missions yet
                    </h3>
                    <p className='mt-1 text-gray-500 dark:text-gray-400'>
                      This clan is still preparing their first mission!
                    </p>
                  </div>
                )}
              </Tabs.Content>

              <Tabs.Content value='members' className='pt-4'>
                {clan.followers.length > 0 ? (
                  <div className='space-y-4'>
                    {clan.followers.map((member) => (
                      <motion.div
                        key={member.user.id}
                        className='group'
                        whileHover={{ scale: 1.01 }}
                      >
                        <Card className='hover:shadow-lg border-2 hover:border-primary-500 dark:hover:border-primary-400 border-transparent overflow-hidden transition-all duration-300'>
                          <div className='p-4'>
                            <div className='flex justify-between items-center'>
                              <div className='flex items-center'>
                                <Avatar
                                  fallback={member.user.wallet_address.substring(
                                    0,
                                    2
                                  )}
                                  size='md'
                                  className='group-hover:scale-110 transition-transform'
                                />
                                <div className='ml-4'>
                                  <h4 className='font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors'>
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
                  <div className='py-12 text-center'>
                    <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-800 mx-auto mb-4 rounded-full w-16 h-16'>
                      <Users className='w-8 h-8 text-gray-400' />
                    </div>
                    <h3 className='font-medium text-gray-900 dark:text-white text-lg'>
                      No members yet
                    </h3>
                    <p className='mt-1 text-gray-500 dark:text-gray-400'>
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

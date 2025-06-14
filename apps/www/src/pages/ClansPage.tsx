import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Search, Heart, Users, Trophy } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { cn, formatNumber } from "@/lib/utils";
import {
  useFollowClan,
  useGetAllClans,
  useProfile,
  useUnfollowClan,
} from "@/features";
import { toast } from "sonner";

export default function ClansPage() {
  const { data: clans } = useGetAllClans();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredClans = useMemo(() => {
    if (!clans?.clans) return [];

    let filtered = Array.isArray(clans?.clans) ? [...clans.clans] : [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (clan) =>
          clan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          clan.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [clans?.clans, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 opacity-10 rounded-3xl" />
        <div className="relative px-6 py-12 text-center rounded-3xl">
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Amazing Web3 Clans
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join forces with like-minded enthusiasts, complete missions
            together, and earn rewards!
          </motion.p>
        </div>
      </div>

      {/* Filters & Search */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search clans by name or description..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Clans Grid */}
      {filteredClans.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredClans.map((clan, index) => (
            <ClanCard key={clan.id} clan={clan} index={index} />
          ))}
        </motion.div>
      ) : (
        <Card className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No clans found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </Card>
      )}
    </div>
  );
}

function ClanCard({ clan, index }: { clan: any; index: number }) {
  const { data: profile } = useProfile();

  const isFollowingClan = profile?.joined_clans?.some(
    (followedClan) => followedClan.clan_id === clan.id
  );

  const followClan = useFollowClan();
  const unFollowClan = useUnfollowClan();

  function handleFollow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (isFollowingClan) {
      unFollowClan.mutate(clan.id, {
        onSuccess() {
          toast.success("Unfollowed clan successfully");
        },
        onError() {
          toast.error("Failed to unfollow clan");
        },
      });
    } else {
      followClan.mutate(clan.id, {
        onSuccess() {
          toast.success("Followed clan successfully");
        },
        onError() {
          toast.error("Failed to follow clan");
        },
      });
    }
  }

  return (
    <motion.div
      key={clan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
    >
      <Link to={`/clans/${clan.id}`}>
        <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Top Banner */}
          <div className="h-32 bg-gradient-to-br from-primary-500 to-secondary-500 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20" />

            {/* Clan Avatar */}
            <div className="absolute -bottom-8 left-4">
              <Avatar
                src={clan.logo_url}
                alt={clan.name}
                fallback={clan.name.substring(0, 2)}
                size="xl"
                className="border-4 border-white dark:border-gray-800 group-hover:scale-110 transition-transform"
              />
            </div>

            {/* Follow Button */}
            <button
              onClick={handleFollow}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  isFollowingClan ? "text-red-500 fill-red-500" : "text-white"
                )}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 pt-12">
            {/* Clan Info */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                {clan.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                {clan.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <Users className="w-4 h-4 mx-auto mb-1 text-primary-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatNumber(clan._count.followers)}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Members
                </p>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <Trophy className="w-4 h-4 mx-auto mb-1 text-secondary-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {clan._count.missions}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Missions
                </p>
              </div>
            </div>

            {/* Join Button */}
            <Button
              variant="primary"
              size="sm"
              className="w-full group-hover:shadow-lg transition-shadow"
            >
              View Clan
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
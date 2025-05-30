import { useState } from "react";
import {
  Search,
  Users,
  Star,
  Globe,
  Twitter,
  TrendingUp,
  Target,
  PlusIcon,
} from "lucide-react";
import {
  useGetAllClans,
  useGetUserFollowedClans,
  useFollowClan,
  useUnfollowClan,
} from "@/features";

export default function Clans() {
  const { data: allClans } = useGetAllClans();
  const { data: followedClans } = useGetUserFollowedClans();
  const followClan = useFollowClan();
  const unfollowClan = useUnfollowClan();

  const handleFollowClan = (clanId: string) => {
    followClan.mutate(clanId);
  };

  const handleUnfollowClan = (clanId: string) => {
    unfollowClan.mutate(clanId);
  };

  const isFollowing = (clanId: string) => {
    return followedClans?.data?.some((clan) => clan.id === clanId);
  };
  return (
    <div className="p-4 bg-[#020202] h-full">
      <div className="my-8 flex justify-between items-end">
        <div>
          <h1 className="font-bold text-4xl leading-normal">Explore Clans</h1>
          <p className="max-w-lg">
            Discover new communities, connect with like-minded individuals, and
            earn rewards by joining or creating clans. Your Web3 journey starts
            here.
          </p>
        </div>

        <button className="mt-4 bg-[#4DA2FF] text-white px-4 py-2 rounded-md">
          Create Clan
        </button>
      </div>
      <div className="grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid gap-4">
        {allClans?.clans?.map((clan) => (
          <ClanCard
            clan={clan}
            key={clan.id}
            isFollowing={Boolean(isFollowing(clan.id))}
            onFollow={handleFollowClan}
            onUnfollow={handleUnfollowClan}
          />
        ))}
      </div>
    </div>
  );
}

function ClanCard({
  clan,
  isFollowing,
  onFollow,
  onUnfollow,
}: {
  clan: any;
  isFollowing: boolean;
  onFollow: (id: string) => void;
  onUnfollow: (id: string) => void;
}) {
  if (!clan) return null;
  return (
    <div className="bg-[#020202]  border-2 border-[#A4A4A466] hover:border-[#4DA2FF] rounded-lg text-white">
      <div className="rounded-lg overflow-clip h-40">
        <img src="/clan.png" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="font-semibold text-lg">{clan?.name}</div>
          <button className="flex items-center justify-center bg-[#4DA2FF] px-2 py-1 rounded-sm cursor-pointer text-sm">
            {isFollowing ? (
              <>
                Follow <PlusIcon />
              </>
            ) : (
              <>Unfollow</>
            )}
          </button>
        </div>
        <div className="text-stone-600 text-sm">{clan?.description}</div>
      </div>
    </div>
  );
}

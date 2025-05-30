import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useCurrentUser } from "@/features";
import createWeb3Avatar from "web3-avatar";
import { useEffect, useRef, useState } from "react";
import { useWallets } from "@mysten/dapp-kit";
import coinSrc from "@/assets/coin.png";
import { CalendarDays, CopyIcon, Coins, Target, Users } from "lucide-react";
import { useGetCompletedMissions } from "@/features/missions/useGetCompletedMissions";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const user = useCurrentUser();
  const avatarRef = useRef<HTMLImageElement>(null);
  const completedMissions = useGetCompletedMissions();

  const truncateWalletAddress = (address?: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    if (!avatarRef.current || !user.data?.wallet_address) return;
    createWeb3Avatar(avatarRef.current, user.data?.wallet_address);
  }, [user.data?.wallet_address]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Profile Header */}
      <header className="flex flex-col items-center mb-8 md:mb-12">
        <div className="relative mb-4">
          <div className="border-2 border-[#4DA2FF] rounded-full size-20 mx-auto">
            <img className="size-full rounded-full" ref={avatarRef} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-white">
          <span>{truncateWalletAddress(user.data?.wallet_address)}</span>
          <button className="text-neutral-400 hover:text-white transition-colors">
            <CopyIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-sm text-neutral-400 mt-1">
          <CalendarDays className="w-4 h-4" />
          <span>
            Joined{" "}
            {new Date(user.data?.created_at || 0)?.toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </span>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {/* Total Blocks Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-white hover:bg-neutral-800 transition-colors">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-300">
              Total Blocks
            </h3>
            <Coins className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{user.data?.balance || 0}</div>
            <p className="text-xs text-neutral-500 mt-1">
              Your accumulated rewards
            </p>
          </div>
        </div>

        {/* Missions Completed Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-white hover:bg-neutral-800 transition-colors">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-300">
              Missions Completed
            </h3>
            <Target className="h-5 w-5 text-green-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {completedMissions.data?.length}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {completedMissions.data?.length || 0}
              progress
            </p>
          </div>
        </div>

        {/* Clans Affiliated Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-white hover:bg-neutral-800 transition-colors">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-neutral-300">
              Clans Affiliated
            </h3>
            <Users className="h-5 w-5 text-sky-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {(user.data?.joined_clans?.length || 0) +
                (user.data?.created_clans?.length || 0)}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {user.data?.created_clans?.length || 0} created,{" "}
              {user.data?.joined_clans?.length || 0} joined
            </p>
          </div>
        </div>
      </section>
      <Nfts />
    </div>
  );
}

function Nfts() {
  const [tab, setTab] = useState<"badges" | "achievements">("badges");
  return (
    <div>
      <div className="grid grid-cols-2 [&>button]:cursor-pointer [&>button]:py-2 mb-2">
        <button
          className={cn(tab === "badges" && "border-b-2 border-blue-500")}
          onClick={() => setTab("badges")}
        >
          Badges
        </button>
        <button
          className={cn(tab === "achievements" && "border-b-2 border-blue-500")}
          onClick={() => setTab("achievements")}
        >
          Achievements
        </button>
      </div>
      {tab === "badges" && <Badges />}
      {tab === "achievements" && <Achievements />}
    </div>
  );
}

function Badges() {
  return <div>Badges</div>;
}

function Achievements() {
  return <div>Achievements</div>;
}

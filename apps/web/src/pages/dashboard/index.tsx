import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
export default function Dashboard() {
  // This is where you would fetch user data, missions, etc.
  // For now, we'll just return a static dashboard layout.
  // Mock data for dashboard
  const mockDashboardData = {
    activeMissions: [
      {
        id: "m1",
        title: "Intro to Solidity",
        progress: 60,
        clan: "Crypto Coders",
      },
      {
        id: "m2",
        title: "NFT Marketplace Analysis",
        progress: 25,
        clan: "NFT Explorers",
      },
    ],

    recommendedMissions: [
      {
        id: "m3",
        title: "DeFi Staking Strategies",
        clan: "Yield Farmers",
        image: "/placeholder.svg?width=300&height=150&text=DeFi",
        duration: "2 hours",
        reward: 500,
      },
      {
        id: "m4",
        title: "Understanding Layer 2 Scaling",
        clan: "ETH Maximalists",
        image: "/placeholder.svg?width=300&height=150&text=L2",
        duration: "1.5 hours",
        reward: 400,
      },
    ],
  };
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>
      <p className="text-neutral-400 mb-10">
        Let's continue your Web3 learning journey.
      </p>{" "}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-300">
                Completed Missions
              </CardTitle>
              <BookOpen className="h-4 w-4 text-sky-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">5</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-300">
                Total Blocks
              </CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,249</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-300">
                Leaderboard Rank
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">#42</div>
            </CardContent>
          </Card>
        </div>
      </section>{" "}
      {/* ACTIVE MISSIONS */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Active Missions</h3>
          <Link
            to={"/dashboard/missions"}
            className="text-sky-500 flex items-center gap-2 border border-sky-500 py-3 px-6 rounded-lg cursor-pointer hover:bg-sky-500/10 transition-colors"
          >
            View All Missions
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockDashboardData.activeMissions.map((mission) => (
            <Card
              key={mission.id}
              className="bg-neutral-900 border-neutral-700 hover:border-sky-500/50 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{mission.title}</CardTitle>
                  <span className="text-xs bg-sky-500/20 text-sky-400 px-2 py-1 rounded-full">
                    {mission.progress}% Complete
                  </span>
                </div>
                <CardDescription className="text-neutral-400">
                  Progress in {mission.clan}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Progress</span>
                    <span className="text-white font-medium">
                      {mission.progress}%
                    </span>
                  </div>
                  <Progress
                    value={mission.progress}
                    className="bg-neutral-700"
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">Clan</span>
                    <span className="text-sm text-white font-medium">
                      {mission.clan}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* RECOMMENDED MISSIONS */}
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { LeaderboardEntry } from "@/types";
import { formatAddress, formatNumber } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Trophy, Medal, Search } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeaderboard, setFilteredLeaderboard] =
    useState(mockLeaderboard);
  const [filter, setFilter] = useState("all"); // all, clan, friends

  return null;

  return (
    <div className="space-y-6">
      <header>
        <motion.h1
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Leaderboard
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          See how you rank against other learners
        </p>
      </header>

      {/* Top 3 Winners Podium */}
      <motion.div
        className="hidden md:flex justify-center items-end gap-4 my-12 h-64"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* 2nd Place */}
        {leaderboard.length > 1 && (
          <div className="flex flex-col items-center">
            <Avatar
              fallback={leaderboard[1].username.substring(0, 2)}
              size="xl"
              className="mb-2"
            />
            <div className="text-center">
              <p className="font-bold text-gray-900 dark:text-white">
                {leaderboard[1].username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(leaderboard[1].points)} pts
              </p>
            </div>
            <div className="w-24 h-40 mt-4 bg-secondary-500 rounded-t-lg flex items-center justify-center">
              <Medal size={32} className="text-white" />
              <span className="ml-2 text-xl font-bold text-white">2</span>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {leaderboard.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar
                fallback={leaderboard[0].username.substring(0, 2)}
                size="xl"
                className="mb-2"
              />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 dark:text-white">
                {leaderboard[0].username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(leaderboard[0].points)} pts
              </p>
            </div>
            <div className="w-24 h-52 mt-4 bg-primary-600 rounded-t-lg flex items-center justify-center">
              <Crown size={40} className="text-white" />
              <span className="ml-2 text-2xl font-bold text-white">1</span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {leaderboard.length > 2 && (
          <div className="flex flex-col items-center">
            <Avatar
              fallback={leaderboard[2].username.substring(0, 2)}
              size="xl"
              className="mb-2"
            />
            <div className="text-center">
              <p className="font-bold text-gray-900 dark:text-white">
                {leaderboard[2].username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(leaderboard[2].points)} pts
              </p>
            </div>
            <div className="w-24 h-32 mt-4 bg-accent-500 rounded-t-lg flex items-center justify-center">
              <Medal size={32} className="text-white" />
              <span className="ml-2 text-xl font-bold text-white">3</span>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card variant="bordered">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Rankings</CardTitle>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full sm:w-60 pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>

          <Tabs.Root defaultValue="all" onValueChange={setFilter}>
            <div className="px-6">
              <Tabs.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
                <Tabs.Trigger
                  value="all"
                  className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
                >
                  Global
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="clan"
                  className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
                >
                  My Clan
                </Tabs.Trigger>
              </Tabs.List>
            </div>

            <CardContent>
              <Tabs.Content value="all" className="pt-4">
                {renderLeaderboard(filteredLeaderboard, user?.id)}
              </Tabs.Content>

              <Tabs.Content value="clan" className="pt-4">
                {filteredLeaderboard.length > 0 ? (
                  renderLeaderboard(filteredLeaderboard, user?.id)
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      You need to join a clan first
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

function renderLeaderboard(
  entries: LeaderboardEntry[],
  currentUserId?: string
) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No results found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-700">
            <th className="pb-3 pl-4 pr-1 font-medium text-gray-500 dark:text-gray-400 text-sm">
              #
            </th>
            <th className="pb-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-sm">
              User
            </th>
            <th className="pb-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-sm">
              Clan
            </th>
            <th className="pb-3 px-2 font-medium text-gray-500 dark:text-gray-400 text-sm text-right">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isCurrentUser = entry.userId === currentUserId;
            return (
              <tr
                key={entry.userId}
                className={`border-b border-gray-100 dark:border-gray-800 ${
                  isCurrentUser
                    ? "bg-primary-50 dark:bg-primary-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                } transition-colors`}
              >
                <td className="py-4 pl-4 pr-1 text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    {entry.rank <= 3 ? (
                      <span
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                          entry.rank === 1
                            ? "bg-yellow-100 text-yellow-600"
                            : entry.rank === 2
                              ? "bg-gray-100 text-gray-600"
                              : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {entry.rank === 1 ? (
                          <Crown className="h-4 w-4" />
                        ) : (
                          entry.rank
                        )}
                      </span>
                    ) : (
                      <span className="text-sm font-medium">{entry.rank}</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <Avatar
                      fallback={entry.username.substring(0, 2)}
                      size="sm"
                      className="mr-2"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        {entry.username}
                        {isCurrentUser && (
                          <Badge variant="primary\" size="sm">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatAddress(entry.wallet_address)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  {entry.clan ? (
                    <div className="flex items-center">
                      <Avatar
                        src={entry.clan.logo_url}
                        alt={entry.clan.name}
                        fallback={entry.clan.name.substring(0, 2)}
                        size="xs"
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {entry.clan.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      -
                    </span>
                  )}
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatNumber(entry.points)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Crown(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  );
}

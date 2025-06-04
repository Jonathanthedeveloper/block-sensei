import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { formatAddress, formatNumber, cn } from "../lib/utils";
import { Copy, Award, Trophy, Wallet, Gift, LogOut } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { useProfile } from "@/features";
import { useNavigate } from "react-router-dom";
import { useDisconnectWallet } from "@mysten/dapp-kit";

export default function ProfilePage() {
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const disconnectWallet = useDisconnectWallet();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  if (!profile) return null;

  const stats = [
    {
      title: "Total BLOCK Earned",
      value: formatNumber(profile.block_balance),
      icon: <Gift className="text-primary-500" />,
      color: "from-primary-500 to-secondary-500",
    },
    {
      title: "Available BLOCK",
      value: formatNumber(profile.block_balance),
      icon: <Wallet className="text-secondary-500" />,
      color: "from-secondary-500 to-accent-500",
    },
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(profile.wallet_address);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWithdrawing(true);

    // Simulate withdrawal
    setTimeout(() => {
      setIsWithdrawing(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount("");
      setWalletAddress("");
    }, 2000);
  };

  const handleLogout = () => {
    // Disconnect wallet
    disconnectWallet.mutate();
    // Clear user session and redirect to login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <Avatar
                  fallback={formatAddress(profile.wallet_address)}
                  size="xl"
                  className="border-4 border-white/10"
                />
                <div>
                  <h2 className="text-xl font-bold">Wallet Address</h2>
                  <div className="flex items-center gap-2 mb-2">
                    {" "}
                    <p className="text-gray-500 dark:text-gray-300 font-mono">
                      {formatAddress(profile.wallet_address)}
                    </p>
                    <button
                      onClick={copyAddress}
                      className="p-1 hover:bg-white/10 rounded-md transition-colors"
                      title="Copy address"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:ml-auto flex gap-3">
                <Button
                  className="cursor-pointer text-sm sm:text-base"
                  variant="primary"
                  size="lg"
                  onClick={() => setIsWithdrawModalOpen(true)}
                  icon={<Wallet className="w-5 h-5" />}
                >
                  Withdraw BLOCK
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLogout}
                  icon={<LogOut className="w-5 h-5" />}
                  className="dark:border-white/20 dark:text-white dark:hover:bg-white/10 cursor-pointer text-sm sm:text-base"
                >
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Badges and Certificates Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <Tabs.Root defaultValue="badges">
            <CardHeader className="border-b dark:border-gray-800">
              <div className="flex items-center justify-between">
                <Tabs.List className="flex space-x-1">
                  <Tabs.Trigger
                    value="badges"
                    className={cn(
                      "px-6 py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                      "text-gray-400 hover:text-gray-500 hover:bg-primary-400 dark:hover:text-white dark:hover:bg-white/5",
                      "data-[state=active]:bg-primary-500 data-[state=active]:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>Badges (3)</span>
                    </div>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="certificates"
                    className={cn(
                      "px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      "text-gray-400 dark:hover:text-white dark:hover:bg-white/5",
                      "data-[state=active]:bg-primary-500 data-[state=active]:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>NFT Certificates (0)</span>
                    </div>
                  </Tabs.Trigger>
                </Tabs.List>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <Tabs.Content value="badges">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    YOUR BADGES
                  </h2>
                  <p className="text-gray-400">
                    All your awesome Badges are displayed here. Something to
                    brag about! 😎
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  {/* Example Badges */}
                  {[
                    {
                      name: "Mission Solver x1",
                      image: "🏅",
                      color: "bg-gray-700",
                    },
                    {
                      name: "Bits Seeker x1000",
                      image: "🌟",
                      color: "bg-yellow-600",
                    },
                    {
                      name: "Friend Collector x5",
                      image: "👥",
                      color: "bg-blue-600",
                    },
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className={`relative aspect-square rounded-2xl ${badge.color} p-6 flex flex-col items-center justify-center text-center transition-transform group-hover:shadow-xl`}
                      >
                        <div className="text-4xl mb-2">{badge.image}</div>
                        <h3 className="text-white text-sm font-medium">
                          {badge.name}
                        </h3>
                        <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Tabs.Content>

              <Tabs.Content value="certificates">
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    No Certificates Yet
                  </h3>
                  <p className="text-gray-400">
                    Complete missions to earn NFT certificates!
                  </p>
                </div>
              </Tabs.Content>
            </CardContent>
          </Tabs.Root>
        </Card>
      </motion.div>

      {/* Withdraw Modal */}
      <Dialog.Root
        open={isWithdrawModalOpen}
        onOpenChange={setIsWithdrawModalOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 p-6 focus:outline-none">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Withdraw BLOCK
            </Dialog.Title>

            <form onSubmit={handleWithdraw}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="1"
                      max={profile.block_balance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter amount"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 dark:text-gray-400">
                        BLOCK
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Available: {formatNumber(profile.block_balance)} BLOCK
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Destination Address
                  </label>
                  <input
                    type="text"
                    required
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter SUI wallet address"
                  />
                </div>

                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
                  <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
                    Withdrawal Information
                  </h4>
                  <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300 list-disc list-inside">
                    <li>Minimum withdrawal: 1 BLOCK</li>
                    <li>No withdrawal fees</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsWithdrawModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isWithdrawing}
                  disabled={!withdrawAmount || !walletAddress}
                  icon={<Wallet className="w-4 h-4" />}
                >
                  Confirm Withdrawal
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

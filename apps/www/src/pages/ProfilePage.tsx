import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { formatAddress, formatNumber, cn } from "@/lib/utils";
import {
  Copy,
  Award,
  Trophy,
  Wallet,
  Gift,
  LogOut,
  ExternalLink,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { useProfile } from "@/features";
import { useNavigate } from "react-router-dom";
import { useDisconnectWallet } from "@mysten/dapp-kit";
import { useCertificates } from "@/features/missions/useCertificates";
import { useWithdrawBlock } from "@/features/profile/useWithdrawBlock";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const withdrawSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  recipient: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/, "Invalid wallet address format"),
});

export default function ProfilePage() {
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const disconnectWallet = useDisconnectWallet();
  const { data: certificates } = useCertificates();


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

  const copyAddress = async () => {
    await navigator.clipboard.writeText(profile.wallet_address);
    toast.success("Address copied to clipboard")
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
                <WithdrawBlockModal />
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
          <Tabs.Root defaultValue="certificates">
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
                      <span>Badges</span>
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
                      <span>
                        NFT Certificates ({certificates?.length || 0})
                      </span>
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
                    All your awesome Badges will be displayed here. Something to
                    brag about! 😎
                  </p>
                </div>

                <div className="text-center">Coming Soon! 🚧</div>
              </Tabs.Content>

              <Tabs.Content value="certificates">
                <CertificatesDisplay />
              </Tabs.Content>
            </CardContent>
          </Tabs.Root>
        </Card>
      </motion.div>
    </div>
  );
}

function WithdrawBlockModal() {
  const { data: profile } = useProfile();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 0,
      recipient: "",
    },
  });

  const withdraw = useWithdrawBlock();

  function onSubmit(data: z.infer<typeof withdrawSchema>) {
    console.log("Withdrawing BLOCK:", data);
    withdraw.mutate(
      {
        amount: data.amount,
        recipientAddress: data.recipient,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          toast.success("Withdrawal successful! BLOCK sent.");
        },
        onError: (error) => {
          console.error("Withdrawal error:", error);
          toast.error(`Withdrawal failed: ${error.message}`);
        },
      }
    );
  }

  useEffect(()=> {
    if(!open) {
      form.reset();
    }
  }, [open, form])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          className="cursor-pointer text-sm sm:text-base"
          variant="primary"
          size="lg"
          icon={<Wallet className="w-5 h-5" />}
        >
          Withdraw BLOCK
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 p-6 focus:outline-none">
          <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Withdraw BLOCK
          </Dialog.Title>

          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    step="0.000000001"
                    max={profile?.block_balance}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter amount"
                    {...form.register("amount")}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      BLOCK
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Available: {formatNumber(profile?.block_balance || 0)} BLOCK
                </p>
                <button
                  type="button"
                  className="mt-1 text-xs text-primary-500 hover:text-primary-600"
                  onClick={() =>
                    form.setValue("amount", profile?.block_balance || 0)
                  }
                >
                  Use max amount
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Destination Address
                </label>
                <input
                  type="text"
                  required
                  {...form.register("recipient")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter SUI wallet address (0x...)"
                />
                <button
                  type="button"
                  className="mt-1 text-xs text-primary-500 hover:text-primary-600"
                  onClick={() =>
                    form.setValue("recipient", profile?.wallet_address || "")
                  }
                >
                  Use my wallet address
                </button>
              </div>

              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
                <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
                  Withdrawal Information
                </h4>
                <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300 list-disc list-inside">
                  <li>Minimum withdrawal: 1 BLOCK</li>
                  <li>
                    Tokens will be sent to the specified address on the Sui
                    network
                  </li>
                  <li>Transaction may take a few moments to process</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={withdraw.isPending}
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                type="submit"
                isLoading={withdraw.isPending}
                disabled={
                  !form.watch("amount") ||
                  !form.watch("recipient") ||
                  withdraw.isPending
                }
                icon={<Wallet className="w-4 h-4" />}
              >
                Confirm Withdrawal
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CertificatesDisplay() {
  const { data: certificates } = useCertificates();

  return (certificates?.length || 0) > 0 ? (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
      {certificates?.map((certificate) => (
        <motion.div
          key={certificate.id}
          className="group"
          whileHover={{ scale: 1.03 }}
        >
          <div className="bg-gradient-to-br from-primary-900/50 to-secondary-900/50 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            {/* Square aspect ratio container */}
            <div className="aspect-square relative overflow-hidden">
              {certificate.imageUrl ? (
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-800/50">
                  <Award className="w-16 h-16 text-primary-400" />
                </div>
              )}
              
              
            </div>

            <div className="p-3 flex justify-between items-center bg-black/30">
              <span className="text-xs text-gray-400">
                {new Date(
                  parseInt(certificate.completedAt) * 1000
                ).toLocaleDateString()}
              </span>
              <a
                href={`https://suiscan.xyz/testnet/object/${certificate.objectId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                <span>View on Sui</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Award className="w-12 h-12 text-gray-600" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">
        No Certificates Yet
      </h3>
      <p className="text-gray-400">
        Complete missions to earn NFT certificates!
      </p>
    </div>
  );
}

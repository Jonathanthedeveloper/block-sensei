import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sword, Trophy, Users, Award, Star, Gift, Crown } from "lucide-react";
import { useAccounts, ConnectButton } from "@mysten/dapp-kit";
import { useLogin } from "@/features";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const login = useLogin();
  const accounts = useAccounts();

  useEffect(() => {
    if (login.isPending || login.isSuccess) return;
    if (accounts.length > 0) {
      const account = accounts[0];
      login.mutate(
        {
          address: account.address,
        },
        {
          onSuccess: () => {
            navigate("dashboard");
          },
        }
      );
    }
  }, [accounts, login, navigate]);

  const stats = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      value: "50K+",
      label: "Active Players",
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: <Gift className="h-8 w-8 text-purple-500" />,
      value: "1M+",
      label: "BLOCK Earned",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <Star className="h-8 w-8 text-blue-500" />,
      value: "100K+",
      label: "Quests Completed",
      color: "from-blue-500/20 to-cyan-500/20",
    },
  ];

  const features = [
    {
      icon: <Users className="h-12 w-12" />,
      title: "Join Web3 Clans",
      description: "Team up with fellow adventurers in specialized Web3 clans",
      color: "from-blue-600 to-indigo-600",
      delay: 0.2,
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "Complete Missions",
      description: "Embark on exciting missions to earn rewards and level up",
      color: "from-purple-600 to-pink-600",
      delay: 0.3,
    },
    {
      icon: <Sword className="h-12 w-12" />,
      title: "Battle Challenges",
      description: "Test your skills in daily challenges and competitions",
      color: "from-orange-600 to-red-600",
      delay: 0.4,
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Earn NFT Rewards",
      description:
        "Collect unique badges and certificates on the Sui blockchain",
      color: "from-green-600 to-teal-600",
      delay: 0.5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-primary-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative">
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <nav className="relative flex items-center justify-between sm:h-10 mb-16">
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <motion.a
                  href="#"
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Crown className="h-12 w-12 text-primary-400" />
                  <span className="text-3xl font-bold text-white font-display">
                    Block Sensei
                  </span>
                </motion.a>
              </div>
            </div>
          </nav>

          <div className="relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 font-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Master Web3 Skills
                <span className="block text-gradient bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                  The Fun Way
                </span>
              </motion.h1>

              <motion.p
                className="max-w-2xl mx-auto text-xl text-gray-300 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Join the ultimate Web3 learning adventure. Complete missions,
                earn rewards, and become a blockchain master!
              </motion.p>

              <motion.p
                className="max-w-2xl mx-auto text-lg text-primary-400 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Powered by the Sui blockchain
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ConnectButton className="min-w-[200px] bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:shadow-lg transition-all duration-300">
                  Start Your Journey
                </ConnectButton>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-white/10 rounded-lg rotate-6" />
                    <div className="absolute inset-0 bg-white/20 rounded-lg -rotate-3" />
                    <div
                      className={`relative bg-gradient-to-br ${stat.color} rounded-lg p-3`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl font-bold text-white mb-4 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Adventure Awaits
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover a new way to master Web3 skills on Sui
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="mb-4 inline-block">
                      <div
                        className={`relative p-3 rounded-lg bg-gradient-to-br ${feature.color}`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative bg-gradient-to-b from-gray-900 to-primary-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 font-display">
              Ready to Begin Your Adventure?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
              Connect your Sui wallet and start earning rewards today!
            </p>
            <ConnectButton className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:shadow-lg transition-all duration-300">
              Start Now
            </ConnectButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

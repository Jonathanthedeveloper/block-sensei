import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sword, Trophy, Users, Award } from "lucide-react";
import { useAccounts, ConnectButton } from "@mysten/dapp-kit";
import { useLogin } from "@/features";
import { useEffect } from "react";
import Card from "@/components/card";
import Card_img from "@/assets/card_img1.png";
import Divider from "@/components/divider";
import sui from "@/assets/sui.png";
import Logo from "@/assets/Logo.png";

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

  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Join Web3 Clans",
      description: "Team up with fellow adventurers in specialized Web3 clans",
      color: "from-blue-600 to-indigo-600",
      delay: 0.2,
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: "Complete Missions",
      description: "Embark on exciting missions to earn rewards and level up",
      color: "from-purple-600 to-pink-600",
      delay: 0.3,
    },
    {
      icon: <Sword className="w-12 h-12" />,
      title: "Battle Challenges",
      description: "Test your skills in daily challenges and competitions",
      color: "from-orange-600 to-red-600",
      delay: 0.4,
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Earn NFT Rewards",
      description:
        "Collect unique badges and certificates on the Sui blockchain",
      color: "from-green-600 to-teal-600",
      delay: 0.5,
    },
  ];

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section - Replaced with your code */}
      <div className="relative bg-gradient-to-b from-gray-900 to-primary-900 rounded-b-4xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 max-w-7xl">
          <nav className="relative flex justify-between items-center mb-16 sm:h-10">
            <div className="flex flex-grow lg:flex-grow-0 flex-shrink-0 justify-between items-center w-full">
              <div className="flex justify-between items-center w-full md:w-auto">
                <motion.a
                  href="#"
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={Logo} alt="logo" />
                </motion.a>
              </div>
              <ConnectButton className="flex justify-center items-center gap-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-light text-white text-sm cursor-pointer" />
            </div>
          </nav>

          {/* Your main content for the hero section */}
          <motion.div
            className="flex flex-col justify-center items-center gap-12 bg-gradient-to-b from-transparent to-primary mt-20 rounded-bl-4xl rounded-br-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center gap-4 border border-primary rounded-full text-light text-sm cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-between items-center gap-2 px-4 py-2 cursor-pointer">
                <img src={sui} alt="sui" />
                <h3>Built On Sui</h3>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-4 px-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="font-Sora font-bold text-4xl">
                Learn Web3 the Fun Way — Guided by Your Sensei.
              </h1>
              <p>
                Web 3 is hard, we make it simple through a gamified interactive
                learning experience that simplifies Web3 and rewards learners{" "}
                <br />
                by letting them earn in Web 3 while learning.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-2 text-xs"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card forConnect imageUrl={Card_img} btn="Get Started" />
              <h3 className="font-semibold">The Block Sensei Journey</h3>
              <div className="flex flex-wrap items-center place-content-center gap-1 px-5 w-full text-accent">
                <p>Basics</p>
                <Divider />
                <p> Do Web 3 Stuff</p>
                <Divider />
                <p>Advanced</p>
                <Divider />
                <p>NFT Certificates</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section (Original from his code - kept for structure) */}
      <div className="relative bg-gray-900 py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              className="mb-4 font-display font-bold text-white text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Adventure Awaits
            </motion.h2>
            <motion.p
              className="text-gray-400 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover a new way to master Web3 skills on Sui
            </motion.p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl h-60 md:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="inline-block mb-4">
                      <div
                        className={`relative p-3 rounded-lg bg-gradient-to-br ${feature.color}`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="mb-2 font-bold text-white text-xl">
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

      {/* CTA Section (Original from his code - kept for structure) */}
      <div className="relative bg-gradient-to-b from-gray-900 to-primary-900 rounded-b-4xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-display font-bold text-white text-3xl sm:text-4xl tracking-tight">
              Ready to Begin Your Adventure?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400 text-lg">
              Connect your Sui wallet and start earning rewards today!
            </p>
            <ConnectButton className="bg-gradient-to-r from-primary-500 via-secondary-500 hover:shadow-lg transition-all duration-300 to-accent-500">
              Start Now
            </ConnectButton>
          </motion.div>
        </div>
      </div>

      {/* Your Footer */}
      {/* Enhanced Footer */}
      <motion.footer
        className="bg-gray-900 border-t border-gray-800 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-1">
              <img src={Logo} alt="Block Sensei" className="h-10 mb-4" />
              <p className="text-gray-400 text-sm mb-4">
                Gamified Web3 learning platform built on Sui blockchain. Learn,
                earn, and connect with the community.
              </p>
              <div className="flex space-x-4 text-gray-400">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 013.5 4.598a4.107 4.107 0 001.27 5.477A4.073 4.073 0 013.8 9.5v.054a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.385-.403.8-.546 1.17-.581-.109-1.153-.109-1.727 0-.131-.341-.341-.775-.549-1.17a.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.319 13.555.099 17.961a.08.08 0 0 0 .031.055c1.875 1.376 3.77 2.212 5.624 2.767a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106c-.609-.23-1.196-.51-1.761-.84a.077.077 0 0 1-.007-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c-.552.332-1.139.61-1.761.842a.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028c1.867-.554 3.762-1.39 5.637-2.766a.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div className="col-span-1">
              <h3 className="text-white font-bold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Missions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Clans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Leaderboards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Rewards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Marketplace
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="col-span-1">
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-span-1">
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href={`https://explorer.sui.io/object/${import.meta.env.VITE_SUI_PACKAGE_ID || ""}?network=${import.meta.env.VITE_SUI_NETWORK || "testnet"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Smart Contract
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Block Sensei. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">Powered by</p>
              <a
                href="https://sui.io"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center"
              >
                <img src={sui} alt="Sui" className="h-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}

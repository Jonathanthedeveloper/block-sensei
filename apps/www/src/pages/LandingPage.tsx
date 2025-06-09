import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sword, Trophy, Users, Award } from "lucide-react";
import { useAccounts, ConnectButton } from "@mysten/dapp-kit";
import { useLogin } from "@/features";
import { useEffect } from "react";

// import Card from "../components/card";
// import Card_img from "../assets/card_img1.png";
// import Divider from "../components/divider";
import sui from "../assets/sui.png";
import Logo from "../assets/Logo.png";

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

  // Original stats and features from the provided LandingPage (kept in case you want to reintroduce them or parts of them)
  // const stats = [
  //   {
  //     icon: <Trophy className='w-8 h-8 text-yellow-500' />,
  //     value: "50K+",
  //     label: "Active Players",
  //     color: "from-yellow-500/20 to-orange-500/20",
  //   },
  //   {
  //     icon: <Gift className='w-8 h-8 text-purple-500' />,
  //     value: "1M+",
  //     label: "BLOCK Earned",
  //     color: "from-purple-500/20 to-pink-500/20",
  //   },
  //   {
  //     icon: <Star className='w-8 h-8 text-blue-500' />,
  //     value: "100K+",
  //     label: "Quests Completed",
  //     color: "from-blue-500/20 to-cyan-500/20",
  //   },
  // ];

  const features = [
    {
      icon: <Users className='w-12 h-12' />,
      title: "Join Web3 Clans",
      description: "Team up with fellow adventurers in specialized Web3 clans",
      color: "from-blue-600 to-indigo-600",
      delay: 0.2,
    },
    {
      icon: <Trophy className='w-12 h-12' />,
      title: "Complete Missions",
      description: "Embark on exciting missions to earn rewards and level up",
      color: "from-purple-600 to-pink-600",
      delay: 0.3,
    },
    {
      icon: <Sword className='w-12 h-12' />,
      title: "Battle Challenges",
      description: "Test your skills in daily challenges and competitions",
      color: "from-orange-600 to-red-600",
      delay: 0.4,
    },
    {
      icon: <Award className='w-12 h-12' />,
      title: "Earn NFT Rewards",
      description:
        "Collect unique badges and certificates on the Sui blockchain",
      color: "from-green-600 to-teal-600",
      delay: 0.5,
    },
  ];

  return (
    <main className='bg-gray-900 min-h-screen text-white'>
      {/* Hero Section - Replaced with your code */}
      <div className='relative bg-gradient-to-b from-gray-900 to-primary-900 rounded-b-4xl'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 max-w-7xl'>
          <nav className='relative flex justify-between items-center mb-16 sm:h-10'>
            <div className='flex flex-grow lg:flex-grow-0 flex-shrink-0 justify-between items-center w-full'>
              <div className='flex justify-between items-center w-full md:w-auto'>
                <motion.a
                  href='#'
                  className='flex items-center space-x-3'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={Logo} alt='logo' />
                </motion.a>
              </div>
              <ConnectButton className='flex justify-center items-center gap-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-light text-white text-sm cursor-pointer' />
            </div>
          </nav>

          {/* Your main content for the hero section */}
          <motion.div
            className='flex flex-col justify-center items-center gap-12 bg-gradient-to-b from-transparent to-primary mt-20 rounded-bl-4xl rounded-br-4xl'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='flex items-center gap-4 border border-primary rounded-full text-light text-sm cursor-pointer'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='flex justify-between items-center gap-2 px-4 py-2 cursor-pointer'>
                <img src={sui} alt='sui' />
                <h3>Built On Sui</h3>
              </div>
            </motion.div>

            <motion.div
              className='flex flex-col items-center gap-4 px-4 text-center'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className='font-Sora font-bold text-4xl'>
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
              className='flex flex-col items-center gap-2 text-xl'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ConnectButton
                connectText=' Start Now'
                className='bg-gradient-to-r from-primary-500 to-secondary-500 shadow-md hover:shadow-xl px-6 py-3 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300 ease-in-out transform'
              />

              {/* <Card forConnect imageUrl={Card_img} btn='Get Started' />
              <h3 className='font-semibold'>The Block Sensei Journey</h3>
              <div className='flex flex-wrap items-center place-content-center gap-1 px-5 w-full text-accent'>
                <p>Basics</p>
                <Divider />
                <p> Do Web 3 Stuff</p>
                <Divider />
                <p>Advanced</p>
                <Divider />
                <p>NFT Certificates</p>
              </div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section (Original from his code - kept for structure) */}
      <div className='relative bg-gray-900 py-20'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
          <div className='mb-16 text-center'>
            <motion.h2
              className='mb-4 font-display font-bold text-white text-3xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Adventure Awaits
            </motion.h2>
            <motion.p
              className='text-gray-400 text-xl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover a new way to master Web3 skills on Sui
            </motion.p>
          </div>

          <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className='group relative'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <div className='relative bg-white/5 backdrop-blur-sm p-6 rounded-xl h-60 md:h-64 overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity' />

                  <div className='relative'>
                    <div className='inline-block mb-4'>
                      <div
                        className={`relative p-3 rounded-lg bg-gradient-to-br ${feature.color}`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className='mb-2 font-bold text-white text-xl'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-400'>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section (Original from his code - kept for structure) */}
      <div className='relative bg-gradient-to-b from-gray-900 to-primary-900 rounded-b-4xl'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl'>
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='mb-4 font-display font-bold text-white text-3xl sm:text-4xl tracking-tight'>
              Ready to Begin Your Adventure?
            </h2>
            <p className='mx-auto mb-8 max-w-2xl text-gray-400 text-lg'>
              Connect your Sui wallet and start earning rewards today!
            </p>
            <ConnectButton className='bg-gradient-to-r from-primary-500 via-secondary-500 hover:shadow-lg transition-all duration-300 to-accent-500'>
              Start Now
            </ConnectButton>
          </motion.div>
        </div>
      </div>

      {/* Your Footer */}
      <motion.div
        className='flex flex-col items-center gap-2 py-6 text-gray-400 text-light text-sm'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p>Group 1 Project</p>
        <p>All Rights Reserved. Copyright © Group 1</p>
      </motion.div>
    </main>
  );
}

import { useGetAllMissions } from "@/features";
import { AwardIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import coinSrc from "@/assets/coin.png";

export default function MissionsPage() {
  const missions = useGetAllMissions();
  return (
    <div>
      <div className="my-8 flex justify-between items-end">
        <div>
          <h1 className="font-bold text-4xl leading-normal">Explore Lessons</h1>
          <p>
            Discover new skills and earn Blocks. Your Web3 journey starts here.
          </p>
        </div>

        <button className="mt-4 bg-[#4DA2FF] text-white px-4 py-2 rounded-md">
          Create Lesson
        </button>
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {missions.data?.missions?.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
}

function MissionCard({ mission }) {
  return (
    <div className="bg-[#121228] rounded-2xl overflow-hidden border-2 border-[#2C2C44] hover:border-[#4DA2FF] flex flex-col h-full shadow-lg hover:shadow-[#4DA2FF33] transition-shadow container mx-auto">
      {/* Card image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1E1E3A] to-[#121228]">
        <img
          src="/clan.png"
          alt={mission.title}
          className="w-full h-full object-cover"
        />

        {/* Duration badge */}
        <div className="absolute top-3 left-3 bg-[#0066CC] text-white px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
          <ClockIcon size={14} />
          <span>{mission.duration || "3"} mins</span>
        </div>

        {/* Reward badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FACC15] to-[#7A5FFF] text-white px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
          <img src={coinSrc} alt="Blocks" className="w-4 h-4" />
          <span>{mission.reward || "800"}</span>
        </div>

        {/* Brand logo if available */}
        <div className="absolute bottom-3 left-3  flex  items-end w-full">
          <div className="bg-[#121228] rounded-md">
            <img
              src="/clan.png"
              alt={mission.partner_name || "Partner"}
              className="size-8 object-contain"
            />
          </div>
          <div className="text-right font-semibold mx-4">
            {mission.clan.name}
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-white text-lg mb-2">{mission.title}</h3>
        <p className="text-[#A4A4A4] text-sm flex-grow mb-4">{mission.brief}</p>
      </div>
    </div>
  );
}

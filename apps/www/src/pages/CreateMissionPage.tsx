import { useParams } from "react-router-dom";
import MissionForm from "@/components/mission/MissionForm";

export default function CreateMissionPage() {
  const { clanId } = useParams<{
    clanId: string;
    missionId?: string;
  }>();

  if (!clanId) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center text-red-500">No clan ID provided</div>
      </div>
    );
  }

  return <MissionForm clanId={clanId} />;
}

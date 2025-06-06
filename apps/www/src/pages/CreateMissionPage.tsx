import { useNavigate, useParams } from "react-router-dom";
import MissionForm from "@/components/mission/MissionForm";

export default function CreateMissionPage() {
  const navigate = useNavigate();
  const { clanId, missionId } = useParams<{
    clanId: string;
    missionId?: string;
  }>();

  const isEditMode = !!missionId;

  const handleCancel = () => {
    navigate("/studio");
  };

  if (!clanId) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center text-red-500">No clan ID provided</div>
      </div>
    );
  }

  return <MissionForm clanId={clanId} />;
}

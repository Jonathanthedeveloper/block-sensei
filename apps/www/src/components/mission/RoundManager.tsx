import React, { memo, useCallback } from "react";
import { Accordion } from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import type { MissionRound } from "@/features/missions/hooks/useMissionForm";
import Round from "./Round";

interface RoundManagerProps {
  rounds: MissionRound[];
  onRoundsChange: (rounds: MissionRound[]) => void;
  onAddRound: () => void;
  onRemoveRound: (index: number) => void;
}

const RoundManager: React.FC<RoundManagerProps> = ({
  rounds,
  onRoundsChange,
  onAddRound,
  onRemoveRound,
}) => {
  const handleUpdateRound = useCallback(
    (roundIndex: number, field: string, value: string | number) => {
      const newRounds = [...rounds];
      if (field.includes(".")) {
        const [parent, child, grandchild] = field.split(".");
        if (grandchild) {
          (newRounds[roundIndex] as any)[parent][child][grandchild] = value;
        } else {
          (newRounds[roundIndex] as any)[parent][child] = value;
        }
      } else {
        (newRounds[roundIndex] as any)[field] = value;
      }
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  const handleAddQuestion = useCallback(
    (roundIndex: number) => {
      const newRounds = [...rounds];
      newRounds[roundIndex].quest.quiz.push({
        question: "",
        options: ["", ""],
        answer: "",
      });
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  const handleRemoveQuestion = useCallback(
    (roundIndex: number, questionIndex: number) => {
      const newRounds = [...rounds];
      newRounds[roundIndex].quest.quiz = newRounds[
        roundIndex
      ].quest.quiz.filter((_, i) => i !== questionIndex);
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  const handleAddOption = useCallback(
    (roundIndex: number, questionIndex: number) => {
      if (rounds[roundIndex].quest.quiz[questionIndex].options.length >= 4)
        return;

      const newRounds = [...rounds];
      newRounds[roundIndex].quest.quiz[questionIndex].options.push("");
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  const handleRemoveOption = useCallback(
    (roundIndex: number, questionIndex: number, optionIndex: number) => {
      if (rounds[roundIndex].quest.quiz[questionIndex].options.length <= 2)
        return;

      const newRounds = [...rounds];
      newRounds[roundIndex].quest.quiz[questionIndex].options = newRounds[
        roundIndex
      ].quest.quiz[questionIndex].options.filter((_, i) => i !== optionIndex);
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  const handleUpdateQuestion = useCallback(
    (
      roundIndex: number,
      questionIndex: number,
      field: string,
      value: string
    ) => {
      const newRounds = [...rounds];
      newRounds[roundIndex].quest.quiz[questionIndex][field] = value;
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  const handleUpdateOption = useCallback(
    (
      roundIndex: number,
      questionIndex: number,
      optionIndex: number,
      value: string
    ) => {
      const newRounds = [...rounds];
      const oldOption =
        newRounds[roundIndex].quest.quiz[questionIndex].options[optionIndex];
      newRounds[roundIndex].quest.quiz[questionIndex].options[optionIndex] =
        value;

      // Update answer if it was the selected option
      if (
        newRounds[roundIndex].quest.quiz[questionIndex].answer === oldOption
      ) {
        newRounds[roundIndex].quest.quiz[questionIndex].answer = value;
      }
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  const handleSelectAnswer = useCallback(
    (roundIndex: number, questionIndex: number, option: string) => {
      const newRounds = [...rounds];
      newRounds[roundIndex].quest.quiz[questionIndex].answer = option;
      onRoundsChange(newRounds);
    },
    [rounds, onRoundsChange]
  );

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue={`round-0`}>
        {rounds.map((round, index) => (
          <Round
            key={`round-${index}`}
            round={round}
            roundIndex={index}
            onUpdateRound={handleUpdateRound}
            onRemoveRound={onRemoveRound}
            onAddQuestion={handleAddQuestion}
            onRemoveQuestion={handleRemoveQuestion}
            onAddOption={handleAddOption}
            onRemoveOption={handleRemoveOption}
            onUpdateQuestion={handleUpdateQuestion}
            onUpdateOption={handleUpdateOption}
            onSelectAnswer={handleSelectAnswer}
            canRemove={rounds.length > 1}
          />
        ))}
      </Accordion>

      <Button
        type="button"
        variant="outline"
        onClick={onAddRound}
        icon={<Plus className="w-4 h-4" />}
        className="w-full"
      >
        Add New Round
      </Button>
    </div>
  );
};

export default memo(RoundManager);

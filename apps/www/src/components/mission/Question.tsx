import Button from "@/components/ui/Button";
import type { Question } from "@/features/missions/hooks/useMissionForm";
import { Trash2, Plus } from "lucide-react";
import React, { memo } from "react";

interface QuestionProps {
  question: Question;
  questionIndex: number;
  roundIndex: number;
  onUpdateQuestion: (
    roundIndex: number,
    questionIndex: number,
    field: string,
    value: string
  ) => void;
  onUpdateOption: (
    roundIndex: number,
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => void;
  onSelectAnswer: (
    roundIndex: number,
    questionIndex: number,
    option: string
  ) => void;
  onAddOption: (roundIndex: number, questionIndex: number) => void;
  onRemoveOption: (
    roundIndex: number,
    questionIndex: number,
    optionIndex: number
  ) => void;
  onRemoveQuestion: (roundIndex: number, questionIndex: number) => void;
  canRemove: boolean;
}

// Use memo to prevent re-renders when other questions change
const Question: React.FC<QuestionProps> = memo(
  ({
    question,
    questionIndex,
    roundIndex,
    onUpdateQuestion,
    onUpdateOption,
    onSelectAnswer,
    onAddOption,
    onRemoveOption,
    onRemoveQuestion,
    canRemove,
  }) => {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-medium text-gray-900 dark:text-white">
            Question {questionIndex + 1}
          </h5>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveQuestion(roundIndex, questionIndex)}
              icon={<Trash2 className="w-4 h-4" />}
              className="text-error-600 dark:text-error-400"
            >
              Remove
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Question Text *
            </label>
            <input
              type="text"
              required
              value={question.question}
              onChange={(e) =>
                onUpdateQuestion(
                  roundIndex,
                  questionIndex,
                  "question",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter question text"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Answer Options *
            </label>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${roundIndex}-${questionIndex}-correct`}
                  checked={question.answer === option}
                  onChange={() =>
                    onSelectAnswer(roundIndex, questionIndex, option)
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <input
                  type="text"
                  required
                  value={option}
                  onChange={(e) =>
                    onUpdateOption(
                      roundIndex,
                      questionIndex,
                      optionIndex,
                      e.target.value
                    )
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={`Option ${optionIndex + 1}`}
                />
                {question.options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onRemoveOption(roundIndex, questionIndex, optionIndex)
                    }
                    icon={<Trash2 className="w-4 h-4" />}
                    className="text-error-600 dark:text-error-400"
                  />
                )}
              </div>
            ))}
            {question.options.length < 4 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onAddOption(roundIndex, questionIndex)}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Option
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Question.displayName = "Question";

export default Question;

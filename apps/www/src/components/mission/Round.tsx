import Button from "@/components/ui/Button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import React, { memo } from "react";
import { Target, Trophy, Gift, Trash2, Plus } from "lucide-react";
import Question from "./Question";
import {
  AdmonitionDirectiveDescriptor,
  BoldItalicUnderlineToggles,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  directivesPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface Round {
  title: string;
  welcome_message: string;
  introduction: string;
  content: string;
  quest: {
    description: string;
    type: "QUIZ";
    reward: {
      token: "BLOCK";
      amount: number;
    };
    quiz: {
      question: string;
      options: string[];
      answer: string;
    }[];
  };
}

interface RoundProps {
  round: Round;
  roundIndex: number;
  onUpdateRound: (
    roundIndex: number,
    field: string,
    value: string | number
  ) => void;
  onRemoveRound: (index: number) => void;
  onAddQuestion: (roundIndex: number) => void;
  onRemoveQuestion: (roundIndex: number, questionIndex: number) => void;
  onAddOption: (roundIndex: number, questionIndex: number) => void;
  onRemoveOption: (
    roundIndex: number,
    questionIndex: number,
    optionIndex: number
  ) => void;
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
  canRemove: boolean;
}

// Use memo for better performance
const Round: React.FC<RoundProps> = memo(
  ({
    round,
    roundIndex,
    onUpdateRound,
    onRemoveRound,
    onAddQuestion,
    onRemoveQuestion,
    onAddOption,
    onRemoveOption,
    onUpdateQuestion,
    onUpdateOption,
    onSelectAnswer,
    canRemove,
  }) => {
    return (
      <AccordionItem
        value={`round-${roundIndex}`}
        className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-4"
      >
        <AccordionTrigger className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-primary-500" />
            <span className="font-bold text-gray-900 dark:text-white">
              Round {roundIndex + 1}: {round.title || "Untitled Round"}
            </span>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="px-6 pb-6 space-y-6">
            {/* Round Header */}
            <div className="flex items-center justify-between pt-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Configure Round
              </h3>
              {canRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onRemoveRound(roundIndex)}
                  icon={<Trash2 className="w-4 h-4" />}
                  className="text-error-600 dark:text-error-400"
                >
                  Remove Round
                </Button>
              )}
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Round Title *
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={round.title}
                  onChange={(e) =>
                    onUpdateRound(roundIndex, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter round title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Welcome Message *
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={round.welcome_message}
                  onChange={(e) =>
                    onUpdateRound(roundIndex, "welcome_message", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter welcome message"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {round.welcome_message?.length}/100 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Introduction *
                </label>
                <textarea
                  required
                  maxLength={200}
                  value={round.introduction}
                  onChange={(e) =>
                    onUpdateRound(roundIndex, "introduction", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter round introduction"
                  rows={3}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {round.introduction.length}/200 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Main Content *
                </label>
                <MDXEditor
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white! focus:outline-none focus:ring-2 focus:ring-primary-500"
                  markdown={round.content}
                  onChange={(value) =>
                    onUpdateRound(roundIndex, "content", value)
                  }
                  plugins={[
                    toolbarPlugin({
                      toolbarClassName: "h-max dark:bg-gray-800",
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                        </>
                      ),
                    }),
                    directivesPlugin({
                      directiveDescriptors: [AdmonitionDirectiveDescriptor],
                    }),
                    linkPlugin(),
                    listsPlugin(),
                    headingsPlugin(),
                    codeBlockPlugin(),
                    quotePlugin(),
                    markdownShortcutPlugin(),
                  ]}
                />
              </div>
            </div>

            {/* Quest Configuration */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary-500" />
                Quest Configuration
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quest Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={round.quest.description}
                    onChange={(e) =>
                      onUpdateRound(
                        roundIndex,
                        "quest.description",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter quest description"
                  />
                </div>

                <div className="space-y-6">
                  {round?.quest?.quiz?.map((question, questionIndex) => (
                    <Question
                      key={questionIndex}
                      question={question}
                      questionIndex={questionIndex}
                      roundIndex={roundIndex}
                      onUpdateQuestion={onUpdateQuestion}
                      onUpdateOption={onUpdateOption}
                      onSelectAnswer={onSelectAnswer}
                      onAddOption={onAddOption}
                      onRemoveOption={onRemoveOption}
                      onRemoveQuestion={onRemoveQuestion}
                      canRemove={round.quest.quiz.length > 1}
                    />
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onAddQuestion(roundIndex)}
                  icon={<Plus className="w-4 h-4" />}
                >
                  Add Question
                </Button>
              </div>
            </div>

            {/* Reward Configuration */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary-500" />
                Reward Configuration
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  BLOCK Reward Amount *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={round.quest.reward.amount}
                  onChange={(e) =>
                    onUpdateRound(
                      roundIndex,
                      "quest.reward.amount",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
);

Round.displayName = "Round";

export default Round;

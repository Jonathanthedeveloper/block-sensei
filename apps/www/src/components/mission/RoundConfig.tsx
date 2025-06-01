import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { Target, Trophy, Gift, Plus, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Round {
  id: string;
  title: string;
  welcomeMessage: string;
  introduction: string;
  content: string;
  quest: {
    description: string;
    questions: Question[];
  };
  reward: {
    amount: number;
  };
}

interface RoundConfigProps {
  rounds: Round[];
  onRoundsChange: (rounds: Round[]) => void;
  onAddRound: () => void;
  onRemoveRound: (index: number) => void;
}

export default function RoundConfig({
  rounds,
  onRoundsChange,
  onAddRound,
  onRemoveRound
}: RoundConfigProps) {
  const [openRound, setOpenRound] = useState(rounds[0]?.id);

  const handleAddQuestion = (roundIndex: number) => {
    const newRounds = [...rounds];
    newRounds[roundIndex].quest.questions.push({
      id: String(newRounds[roundIndex].quest.questions.length + 1),
      text: '',
      options: ['', ''],
      correctAnswer: 0
    });
    onRoundsChange(newRounds);
  };

  const handleRemoveQuestion = (roundIndex: number, questionIndex: number) => {
    const newRounds = [...rounds];
    newRounds[roundIndex].quest.questions = newRounds[roundIndex].quest.questions.filter((_, i) => i !== questionIndex);
    onRoundsChange(newRounds);
  };

  const handleAddOption = (roundIndex: number, questionIndex: number) => {
    if (rounds[roundIndex].quest.questions[questionIndex].options.length >= 4) return;
    
    const newRounds = [...rounds];
    newRounds[roundIndex].quest.questions[questionIndex].options.push('');
    onRoundsChange(newRounds);
  };

  const handleRemoveOption = (roundIndex: number, questionIndex: number, optionIndex: number) => {
    if (rounds[roundIndex].quest.questions[questionIndex].options.length <= 2) return;
    
    const newRounds = [...rounds];
    newRounds[roundIndex].quest.questions[questionIndex].options = 
      newRounds[roundIndex].quest.questions[questionIndex].options.filter((_, i) => i !== optionIndex);
    onRoundsChange(newRounds);
  };

  const updateRoundField = (roundIndex: number, field: string, value: string | number) => {
    const newRounds = [...rounds];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      (newRounds[roundIndex] as any)[parent][child] = value;
    } else {
      (newRounds[roundIndex] as any)[field] = value;
    }
    onRoundsChange(newRounds);
  };

  return (
    <div className="space-y-6">
      <Accordion.Root
        type="single"
        value={openRound}
        onValueChange={setOpenRound}
        className="space-y-4"
      >
        {rounds.map((round, roundIndex) => (
          <Accordion.Item
            key={round.id}
            value={round.id}
            className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left focus:outline-none">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary-500" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Round {roundIndex + 1}: {round.title || 'Untitled Round'}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  openRound === round.id ? "transform rotate-180" : ""
                )} />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content>
              <AnimatePresence>
                {openRound === round.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 space-y-6">
                      {/* Round Header */}
                      <div className="flex items-center justify-between pt-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Configure Round
                        </h3>
                        {rounds.length > 1 && (
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
                            onChange={(e) => updateRoundField(roundIndex, 'title', e.target.value)}
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
                            value={round.welcomeMessage}
                            onChange={(e) => updateRoundField(roundIndex, 'welcomeMessage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter welcome message"
                          />
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {round.welcomeMessage.length}/100 characters
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
                            onChange={(e) => updateRoundField(roundIndex, 'introduction', e.target.value)}
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
                          <textarea
                            required
                            value={round.content}
                            onChange={(e) => updateRoundField(roundIndex, 'content', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter the main content"
                            rows={6}
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
                              onChange={(e) => updateRoundField(roundIndex, 'quest.description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="Enter quest description"
                            />
                          </div>

                          <div className="space-y-6">
                            {round.quest.questions.map((question, questionIndex) => (
                              <div key={question.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                  <h5 className="font-medium text-gray-900 dark:text-white">
                                    Question {questionIndex + 1}
                                  </h5>
                                  {round.quest.questions.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveQuestion(roundIndex, questionIndex)}
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
                                      value={question.text}
                                      onChange={(e) => {
                                        const newRounds = [...rounds];
                                        newRounds[roundIndex].quest.questions[questionIndex].text = e.target.value;
                                        onRoundsChange(newRounds);
                                      }}
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
                                          name={`question-${question.id}-correct`}
                                          checked={question.correctAnswer === optionIndex}
                                          onChange={() => {
                                            const newRounds = [...rounds];
                                            newRounds[roundIndex].quest.questions[questionIndex].correctAnswer = optionIndex;
                                            onRoundsChange(newRounds);
                                          }}
                                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                        />
                                        <input
                                          type="text"
                                          required
                                          value={option}
                                          onChange={(e) => {
                                            const newRounds = [...rounds];
                                            newRounds[roundIndex].quest.questions[questionIndex].options[optionIndex] = e.target.value;
                                            onRoundsChange(newRounds);
                                          }}
                                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                          placeholder={`Option ${optionIndex + 1}`}
                                        />
                                        {question.options.length > 2 && (
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveOption(roundIndex, questionIndex, optionIndex)}
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
                                        onClick={() => handleAddOption(roundIndex, questionIndex)}
                                        icon={<Plus className="w-4 h-4" />}
                                      >
                                        Add Option
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleAddQuestion(roundIndex)}
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
                            value={round.reward.amount}
                            onChange={(e) => updateRoundField(roundIndex, 'reward.amount', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

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
}
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { ArrowLeft, Gift, CheckCircle, HelpCircle, Trophy } from "lucide-react";
import { QuestType } from "../types";
import { cn } from "../lib/utils";
import { useGetMissionById } from "@/features";

export default function RoundPage() {
  const { missionId, roundId } = useParams<{
    missionId: string;
    roundId: string;
  }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data: mission } = useGetMissionById(missionId);

  const round = mission?.mission_rounds?.find((r) => r.id === roundId);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!mission || !round) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <HelpCircle className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Round Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This mission round seems to be missing...
        </p>
        <Link to={`/missions/${missionId}`}>
          <Button variant="primary">Back to Mission</Button>
        </Link>
      </div>
    );
  }

  const handleStartQuest = () => {
    setShowQuiz(true);
  };

  const handleQuizAnswerChange = (questionId: string, value: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("🎉 Quest completed successfully!", "success");
      navigate(`/missions/${missionId}`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/missions/${missionId}`}>
          <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>
            Back to Mission
          </Button>
        </Link>
        <Badge variant="primary">Round {round.title}</Badge>
        {round.quest && (
          <Badge variant="accent">
            <Gift className="w-3 h-3 mr-1" />
            {round.quest.reward.amount} {round.quest.reward.token}
          </Badge>
        )}
      </motion.div>

      {/* Content Section */}
      {!showQuiz ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Welcome Card */}
          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-100 dark:border-primary-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Trophy className="h-8 w-8 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-2">
                    {round.welcome_message}
                  </h2>
                  <p className="text-primary-700 dark:text-primary-300">
                    {round.introduction}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card>
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                {round.content}
              </div>
            </CardContent>
          </Card>

          {/* Start Quest Card */}
          <Card className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-2 border-accent-100 dark:border-accent-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Ready to test your knowledge?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete the quest to earn {round.quest?.reward.amount}{" "}
                    {round.quest?.reward.token}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleStartQuest}
                  icon={<Trophy size={20} />}
                >
                  Start Quest
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Quiz Section */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quest: {round.quest?.description}</CardTitle>
            </CardHeader>
            <CardContent>
              {round.quest?.type === QuestType.QUIZ && round.quest.quiz && (
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {round.quest.quiz.map((question, qIndex) => {
                    const options = JSON.parse(question.options);
                    return (
                      <div
                        key={question.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          {qIndex + 1}. {question.question}
                        </h4>
                        <div className="space-y-3">
                          {options.map((option: string, oIndex: number) => (
                            <label
                              key={oIndex}
                              className={cn(
                                "flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                                quizAnswers[question.id] === oIndex.toString()
                                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                                  : "border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800"
                              )}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={oIndex.toString()}
                                checked={
                                  quizAnswers[question.id] === oIndex.toString()
                                }
                                onChange={() =>
                                  handleQuizAnswerChange(
                                    question.id,
                                    oIndex.toString()
                                  )
                                }
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                              />
                              <span className="ml-3 text-gray-700 dark:text-gray-300">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowQuiz(false)}
                    >
                      Review Content
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={
                        Object.keys(quizAnswers).length !==
                        round.quest.quiz?.length
                      }
                      icon={<CheckCircle size={20} />}
                    >
                      Submit Answers
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

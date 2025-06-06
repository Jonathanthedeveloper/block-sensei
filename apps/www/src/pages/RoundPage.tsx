import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, Gift, CheckCircle, HelpCircle, Trophy } from "lucide-react";
import { ICompleteRound, QuestType } from "@/types";
import { cn } from "@/lib/utils";
import { useCompleteRound, useGetMissionById } from "@/features";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QuestQuiz } from "types";
import { useModal } from "@/context/ModalContext";
import Coin_img from "../assets/coin.png";

export default function RoundPage() {
  const { missionId, roundId } = useParams<{
    missionId: string;
    roundId: string;
  }>();
  const { data: mission } = useGetMissionById(missionId);
  const completeRound = useCompleteRound({
    onSuccess: () => {
      handleOpenReward();
    },
  });

  const round = mission?.mission_rounds?.find((r) => r.id === roundId);

  const navigate = useNavigate();

  const [showQuiz, setShowQuiz] = useState(false);
  const { openModal } = useModal();

  const handleOpenReward = (): void => {
    openModal("reward", {
      title: "Achievement Unlocked!",
      message: "You've completed the lesson successfully!",
      rewardAmount: round?.quest?.reward.amount || 0, // Use round.quest.reward.amount
      rewardType: round?.quest?.reward.token || "tokens", // Use round.quest.reward.token
      image: Coin_img,
      onCloseCallback: () => {
        // Navigate to mission overview after closing the reward modal
        navigate(`/missions/${missionId}`);
      },
    });
  };

  // Create dynamic Zod schema based on quiz questions
  const createQuizSchema = (quiz: QuestQuiz[]) => {
    const schemaFields: Record<string, z.ZodString> = {};

    quiz?.forEach((question) => {
      schemaFields[question.id] = z.string({
        required_error: "Please select an answer for this question",
      });
    });

    return z.object(schemaFields);
  };

  // Initialize form when quiz data is available
  const quizSchema = round?.quest?.quiz
    ? createQuizSchema(round.quest.quiz)
    : z.object({});
  type QuizFormValues = z.infer<typeof quizSchema>;

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    mode: "onChange",
  });

  if (!mission || !round) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[50vh]'>
        <HelpCircle className='mb-4 w-16 h-16 text-gray-400 dark:text-gray-600' />
        <h2 className='mb-2 font-bold text-gray-900 dark:text-white text-xl'>
          Round Not Found
        </h2>
        <p className='mb-6 text-gray-600 dark:text-gray-400'>
          This mission round seems to be missing...
        </p>
        <Link to={`/missions/${missionId}`}>
          <Button variant='primary'>Back to Mission</Button>
        </Link>
      </div>
    );
  }

  const handleStartQuest = () => {
    setShowQuiz(true);
  };

  const handleQuizSubmit = (data: QuizFormValues) => {
    completeRound.mutate({
      roundId: round.id,
      data: {
        mission_round_id: round.id,
        quiz_answers: round.quest?.quiz.map((question) => ({
          quest_quiz_id: question.id,
          user_answer: data[question.id as keyof typeof data],
        })) as ICompleteRound["quiz_answers"],
      },
    });
  };

  return (
    <div className='space-y-6'>
      {/* Navigation */}
      <motion.div
        className='flex items-center gap-4'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/missions/${missionId}`}>
          <Button variant='ghost' size='sm' icon={<ArrowLeft size={16} />}>
            Back to Mission
          </Button>
        </Link>
        <Badge variant='primary'>Round {round.title}</Badge>
        {round.quest && (
          <Badge variant='accent'>
            <Gift className='mr-1 w-3 h-3' />
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
          className='space-y-6'
        >
          {/* Welcome Card */}
          <Card className='bg-gradient-to-br from-primary-50 dark:from-primary-900/20 to-secondary-50 dark:to-secondary-900/20 border-2 border-primary-100 dark:border-primary-800'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0'>
                  <Trophy className='w-8 h-8 text-primary-500' />
                </div>
                <div>
                  <h2 className='mb-2 font-bold text-primary-900 dark:text-primary-100 text-xl'>
                    {round.welcome_message}
                  </h2>
                  <p className='text-primary-700 dark:text-primary-300'>
                    {round.introduction}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card>
            <CardContent className='p-6'>
              <div className='dark:prose-invert max-w-none prose'>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                >
                  {round.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Start Quest Card */}
          <Card className='bg-gradient-to-br to-primary-50 dark:to-primary-900/20 border-2 border-accent-100 dark:border-accent-800 from-accent-50 dark:from-accent-900/20'>
            <CardContent className='p-6'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='mb-2 font-bold text-gray-900 dark:text-white text-lg'>
                    Ready to test your knowledge?
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400'>
                    Complete the quest to earn {round.quest?.reward.amount}{" "}
                    {round.quest?.reward.token}
                  </p>
                </div>
                <Button
                  variant='primary'
                  size='lg'
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
                <form
                  onSubmit={handleSubmit(handleQuizSubmit)}
                  className='space-y-6'
                >
                  {round.quest.quiz.map((question, qIndex) => {
                    const options = JSON.parse(question.options);
                    return (
                      <div
                        key={question.id}
                        className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg'
                      >
                        <h4 className='mb-4 font-medium text-gray-900 dark:text-white text-lg'>
                          {qIndex + 1}. {question.question}
                        </h4>
                        <div className='space-y-3'>
                          {options.map((option: string, oIndex: number) => (
                            <label
                              key={oIndex}
                              className={cn(
                                "flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                                watch(question.id) === oIndex.toString()
                                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                                  : "border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800"
                              )}
                            >
                              <input
                                type='radio'
                                value={option}
                                {...register(question.id)}
                                className='border-gray-300 dark:border-gray-600 focus:ring-primary-500 w-4 h-4 text-primary-600'
                              />
                              <span className='ml-3 text-gray-700 dark:text-gray-300'>
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors[question.id as keyof typeof errors] && (
                          <p className='mt-2 text-red-600 dark:text-red-500 text-sm'>
                            {
                              errors[question.id as keyof typeof errors]
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div className='flex justify-between items-center pt-6 border-gray-200 dark:border-gray-700 border-t'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => handleOpenReward()}
                      // onClick={() => setShowQuiz(false)}
                    >
                      Review Content
                    </Button>
                    <Button
                      type='submit'
                      isLoading={completeRound.isPending}
                      disabled={!isValid || completeRound.isPending}
                      variant='primary'
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

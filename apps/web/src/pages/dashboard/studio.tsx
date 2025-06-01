import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Plus,
  X,
  Check,
  BookOpen,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetUserCreatedClans, useCreateMission } from "@/features";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { ICreateMissionWithRounds } from "@/types";

interface MissionFormData {
  clan_id: string;
  title: string;
  brief: string;
  description: string;
  image: string;
  mission_rounds: {
    title: string;
    welcome_message: string;
    introduction: string;
    content: string;
    quest: {
      description: string;
      type: "QUIZ";
      reward: {
        token: string;
        amount: number;
      };
      quiz: {
        question: string;
        options: string[];
        answer: string;
      }[];
    };
  }[];
}

const STEPS = [
  { id: 1, title: "Clan Selection", description: "Choose your clan" },
  { id: 2, title: "Mission Info", description: "Basic mission details" },
  { id: 3, title: "Description", description: "Detailed description" },
  { id: 4, title: "Mission Rounds", description: "Create rounds and quests" },
  { id: 5, title: "Success", description: "Mission created successfully" },
];

export function StudioPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdMissionId, setCreatedMissionId] = useState<string | null>(null);

  const { data: userClans, isLoading: clansLoading } = useGetUserCreatedClans();
  const createMission = useCreateMission();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<MissionFormData>({
    defaultValues: {
      clan_id: "",
      title: "",
      brief: "",
      description: "",
      image: "",
      mission_rounds: [
        {
          title: "",
          welcome_message: "",
          introduction: "",
          content: "",
          quest: {
            description: "",
            type: "QUIZ",
            reward: { token: "BLOCK", amount: 10 },
            quiz: [{ question: "", options: ["", "", ""], answer: "" }],
          },
        },
      ],
    },
  });

  const {
    fields: rounds,
    append: addRound,
    remove: removeRound,
  } = useFieldArray({
    control,
    name: "mission_rounds",
  });

  const selectedClanId = watch("clan_id");

  const nextStep = async () => {
    let isValid = true;

    switch (currentStep) {
      case 1:
        isValid = await trigger("clan_id");
        break;
      case 2:
        isValid = await trigger(["title", "brief", "image"]);
        break;
      case 3:
        isValid = await trigger("description");
        break;
      case 4:
        isValid = await trigger("mission_rounds");
        break;
    }

    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: MissionFormData) => {
    if (currentStep !== 4) return;

    setIsSubmitting(true);
    try {
      const missionData: ICreateMissionWithRounds = {
        title: data.title,
        brief: data.brief,
        description: data.description,
        clan_id: data.clan_id,
        mission_rounds: data.mission_rounds,
      };

      const result = await createMission.mutateAsync(missionData);
      setCreatedMissionId(result.id);
      setCurrentStep(5);
    } catch (error) {
      console.error("Failed to create mission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id
                ? "bg-[#4DA2FF] border-[#4DA2FF] text-white"
                : "border-[#A4A4A4] text-[#A4A4A4]"
            }`}
          >
            {currentStep > step.id ? <Check size={20} /> : step.id}
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-2 ${
                currentStep > step.id ? "bg-[#4DA2FF]" : "bg-[#A4A4A4]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Select Your Clan</h2>
        <p className="text-[#A4A4A4]">
          Choose which clan this mission belongs to
        </p>
      </div>

      {clansLoading ? (
        <div className="text-center text-[#A4A4A4]">Loading your clans...</div>
      ) : userClans?.data?.length === 0 ? (
        <div className="text-center">
          <div className="bg-[#121228] rounded-lg p-8 border border-[#2C2C44]">
            <Users className="mx-auto text-[#4DA2FF] mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">
              No Clans Found
            </h3>
            <p className="text-[#A4A4A4] mb-6">
              You need to create a clan before you can create missions.
            </p>
            <Link
              to="/dashboard/clans"
              className="inline-flex items-center gap-2 bg-[#4DA2FF] text-white px-6 py-3 rounded-lg hover:bg-[#3D91E8] transition-colors"
            >
              <Plus size={20} />
              Create Your First Clan
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userClans?.data?.map((clan) => (
            <Controller
              key={clan.id}
              name="clan_id"
              control={control}
              rules={{ required: "Please select a clan" }}
              render={({ field }) => (
                <div
                  onClick={() => field.onChange(clan.id)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedClanId === clan.id
                      ? "border-[#4DA2FF] bg-[#4DA2FF]/10"
                      : "border-[#2C2C44] bg-[#121228] hover:border-[#4DA2FF]/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={clan.logo_url || "/clan.png"}
                      alt={clan.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-white">{clan.name}</h3>
                      <p className="text-[#A4A4A4] text-sm">
                        {clan.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          ))}
        </div>
      )}
      {errors.clan_id && (
        <p className="text-red-400 text-sm mt-2 text-center">
          {errors.clan_id.message}
        </p>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Mission Information
        </h2>
        <p className="text-[#A4A4A4]">
          Provide basic details about your mission
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">
            Mission Image (Base64)
          </label>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Mission image is required" }}
            render={({ field }) => (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          field.onChange(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 bg-[#2C2C44] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#3C3C54] transition-colors"
                  >
                    <Upload size={16} />
                    Upload Image
                  </label>
                </div>
                {field.value && (
                  <img
                    src={field.value}
                    alt="Mission preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            )}
          />
          {errors.image && (
            <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Mission Title
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Mission title is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="w-full bg-[#121228] border border-[#2C2C44] rounded-lg px-4 py-3 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                placeholder="Enter mission title"
              />
            )}
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Mission Brief
          </label>
          <Controller
            name="brief"
            control={control}
            rules={{ required: "Mission brief is required" }}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                className="w-full bg-[#121228] border border-[#2C2C44] rounded-lg px-4 py-3 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none resize-none"
                placeholder="Brief description of the mission"
              />
            )}
          />
          {errors.brief && (
            <p className="text-red-400 text-sm mt-1">{errors.brief.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Mission Description
        </h2>
        <p className="text-[#A4A4A4]">
          Add a detailed description using the rich text editor
        </p>
      </div>

      <div>
        <label className="block text-white font-medium mb-4">
          Detailed Description
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Mission description is required" }}
          render={({ field }) => (
            <div className="bg-white rounded-lg">
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                style={{ minHeight: "300px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          )}
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-2">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Create Mission Rounds
        </h2>
        <p className="text-[#A4A4A4]">Add rounds with quests and rewards</p>
      </div>

      <div className="space-y-8">
        {rounds.map((round, roundIndex) => (
          <div
            key={round.id}
            className="bg-[#121228] rounded-lg p-6 border border-[#2C2C44]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Round {roundIndex + 1}
              </h3>
              {rounds.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRound(roundIndex)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Round Title
                  </label>
                  <Controller
                    name={`mission_rounds.${roundIndex}.title`}
                    control={control}
                    rules={{ required: "Round title is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                        placeholder="Enter round title"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Welcome Message
                  </label>
                  <Controller
                    name={`mission_rounds.${roundIndex}.welcome_message`}
                    control={control}
                    rules={{ required: "Welcome message is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                        placeholder="Welcome message for this round"
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Introduction
                </label>
                <Controller
                  name={`mission_rounds.${roundIndex}.introduction`}
                  control={control}
                  rules={{ required: "Introduction is required" }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={2}
                      className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none resize-none"
                      placeholder="Introduction to this round"
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Content
                </label>
                <Controller
                  name={`mission_rounds.${roundIndex}.content`}
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={3}
                      className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none resize-none"
                      placeholder="Main content for this round"
                    />
                  )}
                />
              </div>

              {/* Quest Section */}
              <div className="border-t border-[#3C3C54] pt-4">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quest Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Quest Description
                    </label>
                    <Controller
                      name={`mission_rounds.${roundIndex}.quest.description`}
                      control={control}
                      rules={{ required: "Quest description is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                          placeholder="Describe the quest"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Quest Type
                    </label>
                    <div className="bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-[#A4A4A4]">
                      QUIZ (Only type available)
                    </div>
                  </div>
                </div>

                {/* Reward Section */}
                <div className="mb-4">
                  <h5 className="text-white font-medium mb-2">Reward</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm mb-1">
                        Token
                      </label>
                      <Controller
                        name={`mission_rounds.${roundIndex}.quest.reward.token`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                            placeholder="BSS"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-1">
                        Amount
                      </label>
                      <Controller
                        name={`mission_rounds.${roundIndex}.quest.reward.amount`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                            placeholder="10"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Quiz Section */}
                <QuizSection roundIndex={roundIndex} control={control} />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addRound({
              title: "",
              welcome_message: "",
              introduction: "",
              content: "",
              quest: {
                description: "",
                type: "QUIZ",
                reward: { token: "BSS", amount: 10 },
                quiz: [{ question: "", options: ["", "", ""], answer: "" }],
              },
            })
          }
          className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-4 py-3 text-[#4DA2FF] hover:bg-[#3C3C54] transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Another Round
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-[#121228] rounded-lg p-8 border border-[#2C2C44]">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Mission Created Successfully!
        </h2>
        <p className="text-[#A4A4A4] mb-8">
          Your mission has been created and is ready for participants.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/dashboard/missions"
            className="bg-[#4DA2FF] text-white px-6 py-3 rounded-lg hover:bg-[#3D91E8] transition-colors"
          >
            View All Missions
          </Link>
          <button
            onClick={() => {
              setCurrentStep(1);
              setCreatedMissionId(null);
            }}
            className="bg-[#2C2C44] text-white px-6 py-3 rounded-lg hover:bg-[#3C3C54] transition-colors"
          >
            Create Another Mission
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Mission Studio</h1>
          <p className="text-[#A4A4A4]">
            Create engaging missions for your clan members
          </p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderCurrentStep()}

          {currentStep < 5 && (
            <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  currentStep === 1
                    ? "bg-[#2C2C44] text-[#A4A4A4] cursor-not-allowed"
                    : "bg-[#2C2C44] text-white hover:bg-[#3C3C54]"
                }`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentStep === 4 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Mission"}
                  <BookOpen size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-[#4DA2FF] text-white px-6 py-3 rounded-lg hover:bg-[#3D91E8] transition-colors"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Quiz Section Component
interface QuizSectionProps {
  roundIndex: number;
  control: any;
}

function QuizSection({ roundIndex, control }: QuizSectionProps) {
  const {
    fields: questions,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `mission_rounds.${roundIndex}.quest.quiz`,
  });

  return (
    <div>
      <h5 className="text-white font-medium mb-4">Quiz Questions</h5>
      <div className="space-y-4">
        {questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="bg-[#1A1A2E] rounded-lg p-4 border border-[#2C2C44]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium">
                Question {questionIndex + 1}
              </span>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white text-sm mb-1">
                  Question
                </label>
                <Controller
                  name={`mission_rounds.${roundIndex}.quest.quiz.${questionIndex}.question`}
                  control={control}
                  rules={{ required: "Question is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                      placeholder="Enter your question"
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Options</label>
                <div className="space-y-2">
                  {[0, 1, 2].map((optionIndex) => (
                    <Controller
                      key={optionIndex}
                      name={`mission_rounds.${roundIndex}.quest.quiz.${questionIndex}.options.${optionIndex}`}
                      control={control}
                      rules={{ required: "Option is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm mb-1">
                  Correct Answer
                </label>
                <Controller
                  name={`mission_rounds.${roundIndex}.quest.quiz.${questionIndex}.answer`}
                  control={control}
                  rules={{ required: "Correct answer is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-3 py-2 text-white placeholder-[#A4A4A4] focus:border-[#4DA2FF] focus:outline-none"
                      placeholder="Enter the correct answer"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addQuestion({ question: "", options: ["", "", ""], answer: "" })
          }
          className="w-full bg-[#2C2C44] border border-[#3C3C54] rounded-lg px-4 py-2 text-[#4DA2FF] hover:bg-[#3C3C54] transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add Question
        </button>
      </div>
    </div>
  );
}

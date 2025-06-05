import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetClanById } from "@/features";
import { useCreateMission } from "../useCreateMission";
import { useNavigate } from "react-router-dom";

// Zod schemas
const quizQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options required"),
  answer: z.string().min(1, "Answer is required"),
});

const questSchema = z.object({
  description: z.string().min(1, "Quest description is required"),
  type: z.literal("QUIZ"),
  reward: z.object({
    token: z.literal("BLOCK"),
    amount: z.number().min(1, "Reward amount must be positive"),
  }),
  quiz: z.array(quizQuestionSchema).min(1, "At least one question is required"),
});

const missionRoundSchema = z.object({
  title: z.string().min(1, "Round title is required"),
  welcome_message: z.string().min(1, "Welcome message is required"),
  introduction: z.string().min(1, "Introduction is required"),
  content: z.string().min(1, "Content is required"),
  quest: questSchema,
});

export const missionSchema = z.object({
  title: z
    .string()
    .min(1, "Mission title is required")
    .max(50, "Title must be 50 characters or less"),
  brief: z
    .string()
    .min(1, "Brief description is required")
    .max(200, "Brief must be 200 characters or less"),
  clan_id: z.string().min(1, "Clan ID is required"),
  mission_rounds: z
    .array(missionRoundSchema)
    .min(1, "At least one round is required"),
});

export type Question = z.infer<typeof quizQuestionSchema>;
export type Quest = z.infer<typeof questSchema>;
export type MissionRound = z.infer<typeof missionRoundSchema>;
export type MissionFormData = z.infer<typeof missionSchema>;

export function useMissionForm(clanId: string) {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: clan } = useGetClanById(clanId);
  const createMission = useCreateMission();
  const navigate = useNavigate();

  const form = useForm<MissionFormData>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: "",
      brief: "",
      clan_id: clanId,
      mission_rounds: [
        {
          title: "",
          welcome_message: "",
          introduction: "",
          content: "",
          quest: {
            description: "",
            type: "QUIZ",
            reward: {
              token: "BLOCK",
              amount: 100,
            },
            quiz: [
              {
                question: "",
                options: [""],
                answer: "",
              },
            ],
          },
        },
      ],
    },
    mode: "onTouched", // Validate on blur for better performance
  });

  const { append: appendRound, remove: removeRound } = useFieldArray({
    control: form.control,
    name: "mission_rounds",
  });

  const handleNextStep = async () => {
    if (currentStep === 1) {
      console.log("validating step 1");
      const isValid = await form.trigger(["title", "brief"]);
      if (isValid) {
        setCurrentStep(2);
      }
    }
  };

  const handleAddRound = () => {
    appendRound({
      title: "",
      welcome_message: "",
      introduction: "",
      content: "",
      quest: {
        description: "",
        type: "QUIZ",
        reward: {
          token: "BLOCK",
          amount: 100,
        },
        quiz: [
          {
            question: "",
            options: ["", ""],
            answer: "",
          },
        ],
      },
    });
  };

  const handleRemoveRound = (index: number) => {
    removeRound(index);
  };

  const handleSubmit = form.handleSubmit(
    (data) => {
      if (currentStep === 1) {
        setCurrentStep(2);
        return;
      }

      try {
        createMission.mutateAsync(data, {
          onSuccess: () => {
            navigate("/studio");
          },
        });
        console.log("Mission data to be submitted:", data);
      } catch (error) {
        console.error("Failed to create mission:", error);
      }
    },
    (error) => {
      console.error("Form validation errors:", error);
    }
  );

  const goToPreviousStep = () => {
    if (currentStep === 1) {
      navigate("/studio");
      return;
    }
    setCurrentStep(1);
  };

  return {
    form,
    currentStep,
    handleSubmit,
    goToPreviousStep,
    handleAddRound,
    handleRemoveRound,
    clan,
    isSubmitting: createMission.isPending,
    handleNextStep,
  };
}

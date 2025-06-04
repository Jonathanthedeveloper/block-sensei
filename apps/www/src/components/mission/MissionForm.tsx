import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Check, Edit, Scroll } from "lucide-react";
import { cn } from "@/lib/utils";
import MissionOverviewStep from "./MissionOverviewStep";
import RoundManager from "./RoundManager";
import { useMissionForm } from "@/features/missions/hooks/useMissionForm";

const steps = [
  {
    title: "Mission Overview",
    description: "Set the mission basics",
  },
  {
    title: "Configure Rounds",
    description: "Design learning rounds",
  },
];

interface MissionFormProps {
  clanId: string;
}

export default function MissionForm({ clanId }: MissionFormProps) {
  const {
    form,
    currentStep,
    handleSubmit,
    goToPreviousStep,
    handleAddRound,
    handleRemoveRound,
    clan,
    isSubmitting,
    handleNextStep,
  } = useMissionForm(clanId);

  const isEditMode = false;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={goToPreviousStep}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {isEditMode ? (
              <Edit className="w-6 h-6 text-primary-500" />
            ) : (
              <Scroll className="w-6 h-6 text-primary-500" />
            )}
            {isEditMode ? "Edit Mission" : "Craft New Mission"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isEditMode ? "Update your" : "Design an engaging"} learning
            experience for {clan?.name}
          </p>
        </div>
      </motion.div>

      {/* Stepper */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary-500 transition-all duration-500"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors",
                  index + 1 <= currentStep
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                )}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-center">
                <div className="font-medium text-gray-900 dark:text-white">
                  {step.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <MissionOverviewStep form={form} />
            ) : (
              <RoundManager
                rounds={form.watch("mission_rounds")}
                onRoundsChange={(rounds) =>
                  form.setValue("mission_rounds", rounds, {
                    shouldValidate: true,
                  })
                }
                onAddRound={handleAddRound}
                onRemoveRound={handleRemoveRound}
              />
            )}

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                icon={<ArrowLeft className="w-4 h-4" />}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={currentStep === 1 ? handleNextStep : undefined}
                type={currentStep === 1 ? "button" : "submit"}
                isLoading={isSubmitting}
                icon={
                  currentStep === 2 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )
                }
              >
                {isSubmitting
                  ? "Saving..."
                  : currentStep === 1
                    ? "Continue"
                    : isEditMode
                      ? "Update Mission"
                      : "Create Mission"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

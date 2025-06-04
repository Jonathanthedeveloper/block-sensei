import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { MissionFormData } from "@/features/missions/hooks";

interface MissionOverviewStepProps {
  form: UseFormReturn<MissionFormData>;
}

export default function MissionOverviewStep({
  form,
}: MissionOverviewStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Mission Title *
        </label>
        <input
          type="text"
          {...form.register("title")}
          className={cn(
            "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500",
            form.formState.errors.title
              ? "border-red-500 dark:border-red-500"
              : "border-gray-300 dark:border-gray-600"
          )}
          placeholder="Enter an epic mission title"
        />
        {form.formState.errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Brief Description *
        </label>
        <textarea
          {...form.register("brief")}
          className={cn(
            "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500",
            form.formState.errors.brief
              ? "border-red-500 dark:border-red-500"
              : "border-gray-300 dark:border-gray-600"
          )}
          placeholder="Describe the mission's objectives"
          rows={3}
        />
        {form.formState.errors.brief && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.brief.message}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {form.watch("brief")?.length || 0}/200 characters
        </p>
      </div>
    </div>
  );
}

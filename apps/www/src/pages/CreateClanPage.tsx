import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  Globe,
  Twitter,
  Check,
  Users,
  Edit3,
  ImageUp,
  Trash2,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { useCreateClan } from "@/features";
import { useUploadImage } from "@/features/upload/useUploadImage";

// Zod schemas for each step
const basicInfoSchema = z.object({
  name: z
    .string()
    .min(1, "Clan name is required")
    .min(3, "Clan name must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  logo_url: z.string().or(z.literal("")),
});

const socialPresenceSchema = z.object({
  website_url: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  x_url: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});

// Combined schema for final submission
const fullFormSchema = basicInfoSchema.merge(socialPresenceSchema);

type BasicInfoData = z.infer<typeof basicInfoSchema>;
type SocialPresenceData = z.infer<typeof socialPresenceSchema>;
type FormData = z.infer<typeof fullFormSchema>;

export default function CreateClanPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const uploadImage = useUploadImage();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const createClan = useCreateClan();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // step 1 (Basic Info)
  const basicInfoForm = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      description: "",
      logo_url: "",
    },
  });

  // step 2 (Social Presence)
  const socialPresenceForm = useForm<SocialPresenceData>({
    resolver: zodResolver(socialPresenceSchema),
    defaultValues: {
      website_url: undefined,
      x_url: undefined,
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Added
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const triggerLogoUpload = () => {
    logoInputRef.current?.click();
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    basicInfoForm.setValue("logo_url", "", { shouldValidate: true });
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const steps = [
    {
      title: "Basic Information",
      description: "Set up your clan's identity",
    },
    {
      title: "Social Presence",
      description: "Add your clan's online presence",
    },
  ];

  const handleBasicInfoSubmit = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/studio");
    } else {
      setCurrentStep(1);
    }
  };

  function onSubmit(data: SocialPresenceData) {
    if (!logoFile) {
      showToast("Please upload a logo image", "error");
      return;
    }

    uploadImage.mutate(logoFile, {
      onSuccess: (url) => {
        const basicInfoData = basicInfoForm.getValues();
        const combinedData: FormData = {
          ...basicInfoData,
          ...data,
          logo_url: url,
        };

        createClan.mutate(combinedData, {
          onSuccess: () => {
            basicInfoForm.reset();
            socialPresenceForm.reset();

            setIsSuccessModalOpen(true);
          },
        });
      },
      onError: () => {
        showToast("Failed to upload logo image", "error");
      },
    });
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary-500" />
            Forge New Clan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create your own clan and lead warriors to victory
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
          {currentStep === 1 ? (
            <form
              onSubmit={basicInfoForm.handleSubmit(handleBasicInfoSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Clan Name *
                  </label>
                  <input
                    type="text"
                    {...basicInfoForm.register("name")}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500",
                      basicInfoForm.formState.errors.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    )}
                    placeholder="Enter your clan's name"
                  />
                  {basicInfoForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {basicInfoForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    {...basicInfoForm.register("description")}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500",
                      basicInfoForm.formState.errors.description
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    )}
                    placeholder="Describe your clan's purpose and goals"
                    rows={4}
                  />
                  {basicInfoForm.formState.errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {basicInfoForm.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={logoInputRef}
                    onChange={handleLogoChange}
                    className="hidden"
                  />

                  {logoPreview ? (
                    <div className="mt-2 space-y-3">
                      <img
                        src={logoPreview}
                        alt="Clan Logo Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                      />
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={triggerLogoUpload}
                          icon={<Edit3 className="w-4 h-4" />}
                        >
                          Change
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeLogo}
                          icon={<Trash2 className="w-4 h-4" />}
                          className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-500/10"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={triggerLogoUpload}
                      className={cn(
                        "mt-1 w-full flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed rounded-lg hover:border-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                        basicInfoForm.formState.errors.logo_url
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                    >
                      <ImageUp className="w-10 h-10 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Upload Logo
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF. Recommended 200x200px.
                      </span>
                    </button>
                  )}
                  {basicInfoForm.formState.errors.logo_url && (
                    <p className="mt-1 text-sm text-red-500">
                      {basicInfoForm.formState.errors.logo_url.message}
                    </p>
                  )}
                  {!logoPreview && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Upload a logo image (optional).
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500"
                >
                  Continue
                </Button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={socialPresenceForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      {...socialPresenceForm.register("website_url")}
                      className={cn(
                        "w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500",
                        socialPresenceForm.formState.errors.website_url
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                      placeholder="https://example.com"
                    />
                  </div>
                  {socialPresenceForm.formState.errors.website_url && (
                    <p className="mt-1 text-sm text-red-500">
                      {socialPresenceForm.formState.errors.website_url.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    X Url
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      {...socialPresenceForm.register("x_url")}
                      className={cn(
                        "w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500",
                        socialPresenceForm.formState.errors.x_url
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                      placeholder="https://x.com/@example"
                    />
                  </div>
                  {socialPresenceForm.formState.errors.x_url && (
                    <p className="mt-1 text-sm text-red-500">
                      {socialPresenceForm.formState.errors.x_url.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    variant="ghost"
                    disabled={createClan.isPending}
                  >
                    Skip
                  </Button>
                  <Button
                    isLoading={createClan.isPending}
                    disabled={createClan.isPending}
                    type="submit"
                    icon={<Check className="w-4 h-4" />}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500"
                  >
                    Create Clan
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog.Root
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 p-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary-500" />
              </div>

              <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Clan Created Successfully!
              </Dialog.Title>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your clan has been forged and is ready for new members
              </p>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Share this link with potential members:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/clans/${createClan.data?.id}`}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/clans/${createClan.data?.id}`
                      );
                      showToast("Invite link copied!", "success");
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate("/studio");
                  }}
                >
                  Go to Studio
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500"
                  icon={<Users className="w-4 h-4" />}
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate(`/clans/${createClan.data?.id}`);
                  }}
                >
                  View Clan
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

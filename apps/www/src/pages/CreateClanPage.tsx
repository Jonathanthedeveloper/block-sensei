import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  description: string;
  logo: string;
  website: string;
  twitter: string;
}

export default function CreateClanPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    logo: "",
    website: "",
    twitter: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Simulate API call
      setTimeout(() => {
        setIsSuccessModalOpen(true);
      }, 500);
    }
  };

  const handleSkip = () => {
    setIsSuccessModalOpen(true);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/studio");
    } else {
      setCurrentStep(1);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Clan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your clan's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe your clan's purpose and goals"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Provide a URL to your clan's logo image
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Twitter Handle
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) =>
                        setFormData({ ...formData, twitter: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="@example"
                    />
                  </div>
                </div>
              </div>
            )}

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
                {currentStep === 2 && (
                  <Button type="button" variant="ghost" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
                <Button
                  type="submit"
                  icon={
                    currentStep === 2 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                  className="bg-gradient-to-r from-primary-500 to-secondary-500"
                >
                  {currentStep === 1 ? "Continue" : "Create Clan"}
                </Button>
              </div>
            </div>
          </form>
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
                    value="https://blocksensei.com/clans/join/abc123"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "https://blocksensei.com/clans/join/abc123"
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
                    navigate("/clans/abc123");
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

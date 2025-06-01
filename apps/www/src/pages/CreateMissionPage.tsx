import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, ArrowRight, Scroll, Check } from 'lucide-react';
import { mockClans } from '../data/mockData';
import { cn } from '../lib/utils';
import RoundConfig from '../components/mission/RoundConfig';

interface Round {
  id: string;
  title: string;
  welcomeMessage: string;
  introduction: string;
  content: string;
  quest: {
    description: string;
    questions: {
      id: string;
      text: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
  reward: {
    amount: number;
  };
}

interface MissionForm {
  title: string;
  brief: string;
  clanId: string;
  rounds: Round[];
}

export default function CreateMissionPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<MissionForm>({
    title: '',
    brief: '',
    clanId: '',
    rounds: [
      {
        id: '1',
        title: '',
        welcomeMessage: '',
        introduction: '',
        content: '',
        quest: {
          description: '',
          questions: [
            {
              id: '1',
              text: '',
              options: ['', ''],
              correctAnswer: 0
            }
          ]
        },
        reward: {
          amount: 100
        }
      }
    ]
  });

  const steps = [
    {
      title: 'Mission Overview',
      description: 'Set the mission basics'
    },
    {
      title: 'Configure Rounds',
      description: 'Design learning rounds'
    }
  ];

  const handleAddRound = () => {
    setFormData(prev => ({
      ...prev,
      rounds: [
        ...prev.rounds,
        {
          id: String(prev.rounds.length + 1),
          title: '',
          welcomeMessage: '',
          introduction: '',
          content: '',
          quest: {
            description: '',
            questions: [
              {
                id: '1',
                text: '',
                options: ['', ''],
                correctAnswer: 0
              }
            ]
          },
          reward: {
            amount: 100
          }
        }
      ]
    }));
  };

  const handleRemoveRound = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Simulate API call
      setTimeout(() => {
        showToast('Mission created successfully! 🎉', 'success');
        navigate('/studio');
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/studio');
    } else {
      setCurrentStep(1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.title.trim() !== '' && 
             formData.brief.trim() !== '' && 
             formData.clanId !== '';
    }

    return formData.rounds.every(round => 
      round.title.trim() !== '' &&
      round.welcomeMessage.trim() !== '' &&
      round.introduction.trim() !== '' &&
      round.content.trim() !== '' &&
      round.quest.description.trim() !== '' &&
      round.quest.questions.every(q => 
        q.text.trim() !== '' &&
        q.options.every(o => o.trim() !== '')
      )
    );
  };

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
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Scroll className="w-6 h-6 text-primary-500" />
            Craft New Mission
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Design an engaging learning experience
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
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors",
                index + 1 <= currentStep
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              )}>
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
                    Mission Title *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter an epic mission title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Brief Description *
                  </label>
                  <textarea
                    required
                    maxLength={200}
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe the mission's objectives"
                    rows={3}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formData.brief.length}/200 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Clan *
                  </label>
                  <select
                    required
                    value={formData.clanId}
                    onChange={(e) => setFormData({ ...formData, clanId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Choose a clan</option>
                    {mockClans.map((clan) => (
                      <option key={clan.id} value={clan.id}>{clan.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <RoundConfig
                rounds={formData.rounds}
                onRoundsChange={(rounds) => setFormData({ ...formData, rounds })}
                onAddRound={handleAddRound}
                onRemoveRound={handleRemoveRound}
              />
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
              <Button
                type="submit"
                disabled={!isStepValid()}
                icon={currentStep === 2 ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                className="bg-gradient-to-r from-primary-500 to-secondary-500"
              >
                {currentStep === 1 ? 'Continue' : 'Create Mission'}
              </Button>
            </div>
          </form>
        </CardContent>
      
      </Card>
    </div>
  );
}
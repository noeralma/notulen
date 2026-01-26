import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Save } from "lucide-react";
import { INITIAL_DATA } from "../types/form";
import type { FormData, Step1Data, Step2Data } from "../types/form";
import Step1Commitment from "./steps/Step1Commitment";
import Step2PerformanceEvaluation from "./steps/Step2PerformanceEvaluation";

const FormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isStepValid, setIsStepValid] = useState(false);

  const totalSteps = 19;

  const updateStep1Data = (data: Partial<Step1Data>) => {
    setFormData((prev) => ({
      ...prev,
      step1: { ...prev.step1, ...data },
    }));
  };

  const updateStep2Data = (data: Partial<Step2Data>) => {
    setFormData((prev) => ({
      ...prev,
      step2: { ...prev.step2, ...data },
    }));
  };

  const handleNext = () => {
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      setIsStepValid(false); // Reset for next step
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setIsStepValid(true); // Assume valid if going back to review (simplification)
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Commitment
            data={formData.step1}
            updateData={updateStep1Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 2:
        return (
          <Step2PerformanceEvaluation
            data={formData.step2}
            updateData={updateStep2Data}
            onValidityChange={setIsStepValid}
          />
        );
      default:
        return (
          <div className="p-10 text-center text-slate-500 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              Part {currentStep} Coming Soon
            </h3>
            <p>This part of the form is under construction.</p>
          </div>
        );
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round(progressPercentage)}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Footer */}
      <div
        className={`
          mt-8 flex items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100
          ${currentStep === 1 ? "justify-end" : "justify-between"}
        `}
      >
        {currentStep > 1 && (
          <button
            onClick={handlePrev}
            className="flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={!isStepValid && currentStep < totalSteps}
          className={`
            flex items-center px-8 py-3 rounded-lg font-bold shadow-md transition-all duration-200
            ${
              !isStepValid && currentStep < totalSteps
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
            }
          `}
        >
          {currentStep === totalSteps ? (
            <>
              <Save className="w-5 h-5 mr-2" />
              Submit
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FormWizard;

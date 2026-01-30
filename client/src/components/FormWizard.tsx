import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Save } from "lucide-react";
import { INITIAL_DATA } from "../types/form";
import type {
  FormData,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
} from "../types/form";
import { PROJECT_CONSTANTS } from "../lib/constants";
import Step1Commitment from "./steps/Step1Commitment";
import Step2PerformanceEvaluation from "./steps/Step2PerformanceEvaluation";
import Step3ProjectRequest from "./steps/Step3ProjectRequest";
import Step4General from "./steps/Step4General";
import Step5ScopeOfWork from "./steps/Step5ScopeOfWork";
import Step6FinancialAspects from "./steps/Step6FinancialAspects";
import Step7Csms from "./steps/Step7Csms";

const FormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isStepValid, setIsStepValid] = useState(false);

  const totalSteps = PROJECT_CONSTANTS.TOTAL_STEPS;

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

  const updateStep3Data = (data: Partial<Step3Data>) => {
    setFormData((prev) => ({
      ...prev,
      step3: { ...prev.step3, ...data },
    }));
  };

  const updateStep4Data = (data: Partial<Step4Data>) => {
    setFormData((prev) => ({
      ...prev,
      step4: { ...prev.step4, ...data },
    }));
  };

  const updateStep5Data = (data: Partial<Step5Data>) => {
    setFormData((prev) => ({
      ...prev,
      step5: { ...prev.step5, ...data },
    }));
  };

  const updateStep6Data = (data: Partial<Step6Data>) => {
    setFormData((prev) => ({
      ...prev,
      step6: { ...prev.step6, ...data },
    }));
  };

  const updateStep7Data = (data: Partial<Step7Data>) => {
    setFormData((prev) => ({
      ...prev,
      step7: { ...prev.step7, ...data },
    }));
  };

  // Ensure step3 data exists (handling HMR or legacy state)
  // We don't block render with null anymore, just initialize if missing
  const currentStep3Data = formData.step3 ||
    INITIAL_DATA.step3 || {
      nama: "",
      createdDate: "",
      approvedDate: "",
      projectType: "",
    };

  const currentStep4Data = formData.step4 ||
    INITIAL_DATA.step4 || {
      judulPaket: "",
      penggunaBarangJasa: "",
      picPenggunaBarangJasa: "",
    };

  const currentStep5Data = formData.step5 || INITIAL_DATA.step5 || {};
  const currentStep6Data = formData.step6 || INITIAL_DATA.step6 || {};
  const currentStep7Data = formData.step7 || INITIAL_DATA.step7 || {};

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
      case 3:
        return (
          <Step3ProjectRequest
            data={currentStep3Data}
            updateData={updateStep3Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 4:
        return (
          <Step4General
            data={currentStep4Data}
            updateData={updateStep4Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 5:
        return (
          <Step5ScopeOfWork
            data={currentStep5Data}
            updateData={updateStep5Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 6:
        return (
          <Step6FinancialAspects
            data={currentStep6Data}
            updateData={updateStep6Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 7:
        return (
          <Step7Csms
            data={currentStep7Data}
            updateData={updateStep7Data}
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

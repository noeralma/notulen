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
  Step8Data,
  Step9Data,
  Step10Data,
  Step11Data,
  Step12Data,
  Step13Data,
  Step14Data,
  Step15Data,
  Step16Data,
  Step17Data,
  Step18Data,
  Step19Data,
} from "../types/form";
import { PROJECT_CONSTANTS } from "../lib/constants";
import Step1Commitment from "./steps/Step1Commitment";
import Step2PerformanceEvaluation from "./steps/Step2PerformanceEvaluation";
import Step3ProjectRequest from "./steps/Step3ProjectRequest";
import Step4General from "./steps/Step4General";
import Step5ScopeOfWork from "./steps/Step5ScopeOfWork";
import Step6FinancialAspects from "./steps/Step6FinancialAspects";
import Step7Csms from "./steps/Step7Csms";
import Step8SpecialQualification from "./steps/Step8SpecialQualification";
import Step9TechnicalEvaluation from "./steps/Step9TechnicalEvaluation";
import Step10CommercialEvaluation from "./steps/Step10CommercialEvaluation";
import Step11ContractDraft from "./steps/Step11ContractDraft";
import Step12HPS from "./steps/Step12HPS";
import Step13MySAP from "./steps/Step13MySAP";
import Step14ProsesPemilihan from "./steps/Step14ProsesPemilihan";
import Step15RencanaJadwal from "./steps/Step15RencanaJadwal";
import Step16ScheduleExecution from "./steps/Step16ScheduleExecution";
import Step17Lainnya from "./steps/Step17Lainnya";
import Step18HasilPembahasan from "./steps/Step18HasilPembahasan";
import Step19Kesimpulan from "./steps/Step19Kesimpulan";
import { api } from "../lib/api";

const FormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isStepValid, setIsStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitId, setSubmitId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadId, setLoadId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const updateStep8Data = (data: Partial<Step8Data>) => {
    setFormData((prev) => ({
      ...prev,
      step8: { ...prev.step8, ...data },
    }));
  };

  const updateStep9Data = (data: Partial<Step9Data>) => {
    setFormData((prev) => ({
      ...prev,
      step9: { ...prev.step9, ...data },
    }));
  };

  const updateStep10Data = (data: Partial<Step10Data>) => {
    setFormData((prev) => ({
      ...prev,
      step10: { ...prev.step10, ...data },
    }));
  };

  const updateStep11Data = (data: Partial<Step11Data>) => {
    setFormData((prev) => ({
      ...prev,
      step11: { ...prev.step11, ...data },
    }));
  };

  const updateStep12Data = (data: Partial<Step12Data>) => {
    setFormData((prev) => ({
      ...prev,
      step12: { ...prev.step12, ...data },
    }));
  };

  const updateStep13Data = (data: Partial<Step13Data>) => {
    setFormData((prev) => ({
      ...prev,
      step13: { ...prev.step13, ...data },
    }));
  };

  const updateStep14Data = (data: Partial<Step14Data>) => {
    setFormData((prev) => ({
      ...prev,
      step14: { ...prev.step14, ...data },
    }));
  };

  const updateStep15Data = (data: Partial<Step15Data>) => {
    setFormData((prev) => ({
      ...prev,
      step15: { ...prev.step15, ...data },
    }));
  };

  const updateStep16Data = (data: Partial<Step16Data>) => {
    setFormData((prev) => ({
      ...prev,
      step16: { ...prev.step16, ...data },
    }));
  };

  const updateStep17Data = (data: Partial<Step17Data>) => {
    setFormData((prev) => ({
      ...prev,
      step17: { ...prev.step17, ...data },
    }));
  };

  const updateStep18Data = (data: Partial<Step18Data>) => {
    setFormData((prev) => ({
      ...prev,
      step18: { ...prev.step18, ...data },
    }));
  };

  const updateStep19Data = (data: Partial<Step19Data>) => {
    setFormData((prev) => ({
      ...prev,
      step19: { ...prev.step19, ...data },
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
  const currentStep8Data = formData.step8 || INITIAL_DATA.step8 || {};
  const currentStep9Data = formData.step9 || INITIAL_DATA.step9 || {};
  const currentStep10Data = formData.step10 || INITIAL_DATA.step10 || {};
  const currentStep11Data = formData.step11 || INITIAL_DATA.step11 || {};
  const currentStep12Data = formData.step12 || INITIAL_DATA.step12 || {};
  const currentStep13Data = formData.step13 || INITIAL_DATA.step13 || {};
  const currentStep14Data = formData.step14 || INITIAL_DATA.step14 || {};
  const currentStep15Data = formData.step15 || INITIAL_DATA.step15 || {};
  const currentStep16Data = formData.step16 || INITIAL_DATA.step16 || {};
  const currentStep17Data = formData.step17 || INITIAL_DATA.step17 || {};
  const currentStep18Data = formData.step18 || INITIAL_DATA.step18 || {};
  const currentStep19Data = formData.step19 || INITIAL_DATA.step19 || {};

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

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await api.post<{ status: string; data: { id: string } }>(
        "/submissions",
        formData,
      );
      setSubmitId(res.data.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Submission failed";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoad = async () => {
    if (!loadId) return;
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await api.get<{ status: string; data: { data: FormData } }>(
        `/submissions/${encodeURIComponent(loadId)}`,
      );
      setFormData(res.data.data);
      setCurrentStep(1);
      setIsStepValid(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Load failed";
      setLoadError(msg);
    } finally {
      setIsLoading(false);
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
      case 8:
        return (
          <Step8SpecialQualification
            data={currentStep8Data}
            updateData={updateStep8Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 9:
        return (
          <Step9TechnicalEvaluation
            data={currentStep9Data}
            updateData={updateStep9Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 10:
        return (
          <Step10CommercialEvaluation
            data={currentStep10Data}
            updateData={updateStep10Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 11:
        return (
          <Step11ContractDraft
            data={currentStep11Data}
            updateData={updateStep11Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 12:
        return (
          <Step12HPS
            data={currentStep12Data}
            updateData={updateStep12Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 13:
        return (
          <Step13MySAP
            data={currentStep13Data}
            updateData={updateStep13Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 14:
        return (
          <Step14ProsesPemilihan
            data={currentStep14Data}
            updateData={updateStep14Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 15:
        return (
          <Step15RencanaJadwal
            data={currentStep15Data}
            updateData={updateStep15Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 16:
        return (
          <Step16ScheduleExecution
            data={currentStep16Data}
            updateData={updateStep16Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 17:
        return (
          <Step17Lainnya
            data={currentStep17Data}
            updateData={updateStep17Data}
            onValidityChange={setIsStepValid}
          />
        );
      case 18:
        return (
          <Step18HasilPembahasan
            data={currentStep18Data}
            updateData={updateStep18Data}
            onValidityChange={setIsStepValid}
            formData={formData}
          />
        );
      case 19:
        return (
          <Step19Kesimpulan
            data={currentStep19Data}
            updateData={updateStep19Data}
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
        <div className="mt-4 flex items-center gap-2">
          <input
            value={loadId}
            onChange={(e) => setLoadId(e.target.value)}
            placeholder="Enter Submission ID"
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleLoad}
            disabled={isLoading || !loadId}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isLoading || !loadId
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-slate-800 text-white hover:bg-slate-900"
            }`}
          >
            {isLoading ? "Loading..." : "Load"}
          </button>
        </div>
        {loadError && (
          <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">
            {loadError}
          </div>
        )}
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
          onClick={currentStep === totalSteps ? handleSubmit : handleNext}
          disabled={(!isStepValid && currentStep < totalSteps) || isSubmitting}
          className={`
            flex items-center px-8 py-3 rounded-lg font-bold shadow-md transition-all duration-200
            ${
              (!isStepValid && currentStep < totalSteps) || isSubmitting
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
            }
          `}
        >
          {currentStep === totalSteps ? (
            <>
              <Save className="w-5 h-5 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>
      {currentStep === totalSteps && (
        <div className="mt-4">
          {submitId && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
              Submitted. ID: {submitId}
            </div>
          )}
          {submitError && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
              {submitError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormWizard;

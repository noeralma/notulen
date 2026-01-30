import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import type { Step16Data } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step16Props {
  data: Step16Data;
  updateData: (data: Partial<Step16Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step16ScheduleExecution: React.FC<Step16Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  useEffect(() => {
    onValidityChange(data.scheduleExecution);
  }, [data.scheduleExecution, onValidityChange]);

  const toggleAgreement = () => {
    updateData({ scheduleExecution: !data.scheduleExecution });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          {PROJECT_CONSTANTS.STEP16_TEXT.TITLE}
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Konfirmasi pelaksanaan sesuai jadwal.
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-slate-700 leading-relaxed font-medium text-sm">
              {PROJECT_CONSTANTS.STEP16_TEXT.ACCEPTANCE_TEXT}
            </p>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={toggleAgreement}
          className={`
            cursor-pointer p-4 rounded-xl border-2 transition-all duration-200
            flex items-center gap-3 group
            ${
              data.scheduleExecution
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
            }
          `}
        >
          <div
            className={`
              w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0
              ${
                data.scheduleExecution
                  ? "bg-green-500 border-green-500"
                  : "border-slate-300 group-hover:border-blue-400 bg-white"
              }
            `}
          >
            {data.scheduleExecution && (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`font-semibold text-base ${
                data.scheduleExecution ? "text-green-800" : "text-slate-700"
              }`}
            >
              {PROJECT_CONSTANTS.STEP16_TEXT.AGREEMENT_LABEL}
            </h3>
            <p
              className={`text-xs ${
                data.scheduleExecution ? "text-green-600" : "text-slate-500"
              }`}
            >
              {PROJECT_CONSTANTS.STEP16_TEXT.AGREEMENT_SUBTEXT}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Step16ScheduleExecution;

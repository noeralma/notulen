import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import type { Step2Data } from "../../types/form";

interface Step2Props {
  data: Step2Data;
  updateData: (data: Partial<Step2Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step2PerformanceEvaluation: React.FC<Step2Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  // Validate immediately when component mounts or data changes
  useEffect(() => {
    onValidityChange(data.performanceEvaluation);
  }, [data.performanceEvaluation, onValidityChange]);

  const toggleAgreement = () => {
    updateData({ performanceEvaluation: !data.performanceEvaluation });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          REMINDER EVALUASI KINERJA PENYEDIA
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Untuk Paket Pekerjaan Sebelumnya
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-slate-700 leading-relaxed font-bold text-sm">
              Procurement mengingatkan Pengguna agar dapat menyampaikan hasil
              evaluasi kinerja penyedia dari paket-paket pekerjaan sebelumnya
              yang telah selesai di GSLT.
            </p>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={toggleAgreement}
          className={`
            cursor-pointer p-3 rounded-xl border-2 transition-all duration-200
            flex items-center gap-3 group
            ${
              data.performanceEvaluation
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
            }
          `}
        >
          <div
            className={`
              w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0
              ${
                data.performanceEvaluation
                  ? "bg-green-500 border-green-500"
                  : "border-slate-300 group-hover:border-blue-400 bg-white"
              }
            `}
          >
            {data.performanceEvaluation && (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`font-semibold text-base ${data.performanceEvaluation ? "text-green-800" : "text-slate-700"}`}
            >
              Saya Mengerti dan Setuju
            </h3>
            <p
              className={`text-xs ${data.performanceEvaluation ? "text-green-600" : "text-slate-500"}`}
            >
              Klik disini untuk menyetujui pernyataan diatas
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Step2PerformanceEvaluation;

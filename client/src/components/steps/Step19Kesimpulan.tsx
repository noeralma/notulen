import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Step19Data } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step19Props {
  data: Step19Data;
  updateData: (data: Partial<Step19Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step19Kesimpulan: React.FC<Step19Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  useEffect(() => {
    onValidityChange(data.read);
  }, [data.read, onValidityChange]);

  const toggleRead = () => {
    updateData({ read: !data.read });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          {PROJECT_CONSTANTS.STEP19_TEXT.TITLE}
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Kesimpulan dan kesepakatan akhir.
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="space-y-6 mb-8">
          {PROJECT_CONSTANTS.STEP19_TEXT.ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mt-0.5">
                  {item.id}
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium leading-relaxed text-justify">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={toggleRead}
          className={`
            cursor-pointer p-4 rounded-xl border-2 transition-all duration-200
            flex items-center gap-3 group
            ${
              data.read
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
            }
          `}
        >
          <div
            className={`
              w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0
              ${
                data.read
                  ? "bg-green-500 border-green-500"
                  : "border-slate-300 group-hover:border-blue-400 bg-white"
              }
            `}
          >
            {data.read && (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`font-semibold text-base ${
                data.read ? "text-green-800" : "text-slate-700"
              }`}
            >
              {PROJECT_CONSTANTS.STEP19_TEXT.AGREEMENT_LABEL}
            </h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Step19Kesimpulan;

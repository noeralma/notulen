import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import type { Step1Data } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Props {
  data: Step1Data;
  updateData: (data: Partial<Step1Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step1Commitment: React.FC<Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  const [touched, setTouched] = useState(false);

  const mandatoryFields = PROJECT_CONSTANTS.MANDATORY_FIELDS_STEP1;

  const isValid = mandatoryFields.every((field) => data[field.key]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const toggleCheckbox = (key: keyof Step1Data) => {
    setTouched(true);
    updateData({ [key]: !data[key] });
  };

  const handleOthersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ othersDescription: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-1">
          Komitmen HSSE dan Budaya AKHLAK
        </h2>
        <p className="text-slate-500 mb-4 text-sm">
          Silakan konfirmasi pelaksanaan item-item berikut sebelum melanjutkan.
        </p>

        <div className="space-y-2">
          {mandatoryFields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                group flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${
                  data[field.key]
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                }
              `}
              onClick={() => toggleCheckbox(field.key)}
            >
              <div
                className={`
                w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors shrink-0
                ${
                  data[field.key]
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-slate-300 group-hover:border-blue-400"
                }
              `}
              >
                {data[field.key] && (
                  <Check className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span
                className={`font-medium text-sm ${data[field.key] ? "text-blue-700" : "text-slate-700"}`}
              >
                {field.label}
              </span>
            </motion.div>
          ))}

          {/* Others Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`
              flex flex-col p-3 rounded-lg border-2 transition-all duration-200
              ${data.others ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"}
            `}
          >
            <div
              className="flex items-center cursor-pointer mb-2"
              onClick={() => toggleCheckbox("others")}
            >
              <div
                className={`
                w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors shrink-0
                ${
                  data.others
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-slate-300 hover:border-blue-400"
                }
              `}
              >
                {data.others && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <span
                className={`font-medium text-sm ${data.others ? "text-blue-700" : "text-slate-700"}`}
              >
                Others:
              </span>
            </div>

            {data.others && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="ml-10 mt-2"
              >
                <input
                  type="text"
                  value={data.othersDescription}
                  onChange={handleOthersChange}
                  placeholder="Sebutkan lainnya..."
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </motion.div>
            )}
          </motion.div>
        </div>

        {!isValid && touched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center text-amber-600 bg-amber-50 p-3 rounded-md text-sm"
          >
            <Info className="w-4 h-4 mr-2" />
            <span>Mohon checklist 5 poin pertama untuk melanjutkan.</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Step1Commitment;

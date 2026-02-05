import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, StickyNote } from "lucide-react";
import type { Step6Data, LampiranItem } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";
import { ValidatedInput } from "../ui/ValidatedInput";
import { INITIAL_DATA } from "../../types/form";

interface Step6Props {
  data: Step6Data;
  updateData: (data: Partial<Step6Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step6FinancialAspects: React.FC<Step6Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  useEffect(() => {
    const validateDocuments = (group?: Record<string, LampiranItem>) => {
      if (!group) return true;
      return Object.values(group).every((item) => {
        if (!item.isActive) return true;
        return item.existence && item.suitability;
      });
    };

    const isValid = validateDocuments(data.financialDocuments);
    onValidityChange(isValid);
  }, [data.financialDocuments, onValidityChange]);

  const getRowStatus = (item: LampiranItem) => {
    const cVal = item.isActive ? "√" : "X";
    const gVal =
      item.existence === "Ada"
        ? "√"
        : item.existence === "Tidak Ada"
          ? "X"
          : "";
    const jVal =
      item.suitability === "Sesuai"
        ? "√"
        : item.suitability === "Tidak Sesuai"
          ? "X"
          : "";

    if (!cVal || !gVal || !jVal) return "";

    if (cVal === "X") {
      if (gVal === "X" && jVal === "√") return "Closed";
      return "ERROR";
    }

    if (cVal === "√" && gVal === "X") {
      if (jVal === "X") return "Open";
      return "ERROR";
    }

    if (cVal === "√" && gVal === "√" && jVal === "√") return "Closed";

    return "Open";
  };

  const handleDocumentToggle = (key: string) => {
    const currentDocs =
      data.financialDocuments || INITIAL_DATA.step6.financialDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      financialDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          isActive: newIsActive,
          existence: newIsActive ? null : "Tidak Ada",
          suitability: newIsActive ? null : "Sesuai",
        },
      },
    });
  };

  const handleDocumentUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan" | "tindakLanjut",
    value: string,
  ) => {
    const currentDocs =
      data.financialDocuments || INITIAL_DATA.step6.financialDocuments;
    if (!currentDocs) return;

    updateData({
      financialDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">KETENTUAN ASPEK FINANSIAL</h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Silakan lengkapi dokumen finansial di bawah ini.
        </p>
      </div>

      <div className="p-5 space-y-6">
        <div className="space-y-4">
          {PROJECT_CONSTANTS.STEP6_DOCUMENTS.map((doc) => {
            const item = data.financialDocuments?.[doc.key] || {
              isActive: false,
              existence: null,
              suitability: null,
            };

            const status = getRowStatus(item);

            return (
              <div
                key={doc.key}
                className={`
                    p-4 rounded-xl border-2 transition-all duration-200
                    ${
                      item.isActive
                        ? "border-blue-200 bg-blue-50/50"
                        : "border-slate-100 bg-slate-50"
                    }
                  `}
              >
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`
                          w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors
                          ${
                            item.isActive
                              ? "bg-blue-600 border-blue-600"
                              : "border-slate-300 bg-white"
                          }
                        `}
                    >
                      {item.isActive && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={item.isActive}
                      onChange={() => handleDocumentToggle(doc.key)}
                      className="hidden"
                    />
                    <span
                      className={`font-medium ${
                        item.isActive ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {doc.label}
                    </span>
                  </label>

                  {status && (
                    <div
                      className={`
                          px-3 py-1 rounded-full text-xs font-bold border
                          ${
                            status === "Closed"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : status === "Open"
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : "bg-red-100 text-red-700 border-red-200"
                          }
                        `}
                    >
                      {status}
                    </div>
                  )}
                </div>

                <div className="overflow-hidden">
                  <AnimatePresence>
                    {item.isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 pt-2 border-t border-slate-200/60"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-slate-600">
                              Keberadaan Dokumen
                            </span>
                            <div className="flex gap-4">
                              {["Ada", "Tidak Ada"].map((opt) => (
                                <label
                                  key={opt}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={`${doc.key}-existence`}
                                    value={opt}
                                    checked={item.existence === opt}
                                    onChange={(e) =>
                                      handleDocumentUpdate(
                                        doc.key,
                                        "existence",
                                        e.target.value,
                                      )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-slate-700">
                                    {opt}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-sm font-medium text-slate-600">
                              Kesesuaian Dokumen
                            </span>
                            <div className="flex gap-4">
                              {["Sesuai", "Tidak Sesuai"].map((opt) => (
                                <label
                                  key={opt}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={`${doc.key}-suitability`}
                                    value={opt}
                                    checked={item.suitability === opt}
                                    onChange={(e) =>
                                      handleDocumentUpdate(
                                        doc.key,
                                        "suitability",
                                        e.target.value,
                                      )
                                    }
                                    className="text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-slate-700">
                                    {opt}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pl-9 pt-4">
                          <div className="space-y-2 mb-4">
                            <span className="text-sm font-medium text-slate-600">
                              Tindak Lanjut
                            </span>
                            <select
                              value={item.tindakLanjut || ""}
                              onChange={(e) =>
                                handleDocumentUpdate(
                                  doc.key,
                                  "tindakLanjut",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Pilih Tindak Lanjut...</option>
                              {PROJECT_CONSTANTS.TINDAK_LANJUT_OPTIONS.map(
                                (option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                          <ValidatedInput
                            id={`${doc.key}-catatan`}
                            label="Catatan"
                            value={item.catatan || ""}
                            onChange={(e) =>
                              handleDocumentUpdate(
                                doc.key,
                                "catatan",
                                e.target.value,
                              )
                            }
                            placeholder="Tambahkan catatan..."
                            icon={StickyNote}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step6FinancialAspects;

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, StickyNote } from "lucide-react";
import { ValidatedInput } from "../ui/ValidatedInput";
import {
  type Step9Data,
  type LampiranItem,
  INITIAL_DATA,
} from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step9Props {
  data: Step9Data;
  updateData: (data: Partial<Step9Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step9TechnicalEvaluation: React.FC<Step9Props> = ({
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

    const isValid = validateDocuments(data.technicalDocuments);
    onValidityChange(isValid);
  }, [data.technicalDocuments, onValidityChange]);

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

  const handleDocumentUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan",
    value: string,
  ) => {
    const currentDocs =
      data.technicalDocuments || INITIAL_DATA.step9.technicalDocuments;
    if (!currentDocs) return;

    updateData({
      technicalDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          [field]: value,
        },
      },
    });
  };

  const handleToggle = (key: string) => {
    const currentDocs =
      data.technicalDocuments || INITIAL_DATA.step9.technicalDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      technicalDocuments: {
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

  const handleScoreUpdate = (
    key: string,
    scoreField: "scorePengalaman" | "scoreMetodologi" | "scoreTenagaAhli",
    value: string,
  ) => {
    const currentDocs =
      data.technicalDocuments || INITIAL_DATA.step9.technicalDocuments;
    if (!currentDocs) return;

    const numValue = value === "" ? undefined : parseFloat(value);

    updateData({
      technicalDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          [scoreField]: numValue,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            {PROJECT_CONSTANTS.STEP9_TEXT.TITLE}
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {PROJECT_CONSTANTS.STEP9_DOCUMENTS.map((doc) => {
              const item = data.technicalDocuments?.[doc.key] ||
                INITIAL_DATA.step9.technicalDocuments?.[doc.key] || {
                  isActive: false,
                  existence: null,
                  suitability: null,
                  catatan: "",
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
                        className="hidden"
                        checked={item.isActive}
                        onChange={() => handleToggle(doc.key)}
                      />
                      <span
                        className={`font-medium ${
                          item.isActive ? "text-blue-900" : "text-slate-600"
                        }`}
                      >
                        {doc.label}
                      </span>
                    </label>

                    <div className="flex items-center gap-4">
                      {status && (
                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              status === "Closed"
                                ? "bg-emerald-100 text-emerald-700"
                                : status === "Open"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {status}
                        </span>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {item.isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 pt-2 border-t border-slate-200/60"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Special Section for Kriteria Penilaian Teknis */}
                          {doc.key === "kriteriaPenilaianTeknis" && (
                            <div className="md:col-span-2 space-y-4 border rounded-lg p-4 bg-slate-50">
                              <h4 className="font-semibold text-slate-700">
                                Unsur Evaluasi Teknis
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Pengalaman Perusahaan
                                    <span className="text-xs text-slate-500 block">
                                      (Bobot Minimal: 20%)
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    value={item.scorePengalaman ?? ""}
                                    onChange={(e) =>
                                      handleScoreUpdate(
                                        doc.key,
                                        "scorePengalaman",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Pendekatan & Metodologi
                                    <span className="text-xs text-slate-500 block">
                                      (Bobot Minimal: 20%)
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    value={item.scoreMetodologi ?? ""}
                                    onChange={(e) =>
                                      handleScoreUpdate(
                                        doc.key,
                                        "scoreMetodologi",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Kualifikasi Tenaga Ahli
                                    <span className="text-xs text-slate-500 block">
                                      (Bobot Minimal: 35%)
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    value={item.scoreTenagaAhli ?? ""}
                                    onChange={(e) =>
                                      handleScoreUpdate(
                                        doc.key,
                                        "scoreTenagaAhli",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                                <span className="font-semibold text-slate-700">
                                  Total Score:{" "}
                                  {(item.scorePengalaman || 0) +
                                    (item.scoreMetodologi || 0) +
                                    (item.scoreTenagaAhli || 0)}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-slate-600">
                                    Passing Grade: 75
                                  </span>
                                  {(item.scorePengalaman || 0) +
                                    (item.scoreMetodologi || 0) +
                                    (item.scoreTenagaAhli || 0) >=
                                  75 ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                      LULUS
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                                      TIDAK LULUS
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Keberadaan Dokumen */}
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

                          {/* Kesesuaian Dokumen */}
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step9TechnicalEvaluation;

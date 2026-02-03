import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle2, StickyNote } from "lucide-react";
import type { Step5Data, LampiranItem } from "../../types/form";
import { INITIAL_DATA } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";
import { ValidatedInput } from "../ui/ValidatedInput";

interface Step5Props {
  data: Step5Data;
  updateData: (data: Partial<Step5Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step5ScopeOfWork: React.FC<Step5Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  useEffect(() => {
    const validateDocumentsEntries = (group?: Record<string, LampiranItem>) => {
      if (!group) return true;
      return Object.entries(group).every(([key, item]) => {
        if (!item.isActive) return true;

        const basicValid = item.existence && item.suitability;
        if (!basicValid) return false;

        if (key === "aspekK3HssePlan") {
          if (!item.requirement) return false;
          if (item.requirement === "Dipersyaratkan" && !item.riskLevel)
            return false;
        }
        return true;
      });
    };

    const isValid = validateDocumentsEntries(data.scopeDocuments);
    onValidityChange(isValid);
  }, [data.scopeDocuments, onValidityChange]);

  const getRowStatus = (key: string, item: LampiranItem) => {
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

    // HSSE Special Validation
    if (key === "aspekK3HssePlan" && item.isActive) {
      if (!item.requirement) return ""; // Incomplete, show no badge
      if (item.requirement === "Dipersyaratkan" && !item.riskLevel) return ""; // Incomplete, show no badge
    }

    if (!cVal || !gVal || !jVal) return "";

    // If HSSE and required but no risk level (double check)
    if (
      key === "aspekK3HssePlan" &&
      item.requirement === "Dipersyaratkan" &&
      !item.riskLevel
    ) {
      return "";
    }

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
      data.scopeDocuments || INITIAL_DATA.step5.scopeDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      scopeDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          isActive: newIsActive,
          existence: newIsActive ? null : "Tidak Ada",
          suitability: newIsActive ? null : "Sesuai",
          // Reset HSSE fields if untoggled
          ...(key === "aspekK3HssePlan" && !newIsActive
            ? { requirement: null, riskLevel: null }
            : {}),
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
      data.scopeDocuments || INITIAL_DATA.step5.scopeDocuments;
    if (!currentDocs) return;

    updateData({
      scopeDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          [field]: value,
        },
      },
    });
  };

  const handleHsseUpdate = (
    key: string,
    field: "requirement" | "riskLevel",
    value: string,
  ) => {
    const currentDocs =
      data.scopeDocuments || INITIAL_DATA.step5.scopeDocuments;
    if (!currentDocs) return;

    // Type casting to ensure safety, assuming inputs are controlled and valid
    const updates: Partial<LampiranItem> = {
      [field]: value as any,
    };

    if (field === "requirement" && value === "Tidak Dipersyaratkan") {
      updates.riskLevel = null;
    }

    updateData({
      scopeDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          ...updates,
        },
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          {PROJECT_CONSTANTS.STEP5_TEXT.TITLE}
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Bagian ini berisi pengingat mengenai tujuan dan lingkup pekerjaan.
        </p>
      </div>

      <div className="p-5 space-y-8">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800">
              {PROJECT_CONSTANTS.STEP5_TEXT.REMINDER_1_TITLE}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {PROJECT_CONSTANTS.STEP5_TEXT.REMINDER_1_BODY}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800">
              {PROJECT_CONSTANTS.STEP5_TEXT.REMINDER_2_TITLE}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {PROJECT_CONSTANTS.STEP5_TEXT.REMINDER_2_BODY}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            Dokumen Lingkup Pekerjaan
          </h3>
          <div className="space-y-4">
            {PROJECT_CONSTANTS.STEP5_DOCUMENTS.map((doc) => {
              const item = data.scopeDocuments?.[doc.key] || {
                isActive: false,
                existence: null,
                suitability: null,
              };

              const status = getRowStatus(doc.key, item);

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

                          {/* Special HSSE Plan Section */}
                          {doc.key === "aspekK3HssePlan" && (
                            <div className="space-y-4 pt-2 border-t border-slate-100 mt-4">
                              <div className="space-y-2">
                                <span className="text-sm font-medium text-slate-600">
                                  Requirement HSSE
                                </span>
                                <div className="flex gap-4">
                                  {[
                                    "Dipersyaratkan",
                                    "Tidak Dipersyaratkan",
                                  ].map((opt) => (
                                    <label
                                      key={opt}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        name={`${doc.key}-requirement`}
                                        value={opt}
                                        checked={item.requirement === opt}
                                        onChange={(e) =>
                                          handleHsseUpdate(
                                            doc.key,
                                            "requirement",
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

                              {/* Risk Level Section with AnimatePresence */}
                              <AnimatePresence>
                                {item.requirement === "Dipersyaratkan" && (
                                  <motion.div
                                    key="risk-level"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-2 pl-4 border-l-2 border-blue-200 overflow-hidden"
                                  >
                                    <span className="text-sm font-medium text-slate-600">
                                      Risk Level
                                    </span>
                                    <div className="flex gap-4 py-1">
                                      {["Rendah", "Menengah", "Tinggi"].map(
                                        (opt) => (
                                          <label
                                            key={opt}
                                            className="flex items-center gap-2 cursor-pointer"
                                          >
                                            <input
                                              type="radio"
                                              name={`${doc.key}-riskLevel`}
                                              value={opt}
                                              checked={item.riskLevel === opt}
                                              onChange={(e) =>
                                                handleHsseUpdate(
                                                  doc.key,
                                                  "riskLevel",
                                                  e.target.value,
                                                )
                                              }
                                              className="text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-slate-700">
                                              {opt}
                                            </span>
                                          </label>
                                        ),
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

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
    </div>
  );
};

export default Step5ScopeOfWork;

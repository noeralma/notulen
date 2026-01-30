import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, FileText, CheckCircle2, StickyNote } from "lucide-react";
import { ValidatedInput } from "../ui/ValidatedInput";
import {
  type Step11Data,
  type LampiranItem,
  INITIAL_DATA,
} from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step11Props {
  data: Step11Data;
  updateData: (data: Partial<Step11Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const InfoModal = ({
  isOpen,
  onClose,
  title,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: readonly string[];
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {content.length > 1 ? (
                <ul className="space-y-4">
                  {content.map((paragraph, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-slate-600 text-sm leading-relaxed"
                    >
                      <span className="shrink-0 font-semibold text-slate-800 select-none">
                        {idx + 1}.
                      </span>
                      <span>{paragraph}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-slate-600 leading-relaxed text-sm"
                  >
                    {paragraph}
                  </p>
                ))
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
              >
                Mengerti
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Step11ContractDraft: React.FC<Step11Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<readonly string[]>([]);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const validateDocuments = (group?: Record<string, LampiranItem>) => {
      if (!group) return true;
      return Object.entries(group).every(([key, item]) => {
        if (!item.isActive) return true;
        if (key === "jenisKontrak") return true;
        return item.existence && item.suitability;
      });
    };

    const isContractValid =
      !!data.jenisKontrak &&
      (data.jenisKontrak !== "Others" || !!data.othersDescription);

    const isDocsValid = validateDocuments(data.contractDocuments);

    onValidityChange(isContractValid && isDocsValid);
  }, [
    data.jenisKontrak,
    data.othersDescription,
    data.contractDocuments,
    onValidityChange,
  ]);

  const getRowStatus = (key: string, item: LampiranItem) => {
    if (key === "jenisKontrak") {
      if (!item.isActive) return "";
      const isValid =
        !!data.jenisKontrak &&
        (data.jenisKontrak !== "Others" || !!data.othersDescription);
      return isValid ? "Closed" : "Open";
    }

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
      data.contractDocuments || INITIAL_DATA.step11.contractDocuments;
    if (!currentDocs) return;

    updateData({
      contractDocuments: {
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
      data.contractDocuments || INITIAL_DATA.step11.contractDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      contractDocuments: {
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

  const handleSelection = (option: string) => {
    // Only update if value changes
    if (option !== data.jenisKontrak) {
      updateData({
        jenisKontrak: option,
        othersDescription: option === "Others" ? "" : undefined,
      });

      // Show popup for specific options
      let content: readonly string[] = [];
      if (option === "Lumsum") {
        content = PROJECT_CONSTANTS.STEP11_CONSTANTS.INFO_LUMSUM;
      } else if (option === "Harga Satuan") {
        content = PROJECT_CONSTANTS.STEP11_CONSTANTS.INFO_HARGA_SATUAN;
      } else if (option === "Gabungan: Harga Satuan & Lumsum") {
        content = PROJECT_CONSTANTS.STEP11_CONSTANTS.INFO_GABUNGAN;
      }

      if (content.length > 0) {
        setModalTitle(`Info: ${option}`);
        setModalContent(content);
        setShowModal(true);
      }
    }
  };

  const showInfo = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    let content: readonly string[] = [];
    if (option === "Lumsum") {
      content = PROJECT_CONSTANTS.STEP11_CONSTANTS.INFO_LUMSUM;
    } else if (option === "Harga Satuan") {
      content = PROJECT_CONSTANTS.STEP11_CONSTANTS.INFO_HARGA_SATUAN;
    } else if (option === "Gabungan: Harga Satuan & Lumsum") {
      content = PROJECT_CONSTANTS.STEP11_CONSTANTS.INFO_GABUNGAN;
    }

    if (content.length > 0) {
      setModalTitle(`Info: ${option}`);
      setModalContent(content);
      setShowModal(true);
    }
  };

  return (
    <div className="space-y-6">
      <InfoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
        content={modalContent}
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            {PROJECT_CONSTANTS.STEP11_TEXT.TITLE}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Document List Section */}
          <div className="space-y-4">
            {PROJECT_CONSTANTS.STEP11_DOCUMENTS.map((doc) => {
              const item = data.contractDocuments?.[doc.key] ||
                INITIAL_DATA.step11.contractDocuments?.[doc.key] || {
                  isActive: false,
                  existence: null,
                  suitability: null,
                  catatan: "",
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
                        {doc.key === "jenisKontrak" && (
                          <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <label className="text-sm font-semibold text-slate-700 block mb-3">
                              Pilih Jenis Kontrak
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                              {PROJECT_CONSTANTS.STEP11_CONSTANTS.JENIS_KONTRAK_OPTIONS.map(
                                (option) => {
                                  const hasInfo =
                                    option === "Lumsum" ||
                                    option === "Harga Satuan" ||
                                    option ===
                                      "Gabungan: Harga Satuan & Lumsum";

                                  return (
                                    <div
                                      key={option}
                                      onClick={() => handleSelection(option)}
                                      className={`
                                          relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                          ${
                                            data.jenisKontrak === option
                                              ? "border-blue-600 bg-blue-50/50"
                                              : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                                          }
                                        `}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`
                                              w-5 h-5 rounded-full border-2 flex items-center justify-center
                                              ${
                                                data.jenisKontrak === option
                                                  ? "border-blue-600"
                                                  : "border-slate-300"
                                              }
                                            `}
                                        >
                                          {data.jenisKontrak === option && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                          )}
                                        </div>
                                        <span
                                          className={`font-medium ${
                                            data.jenisKontrak === option
                                              ? "text-blue-900"
                                              : "text-slate-700"
                                          }`}
                                        >
                                          {option}
                                        </span>
                                      </div>

                                      {hasInfo && (
                                        <button
                                          onClick={(e) => showInfo(e, option)}
                                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                          title="Lihat Keterangan"
                                        >
                                          <Info className="w-5 h-5" />
                                        </button>
                                      )}
                                    </div>
                                  );
                                },
                              )}
                            </div>
                            <AnimatePresence>
                              {data.jenisKontrak === "Others" && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-2">
                                    <ValidatedInput
                                      id="others-description"
                                      label="Keterangan Lainnya"
                                      value={data.othersDescription || ""}
                                      onChange={(e) =>
                                        updateData({
                                          othersDescription: e.target.value,
                                        })
                                      }
                                      placeholder="Sebutkan jenis kontrak lainnya..."
                                      icon={FileText}
                                      required={data.jenisKontrak === "Others"}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                        {doc.key !== "jenisKontrak" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        )}

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

export default Step11ContractDraft;

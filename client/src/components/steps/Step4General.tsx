import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Type, User, FileText, StickyNote } from "lucide-react";
import {
  type Step4Data,
  type LampiranItem,
  INITIAL_DATA,
} from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";
import { ValidatedInput } from "../ui/ValidatedInput";

interface Step4GeneralProps {
  data: Step4Data;
  updateData: (data: Partial<Step4Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step4General: React.FC<Step4GeneralProps> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  const {
    judulPaket,
    penggunaBarangJasa,
    picPenggunaBarangJasa,
    penggunaBarangJasaNotes,
    generalDocuments,
  } = data;

  useEffect(() => {
    const validateDocuments = (group?: Record<string, LampiranItem>) => {
      if (!group) return true;
      return Object.values(group).every((item) => {
        if (!item.isActive) return true;
        return item.existence && item.suitability;
      });
    };

    const isGeneralDocumentsValid = validateDocuments(generalDocuments);

    const isValid =
      judulPaket.trim() !== "" &&
      penggunaBarangJasa !== "" &&
      picPenggunaBarangJasa.trim() !== "" &&
      isGeneralDocumentsValid;

    onValidityChange(isValid);
  }, [
    judulPaket,
    penggunaBarangJasa,
    picPenggunaBarangJasa,
    generalDocuments,
    onValidityChange,
  ]);

  const handleChange = (field: keyof Step4Data, value: string) => {
    updateData({ [field]: value });
  };

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
      data.generalDocuments || INITIAL_DATA.step4.generalDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      generalDocuments: {
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
      data.generalDocuments || INITIAL_DATA.step4.generalDocuments;
    if (!currentDocs) return;

    updateData({
      generalDocuments: {
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
        <h2 className="text-xl font-bold mb-1">UMUM</h2>
      </div>

      <div className="p-5 space-y-8">
        {/* Existing Fields Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            Identitas Paket
          </h3>

          {/* Judul Paket */}
          <ValidatedInput
            label="Judul Paket"
            value={judulPaket}
            onChange={(e) => handleChange("judulPaket", e.target.value)}
            placeholder="Masukkan Judul Paket"
            icon={Type}
            required
          />

          {/* Pengguna Barang/Jasa */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Pengguna Barang/Jasa
            </label>
            <div className="flex flex-wrap gap-4">
              {PROJECT_CONSTANTS.STEP4_CONSTANTS.PENGGUNA_BARANG_JASA_OPTIONS.map(
                (option) => (
                  <label
                    key={option}
                    className={`
                    flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 w-full md:w-auto
                    ${
                      penggunaBarangJasa === option
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                  >
                    <input
                      type="radio"
                      name="penggunaBarangJasa"
                      value={option}
                      checked={penggunaBarangJasa === option}
                      onChange={(e) =>
                        handleChange("penggunaBarangJasa", e.target.value)
                      }
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span
                      className={`font-medium text-sm ${
                        penggunaBarangJasa === option
                          ? "text-blue-700"
                          : "text-slate-700"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ),
              )}
            </div>

            <AnimatePresence initial={false}>
              {penggunaBarangJasa !== "" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-1">
                    <ValidatedInput
                      label="Keterangan Pengguna Barang/Jasa"
                      value={penggunaBarangJasaNotes}
                      onChange={(e) =>
                        handleChange("penggunaBarangJasaNotes", e.target.value)
                      }
                      placeholder="Tuliskan keterangan tambahan (misalnya unit atau detail lain)..."
                      icon={FileText}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PIC Pengguna Barang/Jasa */}
          <ValidatedInput
            label="PIC Pengguna Barang/Jasa"
            value={picPenggunaBarangJasa}
            onChange={(e) =>
              handleChange("picPenggunaBarangJasa", e.target.value)
            }
            placeholder="Masukkan Nama PIC"
            icon={User}
            required
          />
        </div>

        {/* General Documents Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            Kelengkapan Dokumen Umum
          </h3>

          <div className="space-y-4">
            {PROJECT_CONSTANTS.STEP4_CONSTANTS.GENERAL_DOCUMENTS.map((doc) => {
              const item = data.generalDocuments?.[doc.key] ||
                INITIAL_DATA.step4.generalDocuments?.[doc.key] || {
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
                                ? "bg-orange-100 text-orange-700 border-orange-200"
                                : "bg-red-100 text-red-700 border-red-200"
                          }
                        `}
                      >
                        {status.toUpperCase()}
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {item.isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-slate-600">
                              Ketersediaan Dokumen
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4General;

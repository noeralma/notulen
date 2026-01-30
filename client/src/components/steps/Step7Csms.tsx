import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  StickyNote,
  Calendar,
  PenTool,
  AlertTriangle,
} from "lucide-react";
import type { Step7Data, LampiranItem } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";
import { ValidatedInput } from "../ui/ValidatedInput";
import { INITIAL_DATA } from "../../types/form";

interface Step7Props {
  data: Step7Data;
  updateData: (data: Partial<Step7Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  if (!status) return null;
  return (
    <div
      className={`
        px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ml-2
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
  );
};

const Step7Csms: React.FC<Step7Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  useEffect(() => {
    const validateDocuments = (group?: Record<string, LampiranItem>) => {
      if (!group) return true;
      return Object.values(group).every((item) => {
        if (!item.isActive) return true;

        // If active, Existence is mandatory
        if (!item.existence) return false;

        // If "Ada", validate sub-fields
        if (item.existence === "Ada") {
          const hasFormat = !!item.formatSuitability;
          const hasJudul = !!item.judulSuitability;
          const hasLokasi = !!item.lokasiSuitability;
          const hasDurasi = !!item.durasiSuitability;
          const hasKesimpulan = !!item.kesimpulanResiko;
          const hasTanggal = !!item.tanggal;
          const hasPenandatanganan = !!item.penandatanganan;

          return (
            hasFormat &&
            hasJudul &&
            hasLokasi &&
            hasDurasi &&
            hasKesimpulan &&
            hasTanggal &&
            hasPenandatanganan
          );
        }

        return true;
      });
    };

    const isValid = validateDocuments(data.csmsDocuments);
    onValidityChange(isValid);
  }, [data.csmsDocuments, onValidityChange]);

  const getSubStatus = (
    val: string | null | undefined,
    type: "suitability" | "input",
  ) => {
    if (!val) return "Error";
    if (type === "suitability") {
      return val === "Sesuai" ? "Closed" : "Open";
    }
    // For inputs, if filled -> Closed
    return "Closed";
  };

  const getRowStatus = (item: LampiranItem) => {
    const cVal = item.isActive ? "√" : "X";
    const gVal =
      item.existence === "Ada"
        ? "√"
        : item.existence === "Tidak Ada"
          ? "X"
          : "";

    if (!cVal || !gVal) return "";

    if (cVal === "X") {
      if (gVal === "X") return "Closed";
      return "ERROR";
    }

    // Active
    if (cVal === "√") {
      if (gVal === "X") return "ERROR"; // Active but "Tidak Ada"
      if (gVal === "√") {
        // Check sub-fields
        const suitabilities = [
          item.formatSuitability,
          item.judulSuitability,
          item.lokasiSuitability,
          item.durasiSuitability,
        ];
        const inputs = [
          item.kesimpulanResiko,
          item.tanggal,
          item.penandatanganan,
        ];

        // 1. Missing fields -> ERROR
        if (suitabilities.some((s) => !s) || inputs.some((i) => !i))
          return "ERROR";

        // 2. Tidak Sesuai -> Open
        if (suitabilities.some((s) => s === "Tidak Sesuai")) return "Open";

        // 3. All filled and Sesuai -> Closed
        return "Closed";
      }
    }

    return "Open";
  };

  const handleDocumentToggle = (key: string) => {
    const currentDocs = data.csmsDocuments || INITIAL_DATA.step7.csmsDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      csmsDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          isActive: newIsActive,
          existence: newIsActive ? null : "Tidak Ada",
          formatSuitability: null,
          judulSuitability: null,
          lokasiSuitability: null,
          durasiSuitability: null,
          kesimpulanResiko: "",
          tanggal: "",
          penandatanganan: "",
        },
      },
    });
  };

  const handleDocumentUpdate = (
    key: string,
    field: keyof LampiranItem,
    value: string,
  ) => {
    const currentDocs = data.csmsDocuments || INITIAL_DATA.step7.csmsDocuments;
    if (!currentDocs) return;

    updateData({
      csmsDocuments: {
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
        <h2 className="text-xl font-bold mb-1">
          {PROJECT_CONSTANTS.STEP7_TEXT.TITLE}
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Silakan lengkapi dokumen CSMS di bawah ini.
        </p>
      </div>

      <div className="p-5 space-y-6">
        <div className="space-y-4">
          {PROJECT_CONSTANTS.STEP7_DOCUMENTS.map((doc) => {
            const item = data.csmsDocuments?.[doc.key] || {
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
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
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

                        {item.existence === "Ada" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 pt-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Sub Sections with Suitability Toggle */}
                              {[
                                { label: "Format", field: "formatSuitability" },
                                { label: "Judul", field: "judulSuitability" },
                                { label: "Lokasi", field: "lokasiSuitability" },
                                { label: "Durasi", field: "durasiSuitability" },
                              ].map((sub) => (
                                <div key={sub.field} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-600">
                                      {sub.label}
                                    </span>
                                    <StatusBadge
                                      status={getSubStatus(
                                        item[
                                          sub.field as keyof LampiranItem
                                        ] as string | null | undefined,
                                        "suitability",
                                      )}
                                    />
                                  </div>
                                  <div className="flex gap-4">
                                    {["Sesuai", "Tidak Sesuai"].map((opt) => (
                                      <label
                                        key={opt}
                                        className="flex items-center gap-2 cursor-pointer"
                                      >
                                        <input
                                          type="radio"
                                          name={`${doc.key}-${sub.field}`}
                                          value={opt}
                                          checked={
                                            item[
                                              sub.field as keyof LampiranItem
                                            ] === opt
                                          }
                                          onChange={(e) =>
                                            handleDocumentUpdate(
                                              doc.key,
                                              sub.field as keyof LampiranItem,
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
                              ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-4">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="block text-sm font-medium text-slate-700">
                                    Kesimpulan Resiko
                                  </label>
                                  <StatusBadge
                                    status={getSubStatus(
                                      item.kesimpulanResiko,
                                      "input",
                                    )}
                                  />
                                </div>
                                <ValidatedInput
                                  id={`${doc.key}-kesimpulanResiko`}
                                  value={item.kesimpulanResiko || ""}
                                  onChange={(e) =>
                                    handleDocumentUpdate(
                                      doc.key,
                                      "kesimpulanResiko",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Masukkan kesimpulan resiko..."
                                  icon={AlertTriangle}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-medium text-slate-700">
                                      Tanggal
                                    </label>
                                    <StatusBadge
                                      status={getSubStatus(
                                        item.tanggal,
                                        "input",
                                      )}
                                    />
                                  </div>
                                  <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                      type="date"
                                      value={item.tanggal || ""}
                                      onChange={(e) =>
                                        handleDocumentUpdate(
                                          doc.key,
                                          "tanggal",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-medium text-slate-700">
                                      Penandatanganan
                                    </label>
                                    <StatusBadge
                                      status={getSubStatus(
                                        item.penandatanganan,
                                        "input",
                                      )}
                                    />
                                  </div>
                                  <ValidatedInput
                                    id={`${doc.key}-penandatanganan`}
                                    value={item.penandatanganan || ""}
                                    onChange={(e) =>
                                      handleDocumentUpdate(
                                        doc.key,
                                        "penandatanganan",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Nama Penandatangan..."
                                    icon={PenTool}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div className="pl-9 pt-4 border-t border-slate-100">
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

export default Step7Csms;

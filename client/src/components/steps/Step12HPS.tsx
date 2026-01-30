import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, StickyNote } from "lucide-react";
import { ValidatedInput } from "../ui/ValidatedInput";
import {
  type Step12Data,
  type LampiranItem,
  type KeabsahanHpsData,
  INITIAL_DATA,
} from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step12Props {
  data: Step12Data;
  updateData: (data: Partial<Step12Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step12HPS: React.FC<Step12Props> = ({
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

    const validateKeabsahan = (k: KeabsahanHpsData) => {
      if (!k.isActive) return true;

      const isAngkaValid =
        !!k.angkaDanPenyebutan.existence && !!k.angkaDanPenyebutan.suitability;
      const isDasarValid = !!k.dasarPembuatan?.trim();
      const isPenandatanganValid = !!k.penandatangan?.trim();
      const isNilaiValid = !!k.nilaiHps;
      const isMataUangValid =
        !!k.mataUang && (k.mataUang !== "Other" || !!k.mataUangOther?.trim());

      return (
        isAngkaValid &&
        isDasarValid &&
        isPenandatanganValid &&
        isNilaiValid &&
        isMataUangValid
      );
    };

    const isDocsValid = validateDocuments(data.hpsDocuments);
    const isKeabsahanValid = validateKeabsahan(
      data.keabsahanHps || INITIAL_DATA.step12.keabsahanHps,
    );

    onValidityChange(isDocsValid && isKeabsahanValid);
  }, [data.hpsDocuments, data.keabsahanHps, onValidityChange]);

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

  const getKeabsahanStatus = (k: KeabsahanHpsData) => {
    if (!k.isActive) return "";
    const isAngkaValid =
      !!k.angkaDanPenyebutan.existence && !!k.angkaDanPenyebutan.suitability;
    const isDasarValid = !!k.dasarPembuatan?.trim();
    const isPenandatanganValid = !!k.penandatangan?.trim();
    const isNilaiValid = !!k.nilaiHps;
    const isMataUangValid =
      !!k.mataUang && (k.mataUang !== "Other" || !!k.mataUangOther?.trim());

    if (
      isAngkaValid &&
      isDasarValid &&
      isPenandatanganValid &&
      isNilaiValid &&
      isMataUangValid
    )
      return "Closed";
    return "Open";
  };

  const handleDocumentUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan",
    value: string,
  ) => {
    const currentDocs = data.hpsDocuments || INITIAL_DATA.step12.hpsDocuments;
    if (!currentDocs) return;

    updateData({
      hpsDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          [field]: value,
        },
      },
    });
  };

  const handleToggle = (key: string) => {
    const currentDocs = data.hpsDocuments || INITIAL_DATA.step12.hpsDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      hpsDocuments: {
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

  const handleKeabsahanToggle = () => {
    const current = data.keabsahanHps || INITIAL_DATA.step12.keabsahanHps;
    updateData({
      keabsahanHps: {
        ...current,
        isActive: !current.isActive,
      },
    });
  };

  const handleKeabsahanUpdate = (
    field: string,
    value: any,
    nestedField?: string,
  ) => {
    const current = data.keabsahanHps || INITIAL_DATA.step12.keabsahanHps;
    let updated = { ...current };

    if (field === "angkaDanPenyebutan" && nestedField) {
      updated.angkaDanPenyebutan = {
        ...updated.angkaDanPenyebutan,
        [nestedField]: value,
      };
    } else {
      updated = { ...updated, [field]: value };
    }

    updateData({ keabsahanHps: updated });
  };

  const keabsahanData = data.keabsahanHps || INITIAL_DATA.step12.keabsahanHps;
  const keabsahanStatus = getKeabsahanStatus(keabsahanData);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          {PROJECT_CONSTANTS.STEP12_TEXT.TITLE}
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Penyusunan dan penetapan HPS.
        </p>
      </div>

      <div className="p-5 space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            Dokumen HPS
          </h3>
          <div className="space-y-4">
            {PROJECT_CONSTANTS.STEP12_DOCUMENTS_TOP.map((doc) => {
              const item = data.hpsDocuments?.[doc.key] ||
                INITIAL_DATA.step12.hpsDocuments?.[doc.key] || {
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

                  <AnimatePresence>
                    {item.isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 pt-2 border-t border-slate-200/60"
                      >
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

            {/* Keabsahan HPS Card */}
            <div
              className={`
                p-4 rounded-xl border-2 transition-all duration-200
                ${
                  keabsahanData.isActive
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
                        keabsahanData.isActive
                          ? "bg-blue-600 border-blue-600"
                          : "border-slate-300 bg-white"
                      }
                    `}
                  >
                    {keabsahanData.isActive && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={keabsahanData.isActive}
                    onChange={handleKeabsahanToggle}
                  />
                  <span
                    className={`font-medium ${
                      keabsahanData.isActive
                        ? "text-slate-900"
                        : "text-slate-500"
                    }`}
                  >
                    Keabsahan HPS
                  </span>
                </label>

                {keabsahanStatus && (
                  <div
                    className={`
                      px-3 py-1 rounded-full text-xs font-bold border
                      ${
                        keabsahanStatus === "Closed"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : keabsahanStatus === "Open"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-red-100 text-red-700 border-red-200"
                      }
                    `}
                  >
                    {keabsahanStatus}
                  </div>
                )}
              </div>

              <AnimatePresence>
                {keabsahanData.isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-6 pt-2 border-t border-slate-200/60 pl-9"
                  >
                    {/* Angka dan Penyebutan */}
                    <div className="space-y-3 border-b border-slate-200 pb-4">
                      <h4 className="text-sm font-semibold text-slate-800">
                        Angka dan Penyebutan
                      </h4>
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
                                  name="keabsahan-angka-existence"
                                  value={opt}
                                  checked={
                                    keabsahanData.angkaDanPenyebutan
                                      .existence === opt
                                  }
                                  onChange={(e) =>
                                    handleKeabsahanUpdate(
                                      "angkaDanPenyebutan",
                                      e.target.value,
                                      "existence",
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
                                  name="keabsahan-angka-suitability"
                                  value={opt}
                                  checked={
                                    keabsahanData.angkaDanPenyebutan
                                      .suitability === opt
                                  }
                                  onChange={(e) =>
                                    handleKeabsahanUpdate(
                                      "angkaDanPenyebutan",
                                      e.target.value,
                                      "suitability",
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
                      <ValidatedInput
                        id="keabsahan-angka-catatan"
                        label="Catatan"
                        value={keabsahanData.angkaDanPenyebutan.catatan || ""}
                        onChange={(e) =>
                          handleKeabsahanUpdate(
                            "angkaDanPenyebutan",
                            e.target.value,
                            "catatan",
                          )
                        }
                        placeholder="Tambahkan catatan..."
                        icon={StickyNote}
                      />
                    </div>

                    {/* Dasar Pembuatan */}
                    <ValidatedInput
                      id="keabsahan-dasar"
                      label="Dasar Pembuatan"
                      value={keabsahanData.dasarPembuatan}
                      onChange={(e) =>
                        handleKeabsahanUpdate("dasarPembuatan", e.target.value)
                      }
                      placeholder="Masukkan dasar pembuatan..."
                      required
                    />

                    {/* Penandatangan */}
                    <ValidatedInput
                      id="keabsahan-penandatangan"
                      label="Penandatangan"
                      value={keabsahanData.penandatangan}
                      onChange={(e) =>
                        handleKeabsahanUpdate("penandatangan", e.target.value)
                      }
                      placeholder="Masukkan penandatangan..."
                      required
                    />

                    {/* Nilai HPS */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Nilai HPS <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        {PROJECT_CONSTANTS.STEP12_CONSTANTS.KEABSAHAN_OPTIONS.NILAI_HPS.map(
                          (opt) => (
                            <label
                              key={opt}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="keabsahan-nilai-hps"
                                value={opt}
                                checked={keabsahanData.nilaiHps === opt}
                                onChange={(e) =>
                                  handleKeabsahanUpdate(
                                    "nilaiHps",
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
                    </div>

                    {/* Mata Uang */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Mata Uang <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          {PROJECT_CONSTANTS.STEP12_CONSTANTS.KEABSAHAN_OPTIONS.MATA_UANG.map(
                            (opt) => (
                              <label
                                key={opt}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="keabsahan-mata-uang"
                                  value={opt}
                                  checked={keabsahanData.mataUang === opt}
                                  onChange={(e) =>
                                    handleKeabsahanUpdate(
                                      "mataUang",
                                      e.target.value,
                                    )
                                  }
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-700">
                                  {opt === "Other" ? "Other:" : opt}
                                </span>
                              </label>
                            ),
                          )}
                        </div>
                        {keabsahanData.mataUang === "Other" && (
                          <div className="pl-6">
                            <ValidatedInput
                              id="keabsahan-mata-uang-other"
                              value={keabsahanData.mataUangOther || ""}
                              onChange={(e) =>
                                handleKeabsahanUpdate(
                                  "mataUangOther",
                                  e.target.value,
                                )
                              }
                              placeholder="Sebutkan mata uang..."
                              required
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {PROJECT_CONSTANTS.STEP12_DOCUMENTS_BOTTOM.map((doc) => {
              const item = data.hpsDocuments?.[doc.key] ||
                INITIAL_DATA.step12.hpsDocuments?.[doc.key] || {
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

                  <AnimatePresence>
                    {item.isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 pt-2 border-t border-slate-200/60"
                      >
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

export default Step12HPS;

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ListFilter,
  LayoutGrid,
  Users,
  Award,
  Info,
  CheckCircle2,
  StickyNote,
} from "lucide-react";
import { ValidatedInput } from "../ui/ValidatedInput";
import {
  type Step14Data,
  type LampiranItem,
  INITIAL_DATA,
} from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step14Props {
  data: Step14Data;
  updateData: (data: Partial<Step14Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step14ProsesPemilihan: React.FC<Step14Props> = ({
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

    const isValid =
      Boolean(data.judulPaket) &&
      Boolean(data.metodePengadaan) &&
      Boolean(data.klasifikasiPengadaan) &&
      data.dpt.length > 0 &&
      data.kualifikasi.length > 0 &&
      Boolean(data.metodePemasukanDokumen) &&
      Boolean(data.metodeEvaluasi) &&
      (data.metodeEvaluasi !== "Lainnya:" ||
        Boolean(data.metodeEvaluasiLainnya)) &&
      validateDocuments(data.prosesPemilihanDocuments) &&
      validateDocuments(data.jaminanDocuments);
    onValidityChange(isValid);
  }, [data, onValidityChange]);

  const handleDptChange = (option: string) => {
    const current = data.dpt || [];
    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    updateData({ dpt: updated });
  };

  const handleKualifikasiChange = (option: string) => {
    const current = data.kualifikasi || [];
    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    updateData({ kualifikasi: updated });
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

  const handleDocumentUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan",
    value: string,
  ) => {
    const currentDocs =
      data.prosesPemilihanDocuments ||
      INITIAL_DATA.step14.prosesPemilihanDocuments;
    if (!currentDocs) return;

    updateData({
      prosesPemilihanDocuments: {
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
      data.prosesPemilihanDocuments ||
      INITIAL_DATA.step14.prosesPemilihanDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      prosesPemilihanDocuments: {
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

  const handleJaminanUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan" | "tindakLanjut",
    value: string,
  ) => {
    const currentDocs =
      data.jaminanDocuments || INITIAL_DATA.step14.jaminanDocuments;
    if (!currentDocs) return;

    updateData({
      jaminanDocuments: {
        ...currentDocs,
        [key]: {
          ...currentDocs[key],
          [field]: value,
        },
      },
    });
  };

  const handleJaminanToggle = (key: string) => {
    const currentDocs =
      data.jaminanDocuments || INITIAL_DATA.step14.jaminanDocuments;
    if (!currentDocs) return;

    const newIsActive = !currentDocs[key].isActive;

    updateData({
      jaminanDocuments: {
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

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          {PROJECT_CONSTANTS.STEP14_TEXT.TITLE}
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Lengkapi data proses pemilihan paket pekerjaan.
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Judul Paket */}
        <div className="space-y-4">
          <ValidatedInput
            id="judulPaket"
            label="Judul Paket"
            value={data.judulPaket}
            onChange={(e) => updateData({ judulPaket: e.target.value })}
            placeholder="Masukkan judul paket..."
            icon={FileText}
            required
          />
        </div>

        {/* Metode Pengadaan */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ListFilter className="w-5 h-5 text-blue-600" />
            <label className="text-sm font-bold text-slate-700">
              Metode Pengadaan <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_CONSTANTS.STEP14_CONSTANTS.METODE_PENGADAAN.map(
              (option) => (
                <label
                  key={option}
                  className={`
                  relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${
                    data.metodePengadaan === option
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                  }
                `}
                >
                  <input
                    type="radio"
                    name="metodePengadaan"
                    value={option}
                    checked={data.metodePengadaan === option}
                    onChange={(e) =>
                      updateData({ metodePengadaan: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    className={`ml-3 text-sm font-medium ${
                      data.metodePengadaan === option
                        ? "text-blue-900"
                        : "text-slate-600"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Klasifikasi Pengadaan */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="w-5 h-5 text-blue-600" />
            <label className="text-sm font-bold text-slate-700">
              Klasifikasi Pengadaan <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_CONSTANTS.STEP14_CONSTANTS.KLASIFIKASI_PENGADAAN.map(
              (option) => (
                <label
                  key={option}
                  className={`
                    relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${
                      data.klasifikasiPengadaan === option
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="klasifikasiPengadaan"
                    value={option}
                    checked={data.klasifikasiPengadaan === option}
                    onChange={(e) =>
                      updateData({ klasifikasiPengadaan: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    className={`ml-3 text-sm font-medium ${
                      data.klasifikasiPengadaan === option
                        ? "text-blue-900"
                        : "text-slate-600"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Metode Pemasukan Dokumen Penawaran */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ListFilter className="w-5 h-5 text-blue-600" />
            <label className="text-sm font-bold text-slate-700">
              Metode Pemasukan Dokumen Penawaran{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_CONSTANTS.STEP14_CONSTANTS.METODE_PEMASUKAN_DOKUMEN.map(
              (option) => (
                <label
                  key={option}
                  className={`
                    relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${
                      data.metodePemasukanDokumen === option
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="metodePemasukanDokumen"
                    value={option}
                    checked={data.metodePemasukanDokumen === option}
                    onChange={(e) =>
                      updateData({ metodePemasukanDokumen: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    className={`ml-3 text-sm font-medium ${
                      data.metodePemasukanDokumen === option
                        ? "text-blue-900"
                        : "text-slate-600"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Metode Evaluasi */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ListFilter className="w-5 h-5 text-blue-600" />
            <label className="text-sm font-bold text-slate-700">
              Metode Evaluasi <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_CONSTANTS.STEP14_CONSTANTS.METODE_EVALUASI.map(
              (option) => (
                <label
                  key={option}
                  className={`
                    relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${
                      data.metodeEvaluasi === option
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="metodeEvaluasi"
                    value={option}
                    checked={data.metodeEvaluasi === option}
                    onChange={(e) =>
                      updateData({ metodeEvaluasi: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    className={`ml-3 text-sm font-medium ${
                      data.metodeEvaluasi === option
                        ? "text-blue-900"
                        : "text-slate-600"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ),
            )}
          </div>
          {data.metodeEvaluasi === "Lainnya:" && (
            <div className="mt-2">
              <ValidatedInput
                id="metodeEvaluasiLainnya"
                label="Sebutkan Metode Evaluasi Lainnya"
                value={data.metodeEvaluasiLainnya || ""}
                onChange={(e) =>
                  updateData({ metodeEvaluasiLainnya: e.target.value })
                }
                placeholder="Masukkan metode evaluasi..."
                icon={FileText}
                required
              />
            </div>
          )}
        </div>

        {/* Persyaratan Peserta Section */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Persyaratan Peserta
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DPT */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <label className="text-sm font-bold text-slate-700">
                  DPT <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="space-y-3">
                {PROJECT_CONSTANTS.STEP14_CONSTANTS.DPT_OPTIONS.map(
                  (option) => (
                    <label
                      key={option}
                      className={`
                        flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${
                          data.dpt?.includes(option)
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-blue-200"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={data.dpt?.includes(option)}
                        onChange={() => handleDptChange(option)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-slate-700">
                        {option}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Kualifikasi */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <label className="text-sm font-bold text-slate-700">
                  Kualifikasi <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="space-y-3">
                {PROJECT_CONSTANTS.STEP14_CONSTANTS.KUALIFIKASI_OPTIONS.map(
                  (option) => (
                    <label
                      key={option}
                      className={`
                        flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${
                          data.kualifikasi?.includes(option)
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-blue-200"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={data.kualifikasi?.includes(option)}
                        onChange={() => handleKualifikasiChange(option)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-slate-700">
                        {option}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Information Box */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed w-full">
                <p className="font-semibold text-blue-900">Keterangan:</p>
                <div className="space-y-2">
                  {PROJECT_CONSTANTS.STEP14_CONSTANTS.INFO_KUALIFIKASI.map(
                    (text, index) => {
                      // Check if the text starts with a number in parentheses, e.g., "(1)"
                      const match = text.match(/^(\(\d+\))\s+(.+)$/);

                      if (match) {
                        const [, number, content] = match;
                        return (
                          <div key={index} className="flex gap-2">
                            <span className="flex-shrink-0 min-w-[24px]">
                              {number}
                            </span>
                            <span className="text-justify">{content}</span>
                          </div>
                        );
                      }

                      return (
                        <p key={index} className="text-justify">
                          {text}
                        </p>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Section */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-blue-600" />
            Dokumen Pendukung
          </h3>

          <div className="space-y-4">
            {PROJECT_CONSTANTS.STEP14_DOCUMENTS.map((doc) => {
              const item =
                data.prosesPemilihanDocuments?.[doc.key] ||
                INITIAL_DATA.step14.prosesPemilihanDocuments?.[doc.key];

              if (!item) return null;

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
                        onChange={() => handleToggle(doc.key)}
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
                          {/* Existence */}
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

                          {/* Suitability */}
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

                        {/* Catatan */}
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

        {/* Jaminan & Retensi Section */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Jaminan & Retensi
          </h3>

          <div className="space-y-4">
            {PROJECT_CONSTANTS.STEP14_JAMINAN_DOCUMENTS.map((doc) => {
              const item =
                data.jaminanDocuments?.[doc.key] ||
                INITIAL_DATA.step14.jaminanDocuments?.[doc.key];

              if (!item) return null;

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
                        onChange={() => handleJaminanToggle(doc.key)}
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
                          {/* Existence */}
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
                                      handleJaminanUpdate(
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

                          {/* Suitability */}
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
                                      handleJaminanUpdate(
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

                        {/* Catatan */}
                        <div className="pl-9 pt-4">
                          <ValidatedInput
                            id={`${doc.key}-catatan`}
                            label="Catatan"
                            value={item.catatan || ""}
                            onChange={(e) =>
                              handleJaminanUpdate(
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

export default Step14ProsesPemilihan;

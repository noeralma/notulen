import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle2, User, StickyNote } from "lucide-react";
import { ValidatedInput } from "../ui/ValidatedInput";
import {
  type Step3Data,
  type LampiranItem,
  INITIAL_DATA,
} from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step3Props {
  data: Step3Data;
  updateData: (data: Partial<Step3Data>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Step3ProjectRequest: React.FC<Step3Props> = ({
  data,
  updateData,
  onValidityChange,
}) => {
  const [nameError, setNameError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    const validateStep = () => {
      const isNameValid = (data.nama?.trim().length ?? 0) > 0;
      const isCreatedDateValid = !!data.createdDate;
      const isApprovedDateValid = !!data.approvedDate;
      const isProjectTypeValid = !!data.projectType;

      let isDateOrderValid = true;
      if (data.createdDate && data.approvedDate) {
        if (new Date(data.approvedDate) < new Date(data.createdDate)) {
          isDateOrderValid = false;
          setDateError("Approved Date cannot be before Created Date");
        } else {
          setDateError(null);
        }
      } else {
        setDateError(null);
      }

      if (!data.nama || data.nama.trim().length === 0) {
        if (isTouched) setNameError("Name is required");
      } else {
        setNameError(null);
      }

      const validateLampiranGroup = (group?: Record<string, LampiranItem>) => {
        if (!group) return true;
        return Object.values(group).every((item) => {
          if (!item.isActive) return true;
          return item.existence && item.suitability;
        });
      };

      const isLampiranValid =
        validateLampiranGroup(data.lampiran) &&
        validateLampiranGroup(data.tkdn) &&
        validateLampiranGroup(data.prMysap);

      onValidityChange(
        isNameValid &&
          isCreatedDateValid &&
          isApprovedDateValid &&
          isDateOrderValid &&
          isProjectTypeValid &&
          isLampiranValid,
      );
    };

    validateStep();
  }, [data, onValidityChange]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ nama: e.target.value });
    setIsTouched(true);
  };

  const getRowStatus = (item: LampiranItem) => {
    // Normalization
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

    // IF(OR(C35="",C35="-",G35="",G35="-",J35="",J35="-"),"", ...
    if (!cVal || !gVal || !jVal) return "";

    // IF(C35="X", IF(AND(G35="X",J35="√"),"Closed","ERROR"), ...
    if (cVal === "X") {
      if (gVal === "X" && jVal === "√") return "Closed";
      return "ERROR";
    }

    // IF(AND(C35="√",G35="X"), IF(J35="X","Open","ERROR"), ...
    if (cVal === "√" && gVal === "X") {
      if (jVal === "X") return "Open";
      return "ERROR";
    }

    // IF(AND(C35="√",G35="√",J35="√"),"Closed","Open")
    if (cVal === "√" && gVal === "√" && jVal === "√") return "Closed";

    // Default fallback for remaining C=√ cases (e.g. G=√, J=X)
    return "Open";
  };

  const handleLampiranToggle = (key: string) => {
    const currentLampiran = data.lampiran || INITIAL_DATA.step3.lampiran;
    if (!currentLampiran) return;

    const newIsActive = !currentLampiran[key].isActive;

    updateData({
      lampiran: {
        ...currentLampiran,
        [key]: {
          ...currentLampiran[key],
          isActive: newIsActive,
          // If deactivating, set defaults to satisfy "Closed" status (G=X, J=√)
          // If activating, reset to null to force user selection
          existence: newIsActive ? null : "Tidak Ada",
          suitability: newIsActive ? null : "Sesuai",
        },
      },
    });
  };

  const handleLampiranUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan",
    value: string,
  ) => {
    const currentLampiran = data.lampiran || INITIAL_DATA.step3.lampiran;
    if (!currentLampiran) return;

    updateData({
      lampiran: {
        ...currentLampiran,
        [key]: {
          ...currentLampiran[key],
          [field]: value,
        },
      },
    });
  };

  const handleTkdnToggle = (key: string) => {
    const currentTkdn = data.tkdn || INITIAL_DATA.step3.tkdn;
    if (!currentTkdn) return;

    const newIsActive = !currentTkdn[key].isActive;

    updateData({
      tkdn: {
        ...currentTkdn,
        [key]: {
          ...currentTkdn[key],
          isActive: newIsActive,
          existence: newIsActive ? null : "Tidak Ada",
          suitability: newIsActive ? null : "Sesuai",
        },
      },
    });
  };

  const handleTkdnUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan",
    value: string,
  ) => {
    const currentTkdn = data.tkdn || INITIAL_DATA.step3.tkdn;
    if (!currentTkdn) return;

    updateData({
      tkdn: {
        ...currentTkdn,
        [key]: {
          ...currentTkdn[key],
          [field]: value,
        },
      },
    });
  };

  const handlePrMysapToggle = (key: string) => {
    const currentPrMysap = data.prMysap || INITIAL_DATA.step3.prMysap;
    if (!currentPrMysap) return;

    const newIsActive = !currentPrMysap[key].isActive;

    updateData({
      prMysap: {
        ...currentPrMysap,
        [key]: {
          ...currentPrMysap[key],
          isActive: newIsActive,
          existence: newIsActive ? null : "Tidak Ada",
          suitability: newIsActive ? null : "Sesuai",
        },
      },
    });
  };

  const handlePrMysapUpdate = (
    key: string,
    field: "existence" | "suitability" | "catatan",
    value: string,
  ) => {
    const currentPrMysap = data.prMysap || INITIAL_DATA.step3.prMysap;
    if (!currentPrMysap) return;

    updateData({
      prMysap: {
        ...currentPrMysap,
        [key]: {
          ...currentPrMysap[key],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          DOKUMEN PENDUKUNG PELAKSANAAN PEMILIHAN (DP3)
        </h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Please provide the project details.
        </p>
      </div>

      <div className="p-5 space-y-8">
        {/* Project Request Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            Project Request
          </h3>

          {/* Project Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Project Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              {PROJECT_CONSTANTS.PROJECT_TYPES.map((type) => (
                <label
                  key={type}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 w-full md:w-auto
                    ${
                      data.projectType === type
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="projectType"
                    value={type}
                    checked={data.projectType === type}
                    onChange={(e) =>
                      updateData({
                        projectType: e.target.value as
                          | "Baseline"
                          | "Non-Baseline",
                      })
                    }
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span
                    className={`font-medium ${
                      data.projectType === type
                        ? "text-blue-700"
                        : "text-slate-600"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Nama Input */}
          <ValidatedInput
            id="nama"
            label="Nama"
            value={data.nama}
            onChange={handleNameChange}
            placeholder="Enter Project Name"
            icon={User}
            required
            error={nameError}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Created Date */}
            <ValidatedInput
              id="createdDate"
              label="Created Date"
              type="date"
              value={data.createdDate}
              onChange={(e) => updateData({ createdDate: e.target.value })}
              icon={Calendar}
              required
            />

            {/* Approved Date */}
            <ValidatedInput
              id="approvedDate"
              label="Approved Date"
              type="date"
              value={data.approvedDate}
              onChange={(e) => updateData({ approvedDate: e.target.value })}
              icon={Calendar}
              required
              error={dateError}
            />
          </div>
        </div>

        {/* Lampiran DP3 */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            Lampiran DP3
          </h3>

          <div className="space-y-4">
            {PROJECT_CONSTANTS.LAMPIRAN_DOCUMENTS.map((doc) => {
              const item = data.lampiran?.[doc.key] || {
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
                        onChange={() => handleLampiranToggle(doc.key)}
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
                                      handleLampiranUpdate(
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
                                      handleLampiranUpdate(
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
                              handleLampiranUpdate(
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

        {/* Formulir TKDN */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            Formulir TKDN
          </h3>

          <div className="space-y-4">
            {PROJECT_CONSTANTS.TKDN_DOCUMENTS.map((doc) => {
              const item = data.tkdn?.[doc.key] || {
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
                        onChange={() => handleTkdnToggle(doc.key)}
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
                                      handleTkdnUpdate(
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
                                      handleTkdnUpdate(
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
                              handleTkdnUpdate(
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

        {/* PR di MySAP */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
            PR di MySAP
          </h3>

          <div className="space-y-4">
            {PROJECT_CONSTANTS.PR_MYSAP_DOCUMENTS.map((doc) => {
              const item = data.prMysap?.[doc.key] || {
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
                        onChange={() => handlePrMysapToggle(doc.key)}
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
                                      handlePrMysapUpdate(
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
                                      handlePrMysapUpdate(
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
                              handlePrMysapUpdate(
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

export default Step3ProjectRequest;

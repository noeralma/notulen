import React, { useEffect } from "react";
import type { Step4Data } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

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
  } = data;

  useEffect(() => {
    const isValid =
      judulPaket.trim() !== "" &&
      penggunaBarangJasa !== "" &&
      picPenggunaBarangJasa.trim() !== "";
    onValidityChange(isValid);
  }, [judulPaket, penggunaBarangJasa, picPenggunaBarangJasa, onValidityChange]);

  const handleChange = (field: keyof Step4Data, value: string) => {
    updateData({ [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">Part 4: UMUM</h2>
      </div>

      <div className="p-5 space-y-4">
        {/* Judul Paket */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Judul Paket
          </label>
          <input
            type="text"
            value={judulPaket}
            onChange={(e) => handleChange("judulPaket", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Masukkan Judul Paket"
          />
        </div>

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
                    flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
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

          {penggunaBarangJasa !== "" && (
            <div className="mt-3 space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Keterangan Pengguna Barang/Jasa
              </label>
              <input
                type="text"
                value={penggunaBarangJasaNotes}
                onChange={(e) =>
                  handleChange("penggunaBarangJasaNotes", e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                placeholder="Tuliskan keterangan tambahan (misalnya unit atau detail lain)..."
              />
            </div>
          )}
        </div>

        {/* PIC Pengguna Barang/Jasa */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            PIC Pengguna Barang/Jasa
          </label>
          <input
            type="text"
            value={picPenggunaBarangJasa}
            onChange={(e) =>
              handleChange("picPenggunaBarangJasa", e.target.value)
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Masukkan Nama PIC"
          />
        </div>
      </div>
    </div>
  );
};

export default Step4General;

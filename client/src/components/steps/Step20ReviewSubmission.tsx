import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";
import type { FormData, LampiranItem, Step20Data } from "../../types/form";
import { INITIAL_DATA } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step20Props {
  data: Step20Data;
  updateData: (data: Partial<Step20Data>) => void;
  formData: FormData;
  onValidityChange: (isValid: boolean) => void;
}

type DocumentDefinition = {
  key: string;
  label: string;
};

type StatusType = "" | "Open" | "Closed" | "ERROR";

type InfoRow = {
  label: string;
  value: string;
};

type StepSection = {
  stepNumber: number;
  title: string;
  info?: InfoRow[];
  docGroups?: {
    title: string;
    docs: readonly DocumentDefinition[];
    items?: Record<string, LampiranItem>;
  }[];
};

const Step20ReviewSubmission: React.FC<Step20Props> = ({
  data,
  updateData,
  formData,
  onValidityChange,
}) => {
  useEffect(() => {
    onValidityChange(true);
  }, [onValidityChange]);

  const getRowStatus = (item: LampiranItem): StatusType => {
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

  const getStatusBadge = (status: StatusType) => {
    if (!status) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-500 border border-slate-200">
          -
        </span>
      );
    }

    if (status === "Closed") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 border border-green-200">
          <CheckCircle2 className="w-3 h-3" />
          Closed
        </span>
      );
    }

    if (status === "Open") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-200">
          <AlertTriangle className="w-3 h-3" />
          Open
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 border border-red-200">
        <XCircle className="w-3 h-3" />
        ERROR
      </span>
    );
  };

  const buildItem = (
    record: Record<string, LampiranItem> | undefined,
    fallback: Record<string, LampiranItem> | undefined,
    key: string,
  ): LampiranItem => {
    const base = record || fallback || {};
    const existing = base[key];
    if (existing) return existing;
    return {
      isActive: false,
      existence: null,
      suitability: null,
      catatan: "",
    };
  };

  const step1Summary = useMemo(
    () =>
      PROJECT_CONSTANTS.MANDATORY_FIELDS_STEP1.map((field) => ({
        label: field.label,
        value: formData.step1[field.key] ? "Sudah Dilakukan" : "Belum",
      })),
    [formData.step1],
  );

  const step2Summary = useMemo(
    () => [
      {
        label: PROJECT_CONSTANTS.STEP2_TEXT.TITLE,
        value: formData.step2.performanceEvaluation
          ? "Sudah Disetujui"
          : "Belum",
      },
    ],
    [formData.step2],
  );

  const step3Summary = useMemo(
    () => [
      { label: "Nama Proyek", value: formData.step3.nama || "-" },
      {
        label: "Tanggal Pembuatan DP3",
        value: formData.step3.createdDate || "-",
      },
      {
        label: "Tanggal Persetujuan DP3",
        value: formData.step3.approvedDate || "-",
      },
      {
        label: "Project Type",
        value: formData.step3.projectType || "-",
      },
    ],
    [formData.step3],
  );

  const step4Summary = useMemo(
    () => [
      { label: "Judul Paket", value: formData.step4.judulPaket || "-" },
      {
        label: "Pengguna Barang/Jasa",
        value: formData.step4.penggunaBarangJasa || "-",
      },
      {
        label: "PIC Pengguna Barang/Jasa",
        value: formData.step4.picPenggunaBarangJasa || "-",
      },
      {
        label: "Catatan Pengguna Barang/Jasa",
        value: formData.step4.penggunaBarangJasaNotes || "-",
      },
    ],
    [formData.step4],
  );

  const step11Summary = useMemo(
    () => [
      {
        label: "Jenis Kontrak",
        value: formData.step11.jenisKontrak || "-",
      },
      {
        label: "Keterangan Jenis Kontrak (jika Others)",
        value: formData.step11.othersDescription || "-",
      },
    ],
    [formData.step11],
  );

  const step12Summary = useMemo(
    () => [
      {
        label: "Nilai HPS",
        value: formData.step12.keabsahanHps.nilaiHps || "-",
      },
      {
        label: "Mata Uang",
        value:
          formData.step12.keabsahanHps.mataUang === "Other"
            ? formData.step12.keabsahanHps.mataUangOther || "Other"
            : formData.step12.keabsahanHps.mataUang || "-",
      },
      {
        label: "Dasar Pembuatan HPS",
        value: formData.step12.keabsahanHps.dasarPembuatan || "-",
      },
      {
        label: "Penandatangan HPS",
        value: formData.step12.keabsahanHps.penandatangan || "-",
      },
    ],
    [formData.step12],
  );

  const step14Summary = useMemo(
    () => [
      { label: "Judul Paket", value: formData.step14.judulPaket || "-" },
      {
        label: "Metode Pengadaan",
        value: formData.step14.metodePengadaan || "-",
      },
      {
        label: "Metode Pemasukan Dokumen",
        value: formData.step14.metodePemasukanDokumen || "-",
      },
      {
        label: "Metode Evaluasi",
        value:
          formData.step14.metodeEvaluasi === "Lainnya:"
            ? formData.step14.metodeEvaluasiLainnya || "Lainnya"
            : formData.step14.metodeEvaluasi || "-",
      },
      {
        label: "Klasifikasi Pengadaan",
        value: formData.step14.klasifikasiPengadaan || "-",
      },
      {
        label: "DPT",
        value:
          formData.step14.dpt && formData.step14.dpt.length > 0
            ? formData.step14.dpt.join(", ")
            : "-",
      },
      {
        label: "Kualifikasi",
        value:
          formData.step14.kualifikasi && formData.step14.kualifikasi.length > 0
            ? formData.step14.kualifikasi.join(", ")
            : "-",
      },
    ],
    [formData.step14],
  );

  const step15Summary = useMemo(
    () => ({
      label: PROJECT_CONSTANTS.STEP15_TEXT.TITLE,
      value: formData.step15.schedulePlan ? "Disetujui" : "Belum",
    }),
    [formData.step15],
  );

  const step16Summary = useMemo(
    () => ({
      label: PROJECT_CONSTANTS.STEP16_TEXT.TITLE,
      value: formData.step16.scheduleExecution ? "Disetujui" : "Belum",
    }),
    [formData.step16],
  );

  const step17Summary = useMemo(
    () => ({
      label: PROJECT_CONSTANTS.STEP17_TEXT.TITLE,
      value: formData.step17.read ? "Sudah Dibaca" : "Belum",
    }),
    [formData.step17],
  );

  const step18Summary = useMemo(
    () => ({
      label: "SMART GEP yang Dibahas",
      value:
        formData.step18.smartGepItems && formData.step18.smartGepItems.length
          ? formData.step18.smartGepItems.join(", ")
          : "-",
    }),
    [formData.step18],
  );

  const step19Summary = useMemo(
    () => ({
      label: PROJECT_CONSTANTS.STEP19_TEXT.TITLE,
      value: formData.step19.read ? "Disetujui" : "Belum",
    }),
    [formData.step19],
  );

  const stepSections = useMemo<StepSection[]>(
    () => [
      {
        stepNumber: 1,
        title: "KOMITMEN HSSE",
        info: step1Summary,
      },
      {
        stepNumber: 2,
        title: PROJECT_CONSTANTS.STEP2_TEXT.TITLE,
        info: step2Summary,
      },
      {
        stepNumber: 3,
        title: PROJECT_CONSTANTS.STEP3_TEXT.TITLE,
        info: step3Summary,
        docGroups: [
          {
            title: "Lampiran DP3",
            docs: PROJECT_CONSTANTS.LAMPIRAN_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step3.lampiran ||
              INITIAL_DATA.step3.lampiran ||
              undefined,
          },
          {
            title: "Formulir TKDN",
            docs: PROJECT_CONSTANTS.TKDN_DOCUMENTS as readonly DocumentDefinition[],
            items: formData.step3.tkdn || INITIAL_DATA.step3.tkdn || undefined,
          },
          {
            title: "PR di MySAP",
            docs: PROJECT_CONSTANTS.PR_MYSAP_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step3.prMysap || INITIAL_DATA.step3.prMysap || undefined,
          },
        ],
      },
      {
        stepNumber: 4,
        title: PROJECT_CONSTANTS.STEP4_TEXT.TITLE,
        info: step4Summary,
        docGroups: [
          {
            title: "Dokumen Umum",
            docs: PROJECT_CONSTANTS.STEP4_CONSTANTS
              .GENERAL_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step4.generalDocuments ||
              INITIAL_DATA.step4.generalDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 5,
        title: PROJECT_CONSTANTS.STEP5_TEXT.TITLE,
        docGroups: [
          {
            title: "Lingkup Pekerjaan",
            docs: PROJECT_CONSTANTS.STEP5_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step5.scopeDocuments ||
              INITIAL_DATA.step5.scopeDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 6,
        title: PROJECT_CONSTANTS.STEP6_TEXT.TITLE,
        docGroups: [
          {
            title: "Aspek Keuangan",
            docs: PROJECT_CONSTANTS.STEP6_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step6.financialDocuments ||
              INITIAL_DATA.step6.financialDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 7,
        title: PROJECT_CONSTANTS.STEP7_TEXT.TITLE,
        docGroups: [
          {
            title: "CSMS",
            docs: PROJECT_CONSTANTS.STEP7_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step7.csmsDocuments ||
              INITIAL_DATA.step7.csmsDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 8,
        title: PROJECT_CONSTANTS.STEP8_TEXT.TITLE,
        docGroups: [
          {
            title: "Kualifikasi Khusus",
            docs: PROJECT_CONSTANTS.STEP8_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step8.qualificationDocuments ||
              INITIAL_DATA.step8.qualificationDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 9,
        title: PROJECT_CONSTANTS.STEP9_TEXT.TITLE,
        docGroups: [
          {
            title: "Evaluasi Teknis",
            docs: PROJECT_CONSTANTS.STEP9_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step9.technicalDocuments ||
              INITIAL_DATA.step9.technicalDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 10,
        title: PROJECT_CONSTANTS.STEP10_TEXT.TITLE,
        docGroups: [
          {
            title: "Evaluasi Komersial",
            docs: PROJECT_CONSTANTS.STEP10_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step10.commercialDocuments ||
              INITIAL_DATA.step10.commercialDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 11,
        title: PROJECT_CONSTANTS.STEP11_TEXT.TITLE,
        info: step11Summary,
        docGroups: [
          {
            title: "Dokumen Kontrak",
            docs: PROJECT_CONSTANTS.STEP11_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step11.contractDocuments ||
              INITIAL_DATA.step11.contractDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 12,
        title: PROJECT_CONSTANTS.STEP12_TEXT.TITLE,
        info: step12Summary,
        docGroups: [
          {
            title: "Dokumen HPS",
            docs: PROJECT_CONSTANTS.STEP12_DOCUMENTS_TOP as readonly DocumentDefinition[],
            items:
              formData.step12.hpsDocuments ||
              INITIAL_DATA.step12.hpsDocuments ||
              undefined,
          },
          {
            title: "Rincian dan BoQ",
            docs: PROJECT_CONSTANTS.STEP12_DOCUMENTS_BOTTOM as readonly DocumentDefinition[],
            items:
              formData.step12.hpsDocuments ||
              INITIAL_DATA.step12.hpsDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 13,
        title: PROJECT_CONSTANTS.STEP13_TEXT.TITLE,
        docGroups: [
          {
            title: "Formulir MySAP",
            docs: PROJECT_CONSTANTS.STEP13_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step13.mySapDocuments ||
              INITIAL_DATA.step13.mySapDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 14,
        title: PROJECT_CONSTANTS.STEP14_TEXT.TITLE,
        info: step14Summary,
        docGroups: [
          {
            title: "Dokumen Proses Pemilihan",
            docs: PROJECT_CONSTANTS.STEP14_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step14.prosesPemilihanDocuments ||
              INITIAL_DATA.step14.prosesPemilihanDocuments ||
              undefined,
          },
          {
            title: "Dokumen Jaminan & Retensi",
            docs: PROJECT_CONSTANTS.STEP14_JAMINAN_DOCUMENTS as readonly DocumentDefinition[],
            items:
              formData.step14.jaminanDocuments ||
              INITIAL_DATA.step14.jaminanDocuments ||
              undefined,
          },
        ],
      },
      {
        stepNumber: 15,
        title: PROJECT_CONSTANTS.STEP15_TEXT.TITLE,
        info: [step15Summary],
      },
      {
        stepNumber: 16,
        title: PROJECT_CONSTANTS.STEP16_TEXT.TITLE,
        info: [step16Summary],
      },
      {
        stepNumber: 17,
        title: PROJECT_CONSTANTS.STEP17_TEXT.TITLE,
        info: [step17Summary],
      },
      {
        stepNumber: 18,
        title: "HASIL PEMBAHASAN",
        info: [step18Summary],
      },
      {
        stepNumber: 19,
        title: PROJECT_CONSTANTS.STEP19_TEXT.TITLE,
        info: [step19Summary],
      },
    ],
    [
      formData,
      step1Summary,
      step2Summary,
      step3Summary,
      step4Summary,
      step11Summary,
      step12Summary,
      step14Summary,
      step15Summary,
      step16Summary,
      step17Summary,
      step18Summary,
      step19Summary,
    ],
  );

  const handleToggleRead = () => {
    updateData({ read: !data.read });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white flex items-center gap-3">
        <FileSearch className="w-6 h-6 text-blue-100" />
        <div>
          <h2 className="text-xl font-bold mb-1">
            {PROJECT_CONSTANTS.STEP20_TEXT.TITLE}
          </h2>
          <p className="text-blue-100 opacity-90 text-sm">
            Tinjau kembali seluruh informasi yang sudah diisi sebelum melakukan
            submit.
          </p>
        </div>
      </div>

      <div className="p-5 space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            Ringkasan Per Step
          </h3>
          <p className="text-sm text-slate-600">
            Setiap kartu di bawah ini merangkum informasi utama dan status
            dokumen untuk masing-masing step.
          </p>
        </div>

        <div className="space-y-6">
          {stepSections.map((section) => (
            <div
              key={section.stepNumber}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">
                  Step {section.stepNumber} – {section.title}
                </span>
              </div>
              <div className="p-4 space-y-4">
                {section.info && section.info.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-slate-600 mb-1">
                      Informasi
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <table className="w-full text-xs md:text-sm">
                        <tbody>
                          {section.info.map((row) => (
                            <tr key={row.label}>
                              <td className="py-1 pr-3 text-slate-600 align-top w-1/2">
                                {row.label}
                              </td>
                              <td className="py-1 text-slate-800">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {section.docGroups &&
                  section.docGroups.length > 0 &&
                  section.docGroups.map((group) => (
                    <div key={group.title} className="space-y-2">
                      <div className="text-xs font-semibold text-slate-600">
                        {group.title}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs md:text-sm">
                          <thead>
                            <tr className="text-left text-slate-500">
                              <th className="py-2 pr-4 font-semibold">
                                Dokumen
                              </th>
                              <th className="py-2 pr-4 font-semibold">Kartu</th>
                              <th className="py-2 pr-4 font-semibold">
                                Ketersediaan
                              </th>
                              <th className="py-2 pr-4 font-semibold">
                                Kesesuaian
                              </th>
                              <th className="py-2 pr-4 font-semibold">
                                Status
                              </th>
                              <th className="py-2 pr-4 font-semibold">
                                Tindak Lanjut
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.docs.map((doc) => {
                              const item = buildItem(
                                group.items,
                                group.items,
                                doc.key,
                              );
                              const status = getRowStatus(item);
                              return (
                                <tr
                                  key={doc.key}
                                  className="border-t border-slate-100"
                                >
                                  <td className="py-2 pr-4 text-slate-800">
                                    {doc.label}
                                  </td>
                                  <td className="py-2 pr-4 text-slate-700">
                                    {item.isActive ? "Active" : "Inactive"}
                                  </td>
                                  <td className="py-2 pr-4 text-slate-700">
                                    {item.existence || "-"}
                                  </td>
                                  <td className="py-2 pr-4 text-slate-700">
                                    {item.suitability || "-"}
                                  </td>
                                  <td className="py-2 pr-4">
                                    {getStatusBadge(status)}
                                  </td>
                                  <td className="py-2 pr-4 text-slate-700">
                                    {item.tindakLanjut || "-"}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleToggleRead}
          className={`
            cursor-pointer p-4 rounded-xl border-2 transition-all duration-200
            flex items-center gap-3
            ${
              data.read
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
            }
          `}
        >
          <div
            className={`
              w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0
              ${
                data.read
                  ? "bg-green-500 border-green-500"
                  : "border-slate-300 bg-white"
              }
            `}
          >
            {data.read && (
              <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`font-semibold text-base ${
                data.read ? "text-green-800" : "text-slate-700"
              }`}
            >
              Saya sudah meninjau kembali seluruh informasi dan status dokumen
              sebelum submit.
            </h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Step20ReviewSubmission;

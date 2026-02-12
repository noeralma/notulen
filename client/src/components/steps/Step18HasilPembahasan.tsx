import React, { useMemo } from "react";
import { FileText, AlertCircle, Info, Plus, Trash2 } from "lucide-react";
import type { FormData, LampiranItem, Step18Data } from "../../types/form";
import { PROJECT_CONSTANTS } from "../../lib/constants";

interface Step18Props {
  data: Step18Data;
  updateData: (data: Partial<Step18Data>) => void;
  formData: FormData;
  onValidityChange: (isValid: boolean) => void;
}

interface DiscussionItem {
  id: string;
  text: string;
  type:
    | "Dokumen yang harus dilengkapi"
    | "Dokumen yang harus direvisi"
    | "Penyesuaian pengisian SMART GEP";
  sourceStep: string;
  sourceDoc: string;
}

const Step18HasilPembahasan: React.FC<Step18Props> = ({
  data,
  updateData,
  formData,
  onValidityChange,
}) => {
  // Always valid as it is a summary step
  React.useEffect(() => {
    onValidityChange(true);
  }, [onValidityChange]);

  const discussionItems = useMemo(() => {
    const items: DiscussionItem[] = [];

    // Helper to process document groups
    const processDocs = (
      stepName: string,
      docs: Record<string, LampiranItem> | undefined,
      docConstants: readonly { key: string; label: string }[],
    ) => {
      if (!docs) return;

      docConstants.forEach((docConst) => {
        const item = docs[docConst.key];
        if (item && item.isActive && item.catatan && item.tindakLanjut) {
          items.push({
            id: `${stepName}-${docConst.key}`,
            text: item.catatan,
            type: item.tindakLanjut,
            sourceStep: stepName,
            sourceDoc: docConst.label,
          });
        }
      });
    };

    // Step 3
    processDocs(
      PROJECT_CONSTANTS.STEP3_TEXT.TITLE,
      formData.step3?.lampiran,
      PROJECT_CONSTANTS.LAMPIRAN_DOCUMENTS,
    );
    processDocs(
      PROJECT_CONSTANTS.STEP3_TEXT.TITLE,
      formData.step3?.tkdn,
      PROJECT_CONSTANTS.TKDN_DOCUMENTS,
    );
    processDocs(
      PROJECT_CONSTANTS.STEP3_TEXT.TITLE,
      formData.step3?.prMysap,
      PROJECT_CONSTANTS.PR_MYSAP_DOCUMENTS,
    );

    // Step 4
    processDocs(
      PROJECT_CONSTANTS.STEP4_TEXT.TITLE,
      formData.step4?.generalDocuments,
      PROJECT_CONSTANTS.STEP4_CONSTANTS.GENERAL_DOCUMENTS,
    );

    // Step 5
    processDocs(
      PROJECT_CONSTANTS.STEP5_TEXT.TITLE,
      formData.step5?.scopeDocuments,
      PROJECT_CONSTANTS.STEP5_DOCUMENTS,
    );

    // Step 6
    processDocs(
      PROJECT_CONSTANTS.STEP6_TEXT.TITLE,
      formData.step6?.financialDocuments,
      PROJECT_CONSTANTS.STEP6_DOCUMENTS,
    );

    // Step 7
    processDocs(
      PROJECT_CONSTANTS.STEP7_TEXT.TITLE,
      formData.step7?.csmsDocuments,
      PROJECT_CONSTANTS.STEP7_DOCUMENTS,
    );

    // Step 8
    processDocs(
      PROJECT_CONSTANTS.STEP8_TEXT.TITLE,
      formData.step8?.qualificationDocuments,
      PROJECT_CONSTANTS.STEP8_DOCUMENTS,
    );

    // Step 9
    processDocs(
      PROJECT_CONSTANTS.STEP9_TEXT.TITLE,
      formData.step9?.technicalDocuments,
      PROJECT_CONSTANTS.STEP9_DOCUMENTS,
    );

    // Step 10
    processDocs(
      PROJECT_CONSTANTS.STEP10_TEXT.TITLE,
      formData.step10?.commercialDocuments,
      PROJECT_CONSTANTS.STEP10_DOCUMENTS,
    );

    // Step 11
    processDocs(
      PROJECT_CONSTANTS.STEP11_TEXT.TITLE,
      formData.step11?.contractDocuments,
      PROJECT_CONSTANTS.STEP11_DOCUMENTS,
    );

    // Step 12
    processDocs(
      PROJECT_CONSTANTS.STEP12_TEXT.TITLE,
      formData.step12?.hpsDocuments,
      PROJECT_CONSTANTS.STEP12_DOCUMENTS_TOP,
    );
    processDocs(
      PROJECT_CONSTANTS.STEP12_TEXT.TITLE,
      formData.step12?.hpsDocuments,
      PROJECT_CONSTANTS.STEP12_DOCUMENTS_BOTTOM,
    );

    // Step 12 Keabsahan HPS
    const keabsahan = formData.step12?.keabsahanHps;
    if (
      keabsahan &&
      keabsahan.isActive &&
      keabsahan.angkaDanPenyebutan.catatan &&
      keabsahan.angkaDanPenyebutan.tindakLanjut
    ) {
      items.push({
        id: "step12-keabsahan-angka",
        text: keabsahan.angkaDanPenyebutan.catatan,
        type: keabsahan.angkaDanPenyebutan.tindakLanjut,
        sourceStep: PROJECT_CONSTANTS.STEP12_TEXT.TITLE,
        sourceDoc: "Keabsahan HPS (Angka dan Penyebutan)",
      });
    }

    // Step 13
    processDocs(
      PROJECT_CONSTANTS.STEP13_TEXT.TITLE,
      formData.step13?.mySapDocuments,
      PROJECT_CONSTANTS.STEP13_DOCUMENTS,
    );

    // Step 14
    processDocs(
      PROJECT_CONSTANTS.STEP14_TEXT.TITLE,
      formData.step14?.prosesPemilihanDocuments,
      PROJECT_CONSTANTS.STEP14_DOCUMENTS,
    );
    processDocs(
      PROJECT_CONSTANTS.STEP14_TEXT.TITLE,
      formData.step14?.jaminanDocuments,
      PROJECT_CONSTANTS.STEP14_JAMINAN_DOCUMENTS,
    );

    return items;
  }, [formData]);

  const handleAddSmartGep = () => {
    updateData({
      smartGepItems: [...(data.smartGepItems || []), ""],
    });
  };

  const handleUpdateSmartGep = (index: number, value: string) => {
    const newItems = [...(data.smartGepItems || [])];
    newItems[index] = value;
    updateData({ smartGepItems: newItems });
  };

  const handleRemoveSmartGep = (index: number) => {
    const newItems = [...(data.smartGepItems || [])];
    newItems.splice(index, 1);
    updateData({ smartGepItems: newItems });
  };

  const sections = [
    {
      title: "Dokumen yang harus dilengkapi:",
      type: "Dokumen yang harus dilengkapi",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Dokumen yang harus direvisi:",
      type: "Dokumen yang harus direvisi",
      icon: AlertCircle,
      color: "orange",
    },
    {
      title: "Penyesuaian pengisian SMART GEP:",
      type: "Penyesuaian pengisian SMART GEP",
      icon: Info,
      color: "purple",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">HASIL PEMBAHASAN</h2>
        <p className="text-blue-100 opacity-90 text-sm">
          Rangkuman catatan dan tindak lanjut dari seluruh dokumen.
        </p>
      </div>

      <div className="p-6 space-y-8">
        {sections.map((section) => {
          if (section.type === "Penyesuaian pengisian SMART GEP") {
            const Icon = section.icon;
            const smartGepItems = data.smartGepItems || [];

            return (
              <div key={section.title} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Icon className={`w-5 h-5 text-${section.color}-600`} />
                  {section.title}
                </h3>

                <div className="space-y-3">
                  {smartGepItems.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleUpdateSmartGep(index, e.target.value)
                        }
                        placeholder="Masukkan poin penyesuaian..."
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                      <button
                        onClick={() => handleRemoveSmartGep(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus baris"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleAddSmartGep}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Poin Penyesuaian
                  </button>

                  {smartGepItems.length === 0 && (
                    <div className="text-slate-500 italic text-sm pl-2">
                      Belum ada poin penyesuaian yang ditambahkan.
                    </div>
                  )}
                </div>
              </div>
            );
          }

          const items = discussionItems.filter(
            (item) => item.type === section.type,
          );
          const Icon = section.icon;

          return (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Icon className={`w-5 h-5 text-${section.color}-600`} />
                {section.title}
              </h3>

              {items.length > 0 ? (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <ol className="list-decimal list-outside ml-5 space-y-4">
                    {items.map((item, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        className="text-slate-700 pl-2"
                      >
                        <div className="font-medium text-slate-900">
                          {item.text}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                          <span className="bg-white px-2 py-1 rounded border border-slate-200">
                            Step: {item.sourceStep}
                          </span>
                          <span className="bg-white px-2 py-1 rounded border border-slate-200">
                            Doc: {item.sourceDoc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="text-slate-500 italic text-sm pl-7">
                  Tidak ada catatan untuk kategori ini.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step18HasilPembahasan;

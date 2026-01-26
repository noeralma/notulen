export const PROJECT_CONSTANTS = {
  EXPECTED_NAME: "Pengadaan Jasa Teknis Operasional LNG Trading dan Transportasi",
  TOTAL_STEPS: 19,
  PROJECT_TYPES: ["Baseline", "Non-Baseline"] as const,
  MANDATORY_FIELDS_STEP1: [
    { key: "videoClsr", label: "Video CLSR" },
    { key: "kebijakanHsse", label: "Kebijakan HSSE Perusahaan" },
    { key: "komitmenHsse", label: "Komitmen HSSE" },
    { key: "safetyContact", label: "Safety Contact" },
    { key: "coreValueAkhlak", label: "Pembacaan Core Value BUMN Akhlak" },
  ] as const,
  STEP2_TEXT: {
    TITLE: "REMINDER EVALUASI KINERJA PENYEDIA",
    SUBTITLE: "Untuk Paket Pekerjaan Sebelumnya",
    WARNING_TEXT: "Procurement mengingatkan Pengguna agar dapat menyampaikan hasil evaluasi kinerja penyedia dari paket-paket pekerjaan sebelumnya yang telah selesai di GSLT.",
    AGREEMENT_LABEL: "Saya Mengerti dan Setuju",
    AGREEMENT_SUBTEXT: "Klik disini untuk menyetujui pernyataan diatas",
  },
  LAMPIRAN_DOCUMENTS: [
    { key: "formulirRequest", label: "Formulir Kelengkapan Permintaan Pengadaan Barang/Jasa" },
    { key: "kakTor", label: "KAK/TOR/SOW/RLP" },
    { key: "paktaIntegritas", label: "Pakta Integritas" },
    { key: "boq", label: "BOQ (tanpa harga)" },
    { key: "hps", label: "HPS dan Rinciannya" },
    { key: "csms", label: "Formulir CSMS Risk Assessment" },
  ] as const,
};

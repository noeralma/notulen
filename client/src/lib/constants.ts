export const PROJECT_CONSTANTS = {
  EXPECTED_NAME:
    "Pengadaan Jasa Teknis Operasional LNG Trading dan Transportasi",
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
    WARNING_TEXT:
      "Procurement mengingatkan Pengguna agar dapat menyampaikan hasil evaluasi kinerja penyedia dari paket-paket pekerjaan sebelumnya yang telah selesai di GSLT.",
    AGREEMENT_LABEL: "Saya Mengerti dan Setuju",
    AGREEMENT_SUBTEXT: "Klik disini untuk menyetujui pernyataan diatas",
  },
  LAMPIRAN_DOCUMENTS: [
    {
      key: "formulirRequest",
      label: "Formulir Kelengkapan Permintaan Pengadaan Barang/Jasa",
    },
    { key: "kakTor", label: "KAK/TOR/SOW/RLP" },
    { key: "paktaIntegritas", label: "Pakta Integritas" },
    { key: "boq", label: "BOQ (tanpa harga)" },
    { key: "hps", label: "HPS dan Rinciannya" },
    { key: "csms", label: "Formulir CSMS Risk Assessment" },
  ] as const,
  TKDN_DOCUMENTS: [
    { key: "formA1", label: "Form A1" },
    { key: "formA2", label: "Form A2" },
    { key: "formMonitoringB1", label: "Form Monitoring (B1)" },
    { key: "rancanganKontrak", label: "Rancangan Kontrak" },
    { key: "dokumenKpeTeknis", label: "Dokumen KPE Teknis" },
    { key: "dokumenRfi", label: "Dokumen RFI" },
  ] as const,
  PR_MYSAP_DOCUMENTS: [
    { key: "printout", label: "Printout" },
    { key: "screenshotApprovalPr", label: "Screenshot Approval PR" },
    { key: "anggaran", label: "Anggaran" },
    {
      key: "persetujuanDirektur",
      label: "Persetujuan Direktur terkait: Pengadaan Jasa Konsultansi",
    },
  ] as const,
  STEP4_CONSTANTS: {
    PENGGUNA_BARANG_JASA_OPTIONS: ["GM", "GH", "DH", "Others"] as const,
    GENERAL_DOCUMENTS: [
      { key: "usulanPenyedia", label: "Usulan Penyedia" },
      {
        key: "pertimbanganUsulanPenyedia",
        label: "Pertimbangan Usulan Penyedia",
      },
      {
        key: "statusPerusahaanPenyedia",
        label: "Status Perusahaan Penyedia",
      },
      { key: "paktaIntegritasPengguna", label: "Pakta Integritas Pengguna" },
      { key: "sumberAnggaran", label: "Sumber Anggaran" },
      { key: "jenisAnggaran", label: "Jenis Anggaran" },
    ] as const,
  },
  STEP5_TEXT: {
    TITLE: "LINGKUP PEKERJAAN",
    REMINDER_1_TITLE: "Konfirmasi Tujuan Pengadaan",
    REMINDER_1_BODY:
      "Tujuan dari pengadaan ini adalah untuk mendapatkan Penyedia Jasa Teknis Operasional LNG Trading dan Transportasi guna mendukung pelaksanaan kegiatan yang berkaitan dengan LNG Operation baik di market domestik atau internasional, meliputi dukungan terkait perencanaan dan penjadwalan kargo, serta kegiatan operasional, komersial, dan administratif harian (“Pekerjaan”), sehingga pelaksanaan operasional LNG dapat berjalan dengan lancar.",
    REMINDER_2_TITLE: "Uraian Singkat Pekerjaan",
    REMINDER_2_BODY:
      "Penyedia Jasa bertanggung jawab atas pelaksanaan kegiatan operasional yang mendukung proses LNG Trading dan Transportasi, baik secara domestik maupun internasional. Lingkup pekerjaan mencakup pengelolaan aktivitas planning & scheduling seperti penyusunan ADP, SDS, Price Notice, serta pengaturan jadwal kargo dan koordinasi pelaksanaan pengiriman. Selain itu, termasuk pula kegiatan teknis seperti Ship Shore Compatibility Study (SSCS), vetting kapal, serta kegiatan komersial seperti invoicing, pelaporan, dan penyusunan kontrak pendukung operasional. Ruang lingkup ini juga mencakup kebutuhan buyer/seller representative, independent surveyor, dan/atau pengadaan LNG carrier untuk mendukung pasokan dan kegiatan LNG Trading.",
  },
  STEP5_DOCUMENTS: [
    {
      key: "spesifikasiTeknisBarang",
      label: "Spesifikasi Teknis (Untuk Barang)",
    },
    { key: "targetSelesaiPengadaan", label: "Target Selesai Pengadaan" },
    { key: "jangkaWaktuPekerjaan", label: "Jangka Waktu Pekerjaan" },
    { key: "masaPemeliharaanGaransi", label: "Masa Pemeliharaan/Garansi" },
    {
      key: "lokasiPekerjaanFrancoBarang",
      label: "Lokasi Pekerjaan/Franco Barang",
    },
    { key: "bentukPenyerahanPekerjaan", label: "Bentuk Penyerahan Pekerjaan" },
    { key: "aspekK3HssePlan", label: "Aspek K3/HSSE Plan dalam KAK" },
    { key: "komitmenPelaksanaanTkdn", label: "Komitmen Pelaksanaan TKDN" },
    { key: "formA1Tkdn", label: "Form A1 TKDN" },
    { key: "formA2Tkdn", label: "Form A2 TKDN" },
    { key: "formMonitoringB1Tkdn", label: "Form Monitoring (B1) TKDN" },
  ] as const,
  STEP6_DOCUMENTS: [
    { key: "jaminanPelaksanaan", label: "Jaminan Pelaksanaan" },
    { key: "uangMuka", label: "Uang Muka" },
    { key: "jaminanUangMuka", label: "Jaminan Uang Muka" },
    { key: "jaminanPemeliharaan", label: "Jaminan Pemeliharaan" },
    { key: "retensiPemeliharaan", label: "Retensi Pemeliharaan" },
    { key: "jaminanTkdn", label: "Jaminan TKDN" },
    { key: "retensiTkdn", label: "Retensi TKDN" },
    {
      key: "sanksiFinansialTkdn",
      label:
        "Pemberitahuan Sanksi Finansial TKDN (Penagihan Sanksi Finansial TKDN di belakang)",
    },
    { key: "asuransi", label: "Asuransi" },
    { key: "sistemPembayaran", label: "Sistem Pembayaran" },
    { key: "tahapanTermijnPembayaran", label: "Tahapan Termijn Pembayaran" },
    {
      key: "sanksiDendaKeterlambatan",
      label: "Pengenaan Sanksi/Denda Keterlambatan",
    },
  ] as const,
  STEP7_TEXT: {
    TITLE: "CSMS",
  },
  STEP7_DOCUMENTS: [
    {
      key: "penilaianCsms",
      label: "Penilaian CSMS terhadap lingkup pekerjaan",
    },
  ] as const,
  STEP8_TEXT: {
    TITLE: "KRITERIA PENILAIAN KUALIFIKASI KHUSUS",
  },
  STEP8_DOCUMENTS: [
    { key: "kemampuanDasar", label: "Kemampuan Dasar (KD)" },
    { key: "sisaKemampuanPaket", label: "Sisa Kemampuan Paket (SKP)" },
    { key: "lainnya", label: "Lainnya" },
  ] as const,
  STEP9_TEXT: {
    TITLE: "KRITERIA EVALUASI TEKNIS",
  },
  STEP9_DOCUMENTS: [
    { key: "kriteriaPenilaianTeknis", label: "Kriteria Penilaian Teknis" },
    {
      key: "subKriteriaEvaluasiTeknis",
      label: "Sub Kriteria Evaluasi Teknis (dalam hal evaluasi scoring)",
    },
  ] as const,
  STEP10_TEXT: {
    TITLE: "KRITERIA EVALUASI KOMERSIAL",
  },
  STEP10_DOCUMENTS: [
    { key: "kriteriaEvaluasiKomersial", label: "Kriteria Evaluasi Komersial" },
  ] as const,
  STEP11_TEXT: {
    TITLE: "RANCANGAN KONTRAK",
  },
  STEP11_CONSTANTS: {
    JENIS_KONTRAK_OPTIONS: [
      "Lumsum",
      "Harga Satuan",
      "Gabungan: Harga Satuan & Lumsum",
      "Others",
    ] as const,
    INFO_LUMSUM: [
      "Merupakan Kontrak penyediaan Barang/Jasa atas penyelesaian seluruh Pekerjaan sesuai gambar, spesifikasi, standar, dan ketentuan lain yang dipersyaratkan dalam Kontrak, dalam waktu tertentu dengan jumlah harga pasti. Semua konsekuensi yang mungkin terjadi dalam proses penyelesaian pekerjaan tersebut, sepanjang sesuai gambar, spesifikasi, standar, dan ketentuan lain yang dipersyaratkan dalam Kontrak, sepenuhnya ditanggung oleh Pelaksana Kontrak.",
      "Pengurangan atau penambahan volume dan jenis pekerjaan dimungkinkan.",
      "Pembayaran didasarkan kepada pencapaian penyelesaian tahapan/fisik Pekerjaan, baik secara penuh atau bertahap.",
    ],
    INFO_HARGA_SATUAN: [
      "Merupakan Kontrak Pengadaan Barang/Jasa dalam batas waktu tertentu berdasarkan harga satuan yang pasti atau berupa formula penyesuaian harga satuan yang pasti untuk setiap satuan Barang/Jasa, peralatan dan/atau unsur pekerjaan dengan spesifikasi teknis tertentu",
      "Pembayaran didasarkan pada jumlah Barang/Jasa yang diserahterimakan dari Pelaksana Kontrak kepada Pejabat Penandatangan Kontrak",
      "Total nilai maksimal, jumlah barang/peralatan, atau volume pekerjaan dapat bersifat perkiraan sementara",
    ],
    INFO_GABUNGAN: [
      "Merupakan Kontrak yang terdiri dari 2 jenis lingkup pekerjaan yang bersifat harga satuan dan lumsum. Pelaksanaan pekerjaan mengacu pada Bill of Quantities (BoQ) atau Bill of Material (BoM) yang tertuang dalam Kontrak, yang terdiri dari jenis pekerjaan yang bersifat lumsum dan satuan. Ketentuan untuk lingkup pekerjaan yang bersifat harga satuan mengikuti ketentuan dalam Kontrak Harga Satuan, sedangkan untuk lingkup pekerjaan yang bersifat lumsum mengikuti ketentuan dalam kontrak lumsum.",
    ],
  },
  STEP11_DOCUMENTS: [{ key: "draftKontrak", label: "Draft Kontrak" }] as const,
  PROJECT_CONSTANTS_END: true,
};

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
  STEP11_DOCUMENTS: [
    { key: "jenisKontrak", label: "Jenis Kontrak" },
    { key: "draftKontrak", label: "Draft Kontrak" },
  ] as const,
  STEP12_TEXT: {
    TITLE: "HPS, RINCIAN HPS, BOQ",
  },
  STEP12_DOCUMENTS_TOP: [
    { key: "dokumenDanSifatHps", label: "Dokumen dan Sifat HPS" },
  ] as const,
  STEP12_DOCUMENTS_BOTTOM: [
    { key: "rincianHps", label: "Rincian HPS" },
    { key: "boqTanpaHarga", label: "BoQ (tanpa harga)" },
  ] as const,
  STEP12_CONSTANTS: {
    KEABSAHAN_OPTIONS: {
      NILAI_HPS: ["Termasuk PPN", "Belum Termasuk PPN"],
      MATA_UANG: ["USD", "IDR", "Other"],
    } as const,
  },
  STEP13_TEXT: {
    TITLE: "FORMULIR MYSAP",
  },
  STEP13_DOCUMENTS: [
    { key: "printOutPr", label: "Print Out PR" },
    { key: "screenshotApprovalPr", label: "Screenshot Approval PR" },
  ],
  STEP14_TEXT: {
    TITLE: "PROSES PEMILIHAN",
  },
  STEP14_CONSTANTS: {
    METODE_PENGADAAN: [
      "Pengadaan Langsung",
      "Penunjukkan Langsung",
      "Sinergi Pertamina Incorporated (Penunjukan)",
      "Pemilihan Langsung",
      "Tender Terbatas",
      "Tender Terbuka",
      "Tender Cepat",
    ] as const,
    METODE_PEMASUKAN_DOKUMEN: [
      "1 Tahap dan 1 Sampul/File",
      "1 Tahap dan 2 Sampul/File",
      "2 Tahap",
    ] as const,
    METODE_EVALUASI: [
      "Non Scoring",
      "Scoring - Harga Terendah",
      "Scoring - Kombinasi Teknis dan Harga",
      "Scoring - Penilaian Biaya Selama Umur Ekonomis",
      "Scoring - Kualitas",
      "Scoring - Kombinasi Kualitas dan Harga",
      "Lainnya:",
    ] as const,
    KLASIFIKASI_PENGADAAN: [
      "Barang",
      "Pekerjaan Konstruksi",
      "Jasa Konsultansi Konstruksi",
      "Jasa Konsultansi Non Konstruksi",
      "Jasa Lainnya",
    ] as const,
    DPT_OPTIONS: ["Aktif (VSKT)", "Tidak Aktif"] as const,
    KUALIFIKASI_OPTIONS: ["Kecil", "Non-Kecil"] as const,
    INFO_KUALIFIKASI: [
      "Ketentuan Golongan/kualifikasi usaha mempertimbangkan kebutuhan kemampuan teknis dari penyedia atas pekerjaan.",
      "Kesesuaian antara golongan usaha dengan nilai dapat dikecualikan apabila memenuhi:",
      "(1) Golongan usaha Sub-Holding Pertamina/Anak Perusahaan Pertamina/Perusahaan Terafiliasi Pertamina yang ditunjuk dengan metode Sinergi Pertamina Incorporated dapat dikecualikan dengan kesesuaian persyaratan golongan usaha dengan pekerjaan yang akan dilaksanakan;",
      "(2) Merupakan Perusahaan Asing atau sebagai Manufacture/Pabrikan/Agen Tunggal/Distributor Tunggal dalam maupun luar negeri;",
      "(3) Jasa Konsultansi Non-Konstruksi, dan tetap sesuai dengan produk atau layanan yang sesuai dengan bidang usaha dari Penyedia Barang/Jasa",
    ],
  },
  STEP14_DOCUMENTS: [
    {
      key: "klasifikasiBidangSubBidang",
      label: "Klasifikasi (Bidang / Sub Bidang)",
    },
  ] as const,
  STEP14_JAMINAN_DOCUMENTS: [
    { key: "jaminanPenawaran", label: "Jaminan Penawaran" },
    { key: "jaminanSanggahan", label: "Jaminan Sanggahan" },
    { key: "jaminanPelaksanaan", label: "Jaminan Pelaksanaan" },
    { key: "jaminanUangMuka", label: "Jaminan Uang Muka" },
    { key: "jaminanPemeliharaan", label: "Jaminan Pemeliharaan" },
    { key: "retensiPemeliharaan", label: "Retensi Pemeliharaan" },
    { key: "jaminanTkdn", label: "Jaminan TKDN" },
    { key: "retensiTkdn", label: "Retensi TKDN" },
    {
      key: "penagihanSanksiFinansialTkdn",
      label: "Penagihan Sanksi Finansial TKDN di belakang",
    },
  ] as const,
  STEP15_TEXT: {
    TITLE: "RENCANA JADWAL",
    ACCEPTANCE_TEXT:
      "Perkiraan waktu proses pengadaan s.d terkontrak sebagaimana terlampir (disesuaikan terhadap penyampaian kekurangan dokumen permintaan dan revisi dokumen permintaan (bila ada)",
    AGREEMENT_LABEL: "Saya Mengerti dan Setuju",
    AGREEMENT_SUBTEXT: "Klik disini untuk menyetujui pernyataan diatas",
  },
  STEP16_TEXT: {
    TITLE: "PELAKSANAAN JADWAL",
    ACCEPTANCE_TEXT: "Dilaksanakan sesuai Rencana Jadwal",
    AGREEMENT_LABEL: "Saya Mengerti dan Setuju",
    AGREEMENT_SUBTEXT: "Klik disini untuk menyetujui pernyataan diatas",
  },
  STEP17_TEXT: {
    TITLE: "LAINNYA",
    ITEMS: [
      {
        id: 1,
        text: "Pengguna Barang/Jasa wajib berkoordinasi baik terkait proses pemilihan penyedia maupun terkait penyusunan draft Kontrak, serta dalam proses administrasi pelaksanaan kontrak (kerja tambah/kurang, BAP dan BAST) dengan Fungsi Pengadaan (Pemilihan) – Procurement melalui pgn.procurement@pertamina.com.",
      },
      {
        id: 2,
        text: "Evaluasi Kinerja Penyedia Barang/Jasa: Diberlakukan dan dilakukan oleh:",
        subItems: [
          "Fungsi Pengadaan (Pemilihan) pada tahapan Pemilihan Penyedia Barang/Jasa",
          "Pejabat Penandatangan Kontrak pada tahapan Pelaksanaan Kontrak sesuai ketentuan yang berlaku.",
        ],
      },
      {
        id: 3,
        text: "Penggunaan aplikasi MySAP:",
        subItems: [
          "Agar Pengguna Barang/Jasa menyampaikan scan kontrak beserta perubahannya (jika ada) serta form request create dan release PO setelah penandatanganan kepada Fungsi Pengadaan (Pemilihan) - Procurement melalui email ke: pgn.procurement@pertamina.com untuk permintaan pembuatan No. PO MySAP kepada SS Proc.",
          "Pengguna Barang/Jasa wajib melakukan create Service Acceptance (SA)/Goods Receipt (GR).",
        ],
      },
      {
        id: 4,
        text: "Identifikasi Risiko Proses Pemilihan:",
        subItems: [
          "Pelaksanaan negosiasi dilaksanakan lebih dari 1 kali.",
          "Hasil Harga Negosiasi berpotensi di atas HPS.",
          "Tidak ada peserta pemilihan yang memasukkan dokumen penawaran.",
          "Terdapat potensi nilai komitmen TKDN yang disampaikan Calon Penyedia di bawah nilai minimal yang disyaratkan.",
        ],
      },
      {
        id: 5,
        text: "Setelah pekerjaan selesai, Pengguna Barang/Jasa diharapkan untuk menyampaikan dokumen sebagai berikut:",
        subItems: [
          "Kontrak",
          "Laporan TKDN (untuk Komitmen Penyedia dengan %TKDN > 0%)",
          "Evaluasi Kinerja Penyedia Barang/Jasa",
        ],
      },
    ],
    AGREEMENT_LABEL: "Saya Telah Membaca dan Memahami Informasi Diatas",
  },
  PROJECT_CONSTANTS_END: true,
};

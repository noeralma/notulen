export interface Step1Data {
  videoClsr: boolean;
  kebijakanHsse: boolean;
  komitmenHsse: boolean;
  safetyContact: boolean;
  coreValueAkhlak: boolean;
  others: boolean;
  othersDescription: string;
}

export interface Step2Data {
  performanceEvaluation: boolean;
}

export interface LampiranItem {
  isActive: boolean;
  existence: "Ada" | "Tidak Ada" | null;
  suitability: "Sesuai" | "Tidak Sesuai" | null;
  catatan?: string;
  // Specific for Step 5 HSSE
  requirement?: "Dipersyaratkan" | "Tidak Dipersyaratkan" | null;
  riskLevel?: "Rendah" | "Menengah" | "Tinggi" | null;
  // Specific for Step 7 CSMS
  formatSuitability?: "Sesuai" | "Tidak Sesuai" | null;
  judulSuitability?: "Sesuai" | "Tidak Sesuai" | null;
  lokasiSuitability?: "Sesuai" | "Tidak Sesuai" | null;
  durasiSuitability?: "Sesuai" | "Tidak Sesuai" | null;
  kesimpulanResiko?: string;
  tanggal?: string;
  penandatanganan?: string;
  // Specific for Step 9 Technical Evaluation
  scorePengalaman?: number;
  scoreMetodologi?: number;
  scoreTenagaAhli?: number;
}

export interface Step3Data {
  nama: string;
  createdDate: string;
  approvedDate: string;
  projectType: "Baseline" | "Non-Baseline" | "";
  lampiran?: Record<string, LampiranItem>;
  tkdn?: Record<string, LampiranItem>;
  prMysap?: Record<string, LampiranItem>;
}

export interface Step4Data {
  judulPaket: string;
  penggunaBarangJasa: "GM" | "GH" | "DH" | "Others" | "";
  picPenggunaBarangJasa: string;
  penggunaBarangJasaNotes: string;
  generalDocuments?: Record<string, LampiranItem>;
}

export interface Step5Data {
  scopeDocuments?: Record<string, LampiranItem>;
}

export interface Step6Data {
  financialDocuments?: Record<string, LampiranItem>;
}

export interface Step7Data {
  csmsDocuments?: Record<string, LampiranItem>;
}

export interface Step8Data {
  qualificationDocuments?: Record<string, LampiranItem>;
}

export interface Step9Data {
  technicalDocuments?: Record<string, LampiranItem>;
}

export interface Step10Data {
  commercialDocuments?: Record<string, LampiranItem>;
}

export interface Step11Data {
  jenisKontrak: string;
  othersDescription?: string;
  contractDocuments?: Record<string, LampiranItem>;
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
  step8: Step8Data;
  step9: Step9Data;
  step10: Step10Data;
  step11: Step11Data;
  // Will add other steps here later
}

export const INITIAL_DATA: FormData = {
  step1: {
    videoClsr: false,
    kebijakanHsse: false,
    komitmenHsse: false,
    safetyContact: false,
    coreValueAkhlak: false,
    others: false,
    othersDescription: "",
  },
  step2: {
    performanceEvaluation: false,
  },
  step3: {
    nama: "",
    createdDate: "",
    approvedDate: "",
    projectType: "",
    lampiran: {
      formulirRequest: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      kakTor: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      paktaIntegritas: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      boq: { isActive: false, existence: null, suitability: null, catatan: "" },
      hps: { isActive: false, existence: null, suitability: null, catatan: "" },
      csms: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
    tkdn: {
      formA1: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      formA2: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      formMonitoringB1: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      rancanganKontrak: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      dokumenKpeTeknis: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      dokumenRfi: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
    prMysap: {
      printout: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      screenshotApprovalPr: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      anggaran: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      persetujuanDirektur: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step4: {
    judulPaket: "",
    penggunaBarangJasa: "",
    picPenggunaBarangJasa: "",
    penggunaBarangJasaNotes: "",
    generalDocuments: {
      usulanPenyedia: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      pertimbanganUsulanPenyedia: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      statusPerusahaanPenyedia: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      paktaIntegritasPengguna: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      sumberAnggaran: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      jenisAnggaran: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step5: {
    scopeDocuments: {
      spesifikasiTeknisBarang: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      targetSelesaiPengadaan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      jangkaWaktuPekerjaan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      masaPemeliharaanGaransi: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      lokasiPekerjaanFrancoBarang: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      bentukPenyerahanPekerjaan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      aspekK3HssePlan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      komitmenPelaksanaanTkdn: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      formA1Tkdn: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      formA2Tkdn: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      formMonitoringB1Tkdn: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step6: {
    financialDocuments: {
      jaminanPelaksanaan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      uangMuka: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      jaminanUangMuka: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      jaminanPemeliharaan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      retensiPemeliharaan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      jaminanTkdn: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      retensiTkdn: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      sanksiFinansialTkdn: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      asuransi: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      sistemPembayaran: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      tahapanTermijnPembayaran: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      sanksiDendaKeterlambatan: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step7: {
    csmsDocuments: {
      penilaianCsms: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step8: {
    qualificationDocuments: {
      kemampuanDasar: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      sisaKemampuanPaket: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      lainnya: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step9: {
    technicalDocuments: {
      kriteriaPenilaianTeknis: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
      subKriteriaEvaluasiTeknis: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step10: {
    commercialDocuments: {
      kriteriaEvaluasiKomersial: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
  step11: {
    jenisKontrak: "",
    othersDescription: "",
    contractDocuments: {
      draftKontrak: {
        isActive: false,
        existence: null,
        suitability: null,
        catatan: "",
      },
    },
  },
};

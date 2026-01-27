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
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
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
  },
};

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
}

export interface Step3Data {
  nama: string;
  createdDate: string;
  approvedDate: string;
  projectType: "Baseline" | "Non-Baseline" | "";
  lampiran?: Record<string, LampiranItem>;
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
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
      formulirRequest: { isActive: false, existence: null, suitability: null },
      kakTor: { isActive: false, existence: null, suitability: null },
      paktaIntegritas: { isActive: false, existence: null, suitability: null },
      boq: { isActive: false, existence: null, suitability: null },
      hps: { isActive: false, existence: null, suitability: null },
      csms: { isActive: false, existence: null, suitability: null },
    },
  },
};

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

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
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
};

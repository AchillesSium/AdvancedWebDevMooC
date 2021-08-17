import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      patient: Patient;
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_SINGLE_PATIENT":
      return {
        ...state,
        singlepatient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY":

      const patientToUpdate = action.patient;

      const updatedPatient = {
        ...patientToUpdate,
        entries: patientToUpdate.entries.concat(action.payload)
      };

      return {
        ...state,
        singlepatient: updatedPatient
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]) : { type: 'SET_PATIENT_LIST', payload: Patient[]}=> {
  return {
    type: 'SET_PATIENT_LIST',
    payload: payload
  };
};

export const addPatient = (payload: Patient) : { type: 'ADD_PATIENT', payload: Patient} => {
  return {
    type: 'ADD_PATIENT',
    payload: payload
  };
};

export const addSinglePatient = (payload: Patient) : { type: 'ADD_SINGLE_PATIENT', payload: Patient} => {
  return {
    type: 'ADD_SINGLE_PATIENT',
    payload: payload
  };
};

export const setDiagnosisList = (payload: Diagnosis[]) : { type: 'SET_DIAGNOSIS_LIST', payload: Diagnosis[]}=> {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: payload
  };
};

export const addEntry = (patient: Patient, payload: Entry) : { type: 'ADD_ENTRY', patient: Patient, payload: Entry} => {
  return {
    type: 'ADD_ENTRY',
    patient: patient,
    payload: payload,
  };
};

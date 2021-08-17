
import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from './types';
import toNewPatientEntry from './utils';

const patients: Array<PatientEntry> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry
  object.id = obj.id
  return object
});

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ))
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = { id: uuidv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): PatientEntry => {
  const patient = patients.find((a) => a.id === id);
  if (!patient) {
    throw new Error(`Patient with patientId: ${id} not found`);
  }
  return patient;
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getPatient
};

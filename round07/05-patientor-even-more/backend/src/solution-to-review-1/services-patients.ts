
import { v4 as uuidv4 } from 'uuid';
//import patientData from '../../data/patients.json';
import patientData from './data-patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntry, Entry } from './types';
import toNewPatientEntry from './utils';

const patients: Array<PatientEntry> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry
  object.id = obj.id
  return object
});

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getPatientById = (id: string): PatientEntry | undefined => {
  return patients.find(p => p.id === id);
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

const addNewEntry = (entry: NewEntry, patient: PatientEntry): Entry => {
  const newEntry = { id: uuidv4(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getPatientById,
  addNewEntry
};


import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients.json';
import patients from "./data-patients";
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntry, Entry } from './types';
import toNewPatientEntry from './utils';

const patientList: Array<PatientEntry> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry
  object.id = obj.id
  return object
});

const getEntries = (): Array<PatientEntry> => {
  return patientList;
};

const getDataPatients = (): Array<PatientEntry> => {
  return patients;
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientList.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    { id, name, dateOfBirth, gender, occupation, entries }
  ))
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = { id: uuidv4(), ...entry };
  patientList.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = (entry: NewEntry): Entry => {
  const newEntry = { id: uuidv4(), ...entry };
  // const patient = patients.find(patientEntry => patientEntry.id === patientId)
  // patient.entries.push(newPatientEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  addNewEntry,
  getDataPatients
};

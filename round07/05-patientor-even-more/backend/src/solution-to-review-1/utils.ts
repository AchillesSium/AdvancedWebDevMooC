
// utils

/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, NewEntry } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringProperty = (object: any, property: string): string => {
  if (!object[property] || !isString(object[property])) {
    throw new Error(`Incorrect or missing ${property}`);
  }
  return object[property];
}


const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    "name": parseStringProperty(object, 'name'),
    "dateOfBirth": parseDate(object['dateOfBirth']),
    "ssn": parseStringProperty(object, 'ssn'),
    "gender": parseGender(object['gender']),
    "occupation": parseStringProperty(object, 'occupation'),
    "entries": object['entries']
  }

  return newEntry;
}

export const validateEntryData = (object: any): NewEntry => {
  if (!object.type) {
    throw new Error('Type is missing from entry data.');
  }
  if (!object.description) {
    throw new Error('Description is missing from entry data.');
  }
  if (!object.date) {
    throw new Error('Date is missing from entry data.');
  }
  if (!object.specialist) {
    throw new Error('Specialist is missing from entry data.');
  }
  

  switch (object.type) {
    case "Hospital":
      if (!object.discharge) {
        throw new Error('Discharge is missing from entry data.');
      }
      if (!object.discharge.date) {
        throw new Error('Discharge date is missing from entry data.');
      }
      if (!object.discharge.criteria) {
        throw new Error('Discharge criteria is missing from entry data.');
      }
      break;
    case "HealthCheck":
      if (!object.healthCheckRating && object.healthCheckRating !== 0) {
        throw new Error('Health check rating is missing from entry data.');
      }
      break;
    case "OccupationalHealthcare":
      if (!object.employerName) {
        throw new Error('Employer name is missing from entry data.');
      }
      break;
    default:
      throw new Error(`Unsupported entry type: ${object.type}`);
  }

  return object;
}

export default toNewPatientEntry;

// utils

/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, NewEntry } from './types';
//import { parse } from 'uuid';

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
    "entries": []
  }

  return newEntry; parseStringProperty(object, 'name')
}

export const toNewEntry = (object: any): NewEntry => {
  const type = parseStringProperty(object, 'type')
  switch(type){
    case 'HealthCheck':
      const newEntry: NewEntry = {
        date: parseDate(object['date']),
        specialist: parseStringProperty(object, 'specialist'),
        type: type,
        description: parseStringProperty(object, 'description'),
        diagnosisCodes: object['diagnosisCodes']
        
      }
      return newEntry;
    case 'OccupationalHealthcare':
      const newEntryO: NewEntry = {
        date: parseDate(object['date']),
        specialist: parseStringProperty(object, 'specialist'),
        type: type,
        description: parseStringProperty(object, 'description'),
        diagnosisCodes: object['diagnosisCodes']
      }
      return newEntryO;

    case 'Hospital':
        const newEntryHo: NewEntry = {
          date: parseDate(object['date']),
          specialist: parseStringProperty(object, 'specialist'),
          type: type,
          description: parseStringProperty(object, 'description'),
          diagnosisCodes: object['diagnosisCodes']
        }
        return newEntryHo;

    default:
      const newEntryH: NewEntry = {
        date: parseDate(object['date']),
        specialist: parseStringProperty(object, 'specialist'),
        type: 'Hospital',
        description: parseStringProperty(object, 'description'),
        diagnosisCodes: object['diagnosisCodes']
      }
      return newEntryH;
  }
}

export default toNewPatientEntry;
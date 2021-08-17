
// utils

/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender } from './types';

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

// const parseEntryType = (type: string): EntryType => {
//   if (!type || !isString(type)) {
//     throw new Error('Incorrect or missing type');
//   }

//   switch (type) {
//     case 'OccupationalHealthcare': {
//       return EntryType.OccupationalHealthcare
//     };
//     case 'Hospital': {
//       return EntryType.Hospital
//     };
//     default:
//       return EntryType.HealthCheck
//   }
// }

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    "name": parseStringProperty(object, 'name'),
    "dateOfBirth": parseDate(object['dateOfBirth']),
    "ssn": parseStringProperty(object, 'ssn'),
    "gender": parseGender(object['gender']),
    "occupation": parseStringProperty(object, 'occupation'),
    "entries": []
  }

  return newEntry;
}

// export const toNewEntry = (object: any): NewEntry => {
//   const entry: NewBaseEntry = {
//     'description': parseStringProperty(object, 'description'),
//     'date': parseDate(object['date']),
//     'specialist': parseStringProperty(object, 'specialist'),
//     'type': parseEntryType(object),
//   }

//   let completeEntry: Omit<BaseEntry, "id">;

//   if (entry.type === 'OccupationalHealthcare') [
//     completeEntry = {
//       ...entry,
//       employerName: parseStringProperty(object, 'employerName'),
//       sickLeave: parseSickLeave(object, 'sickLeave')

//     }
//   ]

//   return completeEntry;

  // let entry: Omit<BaseEntry, "id"> = {
  //   date: parseDate(validEntryType.date),
  //   description: parseStringProperty(validEntryType.description),
  //   specialist: parseSpecialist(validEntryType.specialist),
  //   diagnosisCodes: parseDiagnosisCode(validEntryType.diagnosisCodes),
  // };

  // switch (validEntryType.type) {
  //   case "Hospital":
  //     return {
  //       ...entry,
  //       type: validEntryType.type,
  //       discharge: parseDischarge(validEntryType.discharge),
  //     };
  //   case "HealthCheck":
  //     return {
  //       ...entry,
  //       type: validEntryType.type,
  //       healthCheckRating: parseHealthCheckRating(
  //         validEntryType.healthCheckRating
  //       ),
  //     };
  //   case "OccupationalHealthcare":
  //     return {
  //       ...entry,
  //       type: validEntryType.type,
  //       employerName: parseEmployerName(validEntryType.employerName),
  //       sickLeave: parseSickLeave(validEntryType.sickLeave),
  //     };
  //   default:
  //     return assertNever(validEntryType);
  // }
// };

export default toNewPatientEntry;
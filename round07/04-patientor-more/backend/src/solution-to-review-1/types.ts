export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
  type: EntryType;
}

export enum EntryType {
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  sickLeave?: SickLeave;
  employerName: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NewBaseEntry = Omit<BaseEntry, "id">;

export type NewEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthCareEntry, "id">
  | Omit<HealthCheckEntry, "id">;

import React from 'react';
import { Entry } from '../types';
import HospitalEntryDetails from './entry-details/HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './entry-details/OccupationalHealthcareEntryDetails';
import HealthCheckEntryDetails from './entry-details/HealthCheckEntryDetails';

const EntryDetails = ( { entry } : { entry: Entry}) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
      

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;

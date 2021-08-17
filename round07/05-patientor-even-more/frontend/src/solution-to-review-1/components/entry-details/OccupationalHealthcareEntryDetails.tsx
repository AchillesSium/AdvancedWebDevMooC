import React from 'react';
import { Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntryType } from '../../types';
import DiagnoseInfo from '../DiagnoseInfo';

const OccupationalHealthcareEntryDetails = ( { entry } : { entry: OccupationalHealthcareEntryType }) => {

    const style = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      };

    let sickLeave: string;

    if (entry.sickLeave) {
        sickLeave = `${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`;
    }
    else {
        sickLeave = "No sick leave";
    }

    return (
        <div style={style}>
            <h3>
                {entry.date}
                <Icon name="stethoscope" />
                {entry.employerName}
            </h3>
            <div>{entry.description}</div>
            <div>Specialist: {entry.specialist}</div>
            <div>Sick leave: {sickLeave}</div>
            <ul>
                {entry.diagnosisCodes?.map(d => {
                    return (
                        <DiagnoseInfo key={d} code={d}/>
                    );
                })}
            </ul>
        </div>
    );
};

export default OccupationalHealthcareEntryDetails;

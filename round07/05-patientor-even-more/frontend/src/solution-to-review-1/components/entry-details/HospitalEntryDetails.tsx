import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HospitalEntryType } from '../../types';
import DiagnoseInfo from '../DiagnoseInfo';

const HospitalEntryDetails = ( { entry } : { entry: HospitalEntryType }) => {

    const style = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      };

    return (
        <div style={style}>
            <h3>{entry.date} <Icon name="hospital" /></h3>
            <div>{entry.description}</div>
            <div>Specialist: {entry.specialist}</div>
            <div>
                Discharged: {entry.discharge.date} ({entry.discharge.criteria})
            </div>
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

export default HospitalEntryDetails;

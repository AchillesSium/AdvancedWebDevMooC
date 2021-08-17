import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckEntryType } from '../../types';
import DiagnoseInfo from '../DiagnoseInfo';

const HealthCheckEntryDetails = ( { entry } : { entry: HealthCheckEntryType }) => {

    const style = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      };

    let iconColor;

    switch (entry.healthCheckRating) {
        case 0:
            iconColor = "green" as const;
            break;
        case 1:
            iconColor = "yellow" as const;
            break;
        case 2:
            iconColor = "orange" as const;
            break;
        case 3:
            iconColor = "red" as const;
            break;
        default:
            iconColor = "black" as const;
            break;
    }
    

    return (
        <div style={style}>
            <h3>{entry.date} <Icon name="user md" /></h3>
            <div>{entry.description}</div>
            <div>Specialist: {entry.specialist}</div>
            <Icon color={iconColor} name="heart" />
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

export default HealthCheckEntryDetails;

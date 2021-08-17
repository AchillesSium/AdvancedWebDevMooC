import React from 'react';
import { useStateValue } from "../state";

const DiagnoseInfo = ( { code }: { code: string} ) => {
    const [ { diagnoses } ] = useStateValue();

    const diagnosis = diagnoses?.find(d => d.code === code);

    let diagnosisDesc: string;

    if (diagnosis === undefined) {
        diagnosisDesc = "Diagnosis descipription not found!";
    }
    else {
        diagnosisDesc = diagnosis.name;
    }

    return (
        <li>{code} {diagnosisDesc}</li>
    );
};

export default DiagnoseInfo;

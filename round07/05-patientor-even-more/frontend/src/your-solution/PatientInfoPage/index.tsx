import React from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
//import {useParams} from "react-router-dom";

const PatientInfoPage = ({match}: {match: any}) => {
    const id = String(match.params.id);
    const [, dispatch] = useStateValue();
    const [patientInfo, setPatientInfo] = React.useState<Patient>();
    const [diagnosisInfo, setDiagnosisInfo] = React.useState<Diagnosis[]>();
    const diagnosisIn = diagnosisInfo? diagnosisInfo : [];
    const getPatientInfo = async (id: string) => {
        try {
          const { data: patientInfo } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          setPatientInfo(patientInfo);
          dispatch({ type: "GET_PATIENT_INFO", payload: patientInfo});
          
        } catch (e) {
          console.error(e);
        }
      };
      
      void getPatientInfo(id);

      const getDiagnosisInfo = async () => {
        try {
          const { data: diagnosisInfo } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          setDiagnosisInfo(diagnosisInfo);
          
          
        } catch (e) {
          console.error(e);
        }
      };

      void getDiagnosisInfo();

      return (
        <div>
            <h1>{patientInfo?.name} <Icon name={(patientInfo && patientInfo.gender === 'male') ? 'venus':'mars'}></Icon></h1>
            ssn: {patientInfo?.ssn}<br/>
            Occupation: {patientInfo?.occupation}<br/>
            Date of Birth: {patientInfo?.dateOfBirth}<br/>

            <div><h3>entries</h3></div><br/>
            {patientInfo?.entries?.map(entry => <Entries entry={entry} diagnosisInfo={diagnosisIn} key={entry.id}></Entries>)}
        </div>
    );
};

const Entries = ({entry, diagnosisInfo}: {entry : Entry, diagnosisInfo: Diagnosis[]}) => {
    const codes: Array<string> = [];
    if(entry.diagnosisCodes !== null){
        const diagCodes = entry.diagnosisCodes;
        if(diagCodes && diagCodes.length > 0){
            diagCodes.map(code => codes.push(code));
        }
    }
    let i = 0;

    const getDiagnosisName = (code: string) => {
        const diagObj = diagnosisInfo.find(diagnosis => diagnosis.code === code);
        if(diagObj){
            return diagObj.name;
        }else{
            return '';
        }
    };
       
    return (
        <div>
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
            {codes.map(code => <li key={i++}>{code} {getDiagnosisName(code)}</li>)}
            </ul>
        </div>
    );
};

export default PatientInfoPage;
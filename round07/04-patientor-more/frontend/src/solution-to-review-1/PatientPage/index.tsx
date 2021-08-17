import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Icon } from 'semantic-ui-react';

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(patients[id]);

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_CURRENT_PATIENT", payload: patientFromApi });
        setPatient(patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      {patient !== undefined ? (
        <>
          <h2>{patient.name} {patient.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
          <p>ssn: {patient.ssn}</p>
          <p>date of birth: {patient.dateOfBirth}</p>
          <p>occupation: {patient.occupation}</p>
        </>
      ) : <></>
      }

    </div>
  );
};

export default PatientPage;
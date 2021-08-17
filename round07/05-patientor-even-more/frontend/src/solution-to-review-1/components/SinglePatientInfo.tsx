import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { useStateValue, addSinglePatient, addEntry } from "../state";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import Entries from "./Entries";
import AddHealthCheckEntryModal from "../AddHealthCheckEntryModal";
import { HealthCheckEntryFormValues } from "../AddHealthCheckEntryModal/AddHealthCheckEntryForm";
import AddHospitalEntryModal from "../AddHospitalEntryModal";
import { HospitalEntryFormValues } from "../AddHospitalEntryModal/AddHospitalEntryForm";
import AddOccupationalHealthcareEntryModal from "../AddOccupationalHealthcareEntryModal";
import { OccupationalHealthcareEntryFormValues } from "../AddOccupationalHealthcareEntryModal/AddOccupationalHealthcareEntryForm";

const SinglePatientInfo = () => {
    const [ { singlepatient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen_1, setModalOpen_1] = React.useState<boolean>(false);
    const [modalOpen_2, setModalOpen_2] = React.useState<boolean>(false);
    const [modalOpen_3, setModalOpen_3] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal_1 = (): void => setModalOpen_1(true);
    const openModal_2 = (): void => setModalOpen_2(true);
    const openModal_3 = (): void => setModalOpen_3(true);

    const closeModal = (): void => {
        setModalOpen_1(false);
        setModalOpen_2(false);
        setModalOpen_3(false);
        setError(undefined);
    };

    type EntryFormValues = 
      | HealthCheckEntryFormValues
      | HospitalEntryFormValues
      | OccupationalHealthcareEntryFormValues;

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          const newEntry = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          if (singlepatient !== undefined) {
            dispatch(addEntry(singlepatient, newEntry.data));
          }
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
      };

    React.useEffect(() => {
        const getSinglePatient = async (id: string) => {
            try {
                const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(addSinglePatient(patient.data));
            } catch (e) {
              console.error(e.response?.data || 'Unknown Error');
            }
          };
    
        if (singlepatient === undefined || singlepatient.id !== id) {
            void getSinglePatient(id);
        }
      }, [dispatch]);

    if (singlepatient === undefined) {
        return (
            <div>Patient not found</div>
        );
    }

    let iconName;

    switch (singlepatient.gender) {
        case "male":
            iconName = "mars" as const;
            break;
        case "female":
            iconName = "venus" as const;
            break;
        default:
            iconName = "genderless" as const;
            break;
    }
    return (
        <div>
            <h2>{singlepatient.name} <Icon name={iconName} /></h2>
            <div>ssn: {singlepatient.ssn}</div>
            <div>occupation: {singlepatient.occupation}</div>
            <Entries entries={singlepatient.entries}/>
            <Button onClick={() => openModal_1()}>Add New Healthcheck Entry</Button>
            <AddHealthCheckEntryModal
                modalOpen={modalOpen_1}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal_2()}>Add New Hospital Entry</Button>
            <AddHospitalEntryModal
                modalOpen={modalOpen_2}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal_3()}>Add New Occupational Healthcare Entry</Button>
            <AddOccupationalHealthcareEntryModal
                modalOpen={modalOpen_3}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
        </div>
    );
};

export default SinglePatientInfo;

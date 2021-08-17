import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, isString } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntryType } from "../types";
import { useStateValue } from "../state";
import { isDate } from "../utils";

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type OccupationalHealthcareEntryFormValues = UnionOmit<OccupationalHealthcareEntryType, 'id'>;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel } : Props ) => {

    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            type: "OccupationalHealthcare",
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            employerName: "",
            sickLeave: {
                startDate: "",
                endDate: ""
            }
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const formatError = "Invalid format";
            const errors: { [field: string]: string } = {};

            if (!values.type) {
                errors.type = requiredError;
            }
            if (!values.description || values.description === "") {
                errors.description = requiredError;
            }
            else if (!isString(values.description)) {
                errors.description = formatError;
            }
            if (!values.date || values.date === "") {
                errors.date = requiredError;
            }
            else if (!isDate(values.date)) {
                errors.date = formatError;
            }
            if (!values.specialist || values.specialist === "") {
                errors.specialist = requiredError;
            }
            else if (!isString(values.specialist)) {
                errors.specialist = formatError;
            }
            if (!values.employerName || values.employerName === "") {
                errors.employerName = requiredError;
            }
            else if (!isString(values.employerName)) {
                errors.employerName = formatError;
            }
            if (values.sickLeave?.startDate) {
                if (!isDate(values.sickLeave.startDate)) {
                    errors.sickLeave = formatError;
                }
            }
            if (values.sickLeave?.endDate) {
                if (!isDate(values.sickLeave.endDate)) {
                    errors.sickLeave = formatError;
                }
            }
            return errors;
        }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
            <Form className="form ui">
                <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
                <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                />
                <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
                />
                <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
                />
                <Field
                label="Sick leave - start date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
                />
                <Field
                label="Sick leave - end date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
                />
                <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
                />
                <Grid>
                <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                    Cancel
                    </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                    <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid.Column>
                </Grid>
            </Form>
            );
        }}
        </Formik>
    );
};

export default AddOccupationalHealthcareEntryForm;

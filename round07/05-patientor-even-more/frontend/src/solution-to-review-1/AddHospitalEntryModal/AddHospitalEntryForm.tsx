import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, isString } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntryType } from "../types";
import { useStateValue } from "../state";
import { isDate } from "../utils";

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type HospitalEntryFormValues = UnionOmit<HospitalEntryType, 'id'>;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm = ({ onSubmit, onCancel } : Props ) => {

    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            type: "Hospital",
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            discharge: {
                date: "",
                criteria: ""
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
            if (!values.discharge.date || values.discharge.date === "") {
                errors.discharge = requiredError;
            }
            else if (!isDate(values.discharge.date)) {
                errors.discharge = formatError;
            }
            if (!values.discharge.criteria || values.discharge.criteria === "") {
                errors.discharge = requiredError;
            }
            else if (!isString(values.discharge.criteria)) {
                errors.discharge = formatError;
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
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
                />
                <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
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

export default AddHospitalEntryForm;

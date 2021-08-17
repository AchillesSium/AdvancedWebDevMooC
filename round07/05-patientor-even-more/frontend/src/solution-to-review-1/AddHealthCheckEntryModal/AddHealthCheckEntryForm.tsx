import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, isString } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthCheckEntryType } from "../types";
import { useStateValue } from "../state";
import { isDate } from "../utils";

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type HealthCheckEntryFormValues = UnionOmit<HealthCheckEntryType, 'id'>;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel } : Props ) => {

    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            type: "HealthCheck",
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            healthCheckRating: 0
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const formatError = "Invalid format";
            const valueError = "Illegal value";
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
            if (!values.healthCheckRating && values.healthCheckRating !== 0) {
                errors.healthCheckRating = requiredError;
            }
            if (values.healthCheckRating && ![0, 1, 2, 3].includes(values.healthCheckRating)) {
                errors.healthCheckRating = valueError;
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
                label="HealthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
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

export default AddHealthCheckEntryForm;

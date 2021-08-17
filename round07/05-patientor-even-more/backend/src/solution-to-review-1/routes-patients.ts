import express from 'express';
import toNewPatientEntry from './utils';
import { validateEntryData } from './utils';
import patientService from './services-patients';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient && patient !== undefined) {
    res.json(patient);
  }
  else {
    res.status(404).send("Patient not found with given id");
  }
})

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
})


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    newPatientEntry.entries = [];
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message); 
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    // Check if patient exists
    const patient = patientService.getPatientById(req.params.id);
    if (patient && patient !== undefined) {
      const validEntry = validateEntryData(req.body);
      const addedEntry = patientService.addNewEntry(validEntry, patient);
      res.json(addedEntry);
    }
    else {
      res.status(404).send("Patient not found with given id");
    }
  } catch (e) {
    res.status(400).send(e.message); 
  }
})


export default router;

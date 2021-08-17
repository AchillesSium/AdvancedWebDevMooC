import express from 'express';
import toNewPatientEntry from './utils';
import patientService from './services-patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
})

router.get('/:id', (_req, res) => {
  const id = _req.params.id;
  const patient = patientService.getDataPatients().find(patientEntry => patientEntry.id === id)
  res.json(patient);
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
      
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message); 
  }
})


export default router;

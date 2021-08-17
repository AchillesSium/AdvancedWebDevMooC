import express from 'express';
import toNewPatientEntry from './utils';
import patientService from './services-patients';

const router = express.Router();

//const idList = patientService.getEntries().map(patient=> patient.id)

router.get('/',(_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
})

var id = function(_req: any, _res: any){
  var patientToShow = patientService.getEntries().filter(patient => patient.id === _req.params.id)
  _res.json(patientToShow)
}
router.get('/:id', id)


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

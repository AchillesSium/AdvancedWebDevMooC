
import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();

app.get('/bmi', (req, res) => {
    if (req.query.height == null || req.query.weight == null) {
        const response = {
            statuscode : 400,
            error: 'Bad Request'
        }
        res.send(response)
    }
    const height = Number(req.query.height!)
    const weight = Number(req.query.weight!)

    console.log(weight)

    if (isNaN(height) ||  isNaN(weight)) {
        const response = {
            statuscode : 400,
            error: 'Bad Request'
        }
        res.send(response)
    }

    const bmi = calculateBmi(height, weight);
    const response = {
        weight: weight,
        height: height,
        bmi: bmi
      }
    res.send(response);
  });
  
const PORT = 3002;
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

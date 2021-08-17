
import express from 'express';
import { calculateExercises } from './exercise-calculator';

const app = express();
app.use(express.json());


app.post('/exercises', (req, res) => {
  console.log(req.body)
  res.send(calculateExercises(req.body.target, req.body.daily_exercises))
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

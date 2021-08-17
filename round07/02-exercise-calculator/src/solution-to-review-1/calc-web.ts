
import express from 'express';
import { calculateExercises } from './exercise-calculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Server running!');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/about', (_req, res) => {
  res.send('Hi, this is an excercise calculator which may or may not make yourself feel a better person!');
});

app.post('/calc', (req, res) => {
  try {
    // Unsafe member access .daily_exercises on an any value  @typescript-eslint/no-unsafe-member-access
    const dailyExercises = req.body.daily_exercises;
    const dailyTarget = Number(req.body.target);

    if (!dailyExercises || !dailyTarget) {
      throw new Error('Missing parameters');
    }
    if ( isNaN(dailyTarget) ) {
      throw new Error('Malformatted parameters');
    }
    const jsonResponse = calculateExercises(dailyExercises, dailyTarget);
    res.json(jsonResponse);

  } catch (e) {
    const error = {
      'error': Error(e).message
    };
    res.status(400).json(error);
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

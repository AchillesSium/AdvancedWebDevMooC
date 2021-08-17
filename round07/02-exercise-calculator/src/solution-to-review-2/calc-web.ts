
import express from 'express';
import { calculateExercises } from './exercise-calculator';

interface Body {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(express.json());

app.get("/about", (_req, res) => {
  res.send('exercise calculator')
});

app.post("/calc", (req, res) => {
  const { daily_exercises, target }: Body = req.body as Body;
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (
    !daily_exercises.every((de) => !isNaN(Number(de))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  res.json(
    calculateExercises(
      daily_exercises.map((de) => Number(de)),
      Number(target)
    )
  );
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

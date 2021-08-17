import { calculateExercises } from './exercise-calculator';

interface ParsedExerciseArgs {
  target: number;
  dailyHours: number[];
}

const parseArguments = (args: Array<string>): ParsedExerciseArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map((hours) => Number(hours));
  const hasNaNInDailyHours = dailyHours.some((hours) => isNaN(hours));

  if (isNaN(target) || hasNaNInDailyHours) {
    throw new Error("Please provide arguments as numbers");
  }

  const hasInvalidDailyHours = dailyHours.some((hours) => hours > 24);

  if (target > 24 || hasInvalidDailyHours) {
    throw new Error("Maximum hours per day is 24");
  }

  return { target, dailyHours };
};

try {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  console.log("An error has occured:", e.message);
}

/*

>>> test case 1:

npm start cli  2 3 0 2 4.5 0 3 1


{ 
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 
}

>>> test case 2:

npm start cli 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 
}

*/

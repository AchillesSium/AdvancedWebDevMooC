

import { calculateExercises } from './exercise-calculator';

try {
  if (process.argv.length < 4) { 
    throw new Error('Not enough arguments');
  }
  const hoursStrArr = process.argv.slice(3);
  const hours = hoursStrArr.map(s => Number(s));
  const target = Number(process.argv[2]);
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log('Error: ', e);
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

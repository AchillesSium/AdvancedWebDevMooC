

import { calculateExercises } from './exercise-calculator';


interface ExerciseValues {
  target: number;
  workingHours: Array<number>;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments');
  
  var target;

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2])
  } else {
    throw new Error('Provided values were not numbers!');
  }
  var workingHours = [];
  for(var i = 3; i < args.length; i ++){
      if(isNaN(Number(args[i]))){
          throw new Error('Provided values were not numbers!');
      }
      workingHours.push(Number(args[i]))
  }

  if (workingHours.length < 1){
    throw new Error('Not enough arguments')
  } 

  return{
      target: target,
      workingHours: workingHours
  }

}

try {
  const { target, workingHours } = parseArguments(process.argv);
  console.log(calculateExercises(target, workingHours));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
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

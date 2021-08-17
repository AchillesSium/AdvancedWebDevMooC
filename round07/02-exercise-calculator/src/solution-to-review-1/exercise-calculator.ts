interface Result{ 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

const calculateExercises = (exerciseHours: Array<number>, target: number) : Result => {

  if (!target || !exerciseHours) {
    throw new Error("Error. Please provide hours and target as parameters");
  }
  if (exerciseHours.length === 0) {
    throw new Error("Please provide exercise hours as an array");
  }
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(h => h > 0).length;
  const average: number = exerciseHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success: boolean = ( average >= target );

  if (!(average >= 0)) {
    throw new Error("Unable to calculate average. Please check that parameters are numbers,");
  }

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Well done! Keep it up.';
  } else if (average/target > 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'There is room for development!';
  }
  
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average 
  };
};

export { calculateExercises };






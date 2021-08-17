interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (exerciselog: number[], target: number): Result => {
    const periodLength = exerciselog.length;
    const trainingDays = exerciselog.reduce(
        (acc, day) => (day !== 0 ? acc + 1 : acc),
        0
    );

    const average = exerciselog.reduce((acc, day) => acc + day, 0) / periodLength;
    let ratingDescription = '';
    let rating = 0;
    if (average === target) {
        ratingDescription = 'Well done!';
        rating = 1;
    } else if (average > 0.7 * target) {
        ratingDescription = 'Not too bad but could be better.';
        rating = 2;
    } else {
        ratingDescription = "Wtf man";
        rating = 3;
    }

    return {
        periodLength,
        trainingDays,
        success: average === target,
        rating,
        ratingDescription,
        target,
        average
    };
};

export { calculateExercises };






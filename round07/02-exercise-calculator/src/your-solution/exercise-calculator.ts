
interface Result{
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (target: number, workingHours: Array<number>): Result => {
    var notWoking = 0;
    var totalHour = 0;
    for(var i = 0; i < workingHours.length; i++){
        if(workingHours[i] === 0){
            notWoking += 1;
        }
        totalHour = totalHour + workingHours[i];
    }

    var success = true

    const avg = totalHour / workingHours.length;
    const trainingDays = workingHours.length - notWoking
    var ratingDescription = ""
    var rating = 0
    if(avg >= target){
        success = true
        ratingDescription = "good performance"
        rating = 3
    }else{
        success = false
        var diff = Math.abs(target - avg)
        if(diff < 0.5){
            ratingDescription = "not too bad but could be better"
            rating = 2
        }else{
            ratingDescription = "poor performance"
            rating = 1
        }
    }
    
    return{
        periodLength: workingHours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avg
      }
};

export { calculateExercises };






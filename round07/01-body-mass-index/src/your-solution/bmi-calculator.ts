
const calculateBmi = (heightInCm: number, weight: number) : string => {
    const height = heightInCm / 100;
    const bmi = weight / (height * height);
    if (bmi < 18.5 ) {
        return 'Underweight(Not health weight)'
    }else if (bmi >= 18.5 && bmi < 25){
        return 'Normal (healthy weight)'
    }else if (bmi >= 25 && bmi < 30){
        return 'Overweight(Weight need to be reduced)'
    }else{
        return 'Obese(Too much over weight)'
    }
  };

export { calculateBmi };

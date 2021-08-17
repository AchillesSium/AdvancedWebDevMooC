/**
 * weight_kg divided by height's (in meters!) square
 */
const calculateBmi = (height_cm: number = 0, weight_kg: number = 0): string => {
  if (isNaN(height_cm) || height_cm <= 0 || isNaN(weight_kg) || weight_kg <= 0)
    throw new Error("Param error");

  const BMI = weight_kg / Math.pow(height_cm / 100, 2);

  if (BMI >= 40) return "Obese Class III (Very severely obese)";
  else if (BMI >= 35) {
    return "Obese Class II (severely obese)";
  } else if (BMI >= 30) {
    return "Obese Class I (Moderately obese) ";
  } else if (BMI >= 25) {
    return "Overweight";
  } else if (BMI >= 18.5) {
    return "Normal (healthy weight) ";
  } else if (BMI >= 16) {
    return "Underweight";
  } else if (BMI >= 15) {
    return "Severely underweight ";
  } else {
    return "Very severely underweight ";
  }
};

export { calculateBmi };

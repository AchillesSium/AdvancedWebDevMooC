
import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (!height || !weight) {
        res.send({error: "Height or weight not declared"})
    }

    if (isNaN(Number(height)) && isNaN(Number(weight))) {
        res.send({error: "Height or weight not a number"})
    }

    const bmi = calculateBmi(Number(height), Number(weight))
    res.send({
        weight: weight,
        height: height,
        bmi: bmi
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
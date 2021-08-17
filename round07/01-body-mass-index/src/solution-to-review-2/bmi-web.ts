import express from "express";
import { calculateBmi } from "./bmi-calculator";
const port = 3003;
const app = express();

app.get("/bmi", (req, res) => {
  console.log(req);
  const h = Number(req.query?.height);
  const w = Number(req.query?.weight);
  res.send(calculateBmi(h, w));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

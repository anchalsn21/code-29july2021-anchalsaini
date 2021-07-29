import express, { Request, Response } from "express";
import { bmiRoutes } from "./bmi.routes";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send(`
  <style>
  .main div{
    margin-top:25px;
  }

  </style>
  <div class="main" style="text-align:center;">
  <h1 >
  Welcome to BMI assignment
  </h1>
  <div>
  Go to Route /bmi To view all Bmi Records or
  <a href="/bmi">  Click Here </a>
  </div>
  <div>
  <a href="bmi/overweight"> Click Here to view Overweight People count</a>
  
  </div>
  <div>
  <a href="/bmi/normal%20weight"> Click Here to view count of Normal weight people</a>
  
  </div>
  <div>
  <a href="/bmi/Under%20Weight"> Click Here to view count of Under Weight people</a>
  
  </div>
  <div>
  <a href="/bmi/Moderately%20Obese"> Click Here to view count of Moderately Obese people</a>
  
  </div>
  <div>
  <a href="/bmi/Severely%20Obese"> Click Here to view count of Severely Obese people</a>
  
  </div>
  <div>
  <a href="/bmi/Very%20Severly%20Obese"> Click Here to view count of Very Severly Obese people</a>
  
  </div>
  </div>
  `);
});

router.use("/bmi", bmiRoutes);

export { router };

import express from "express";
import {
  getAllBmiDetails,
  getCategoryCountData,
} from "../controllers/bmi.controller";

const router = express.Router();

router.get("/", getAllBmiDetails);

router.get("/:criteria", getCategoryCountData);

export { router as bmiRoutes };

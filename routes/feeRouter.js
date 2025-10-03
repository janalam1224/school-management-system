import { Router } from "express";
import { 
  getFees,
  createFees,
 } from "../controllers/feeController.js";

const router = Router();

router.get("/", getFees);
router.post("/", createFee);

export default router;
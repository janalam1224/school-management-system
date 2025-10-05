import { Router } from "express";
import { 
  getFees,
  createFee,
 } from "../controllers/feeController.js";

const router = Router();

router.get("/fee", getFees);
router.post("/fee", createFee);

export default router;
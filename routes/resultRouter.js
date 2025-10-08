import { Router } from "express";
import { 
  getResults,
  createResult,
} from "../controllers/resultController.js";

const router = Router();

router.get("/", getResults);
router.post("/", createResult);

export default router;
import { Router } from "express";
import { 
  getAssignment,
  createAssignment,
} from "../controllers/assignmentController.js";

const router = Router();

router.get("/assign", getAssignment);
router.post("/assign", createAssignment);

export default router;
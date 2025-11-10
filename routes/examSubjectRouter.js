import { Router } from "express";
import { 
  getExamSubjects,
  createExamSubject,
} from "../controllers/examSubjectController.js";

const router = Router();

router.get("/", getExamSubjects);
router.post("/", createExamSubject);

export default router;
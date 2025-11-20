import { Router } from "express";
import { 
  getAssignments,
  createAssignment,
  findAssignment,
  editAssignment,
  deleteAssignment,
} from "../controllers/teachingAssignmentController.js";

const router = Router();

router.get("/", getAssignments);
router.post("/", createAssignment);
router.get("/:id", findAssignment);
router.put("/:id", editAssignment);
router.delete("/:id", deleteAssignment);

export default router;
import { Router } from "express";
import { 
  getStudents,
  createStudent,
  findStudent,
  editStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", findStudent);
router.put("/:id", editStudent);
router.delete("/:id", deleteStudent);

export default router;
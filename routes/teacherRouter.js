import { Router } from "express";
import { 
  getTeachers,
  createTeacher,
  findTeacher,
  editTeacher,
  deleteTeacher,
 } from "../controllers/teacherController.js";

const router = Router();

router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", findTeacher);
router.put("/:id", editTeacher);
router.delete("/:id", deleteTeacher);

export default router;
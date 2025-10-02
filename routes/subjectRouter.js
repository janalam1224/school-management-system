import { Router } from "express";
import { 
  getSubjects,
  createSubject,
  findSubject,
  editSubject,
  deleteSubject,
 } from "../controllers/subjectController.js";

const router = Router();

router.get("/", getSubjects);
router.post("/", createSubject);
router.get("/:id", findSubject);
router.put("/:id", editSubject);
router.delete("/:id", deleteSubject);

export default router;
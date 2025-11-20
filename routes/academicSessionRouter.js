import { Router } from "express";
import { 
  getSessions,
  createSession,
  findSession,
  editSession,
  deleteSession,
 } from "../controllers/academicSessionController.js";

const router = Router();

router.get("/", getSessions);
router.post("/", createSession);
router.get("/:id", findSession);
router.put("/:id", editSession);
router.delete("/:id", deleteSession);


export default router;


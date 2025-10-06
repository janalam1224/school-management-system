import { Router } from "express";
import { 
  getAttendance,
  createAttendance,
 } from "../controllers/StudentAttendanceController.js";

const router = Router();

router.get("/studentAttendance", getAttendance);
router.post("/studentAttendance", createAttendance);

export default router;


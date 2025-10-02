import { Router } from "express";
import { 
  getClasses,
  createClass,
  findClass,
  editClass,
  deleteClass,
} from "../controllers/classController.js";

const router = Router();

router.get("/", getClasses);
router.post("/", createClass);
router.get("/:id", findClass);
router.put("/:id", editClass);
router.delete("/:id", deleteClass);

export default router;
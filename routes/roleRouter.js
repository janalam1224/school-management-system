import express from "express";
import {
  getRoles,
  createRole,
  findRole,
  editRole,
  deleteRole,
} from "../controllers/roleController.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.get("/:id", findRole);
router.put("/:id", editRole);
router.delete("/:id", deleteRole);

export default router;

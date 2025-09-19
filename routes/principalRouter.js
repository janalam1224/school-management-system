import { Router } from "express";
import { 
  getUsers,
  createUser,
  findUser,
  editUser,
  deleteUser,
} from "../controllers/principalController.js";

const router = Router();

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", findUser);

router.put("/:id", editUser);

router.delete("/:id", deleteUser);

export default router;
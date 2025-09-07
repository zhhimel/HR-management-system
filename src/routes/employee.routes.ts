import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { upload } from "../config/multer";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller";

const router = Router();

router.use(authenticateJWT);

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", upload.single("photo"), createEmployee);
router.put("/:id", upload.single("photo"), updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;

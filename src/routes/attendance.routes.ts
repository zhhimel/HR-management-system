import { Router } from "express";
import {
  createOrUpdateAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateJWT);

router.post("/", createOrUpdateAttendance);
router.get("/", getAttendance);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;

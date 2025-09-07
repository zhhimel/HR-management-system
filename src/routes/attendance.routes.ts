import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import {
  getAttendance,
  getAttendanceById,
  createOrUpsertAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller";

const router = Router();

router.use(authenticateJWT);

router.get("/", getAttendance);
router.get("/:id", getAttendanceById);
router.post("/", createOrUpsertAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;

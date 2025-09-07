// src/routes/reports.routes.ts
import { Router } from "express";
import { getAttendanceReport } from "../controllers/reports.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/attendance", authenticateJWT, getAttendanceReport);

export default router;

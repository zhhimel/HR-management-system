import { Request, Response } from "express";
import * as attendanceService from "../services/attendance.service";

export const getAttendance = async (req: Request, res: Response) => {
  try {
    const { employee_id, from, to } = req.query;
    const records = await attendanceService.getAllAttendance({
      employee_id: employee_id ? Number(employee_id) : undefined,
      from: from as string | undefined,
      to: to as string | undefined,
    });
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const record = await attendanceService.getAttendanceById(id);
    if (!record) return res.status(404).json({ message: "Attendance not found" });
    res.json(record);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createOrUpsertAttendance = async (req: Request, res: Response) => {
  try {
    const { employee_id, date, check_in_time } = req.body;
    if (!employee_id || !date || !check_in_time) {
      return res.status(400).json({ message: "employee_id, date and check_in_time are required" });
    }

    const record = await attendanceService.upsertAttendance({
      employee_id: Number(employee_id),
      date,
      check_in_time,
    });

    res.status(201).json(record);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const record = await attendanceService.updateAttendance(id, req.body);
    if (!record) return res.status(404).json({ message: "Attendance not found" });
    res.json(record);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await attendanceService.deleteAttendance(id);
    if (!deleted) return res.status(404).json({ message: "Attendance not found" });
    res.json({ message: "Attendance deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

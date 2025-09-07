import { Request, Response } from "express";
import db from "../config/knex";
import Joi from "joi";

// Validation schema
const attendanceSchema = Joi.object({
  employee_id: Joi.number().integer().required(),
  date: Joi.date().required(),
  check_in_time: Joi.string().required(), // format: HH:mm:ss
});

export const createOrUpdateAttendance = async (req: Request, res: Response) => {
  try {
    const { error, value } = attendanceSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { employee_id, date, check_in_time } = value;

    // Check employee exists
    const employee = await db("employees").where({ id: employee_id }).first();
    if (!employee) return res.status(400).json({ message: "Employee not found" });

    // Upsert attendance
    const existing = await db("attendance").where({ employee_id, date }).first();

    if (existing) {
      const [updated] = await db("attendance")
        .where({ employee_id, date })
        .update({ check_in_time })
        .returning("*");
      return res.status(200).json(updated);
    } else {
      const [created] = await db("attendance")
        .insert({ employee_id, date, check_in_time })
        .returning("*");
      return res.status(201).json(created);
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// List attendance with optional filters
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const { employee_id, from, to } = req.query;

    let query = db("attendance").select("*");

    if (employee_id) query = query.where("employee_id", Number(employee_id));
    if (from) query = query.where("date", ">=", from);
    if (to) query = query.where("date", "<=", to);

    const data = await query.orderBy("date", "desc");
    return res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// Get single attendance by ID
export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await db("attendance").where({ id: Number(id) }).first();
    if (!record) return res.status(404).json({ message: "Attendance not found" });
    return res.status(200).json(record);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// Update attendance
export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { check_in_time } = req.body;

    const [updated] = await db("attendance")
      .where({ id: Number(id) })
      .update({ check_in_time })
      .returning("*");

    if (!updated) return res.status(404).json({ message: "Attendance not found" });
    return res.status(200).json(updated);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// Delete attendance
export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await db("attendance").where({ id: Number(id) }).del();
    if (!deleted) return res.status(404).json({ message: "Attendance not found" });

    return res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

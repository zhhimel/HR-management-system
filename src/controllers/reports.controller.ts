// src/controllers/reports.controller.ts
import { Request, Response } from "express";
import db from "../config/knex";

export const getAttendanceReport = async (req: Request, res: Response) => {
  try {
    const { month, employee_id } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month (YYYY-MM) is required" });
    }

    const [year, mon] = (month as string).split("-");

    if (!year || !mon) {
      return res.status(400).json({ message: "Month format should be YYYY-MM" });
    }

    // Base query
    let query = db("attendance")
      .select(
        "employees.id as employee_id",
        "employees.name",
        db.raw("COUNT(attendance.id) as days_present"),
        db.raw(
          "SUM(CASE WHEN attendance.check_in_time > '09:45:00' THEN 1 ELSE 0 END) as times_late"
        )
      )
      .innerJoin("employees", "attendance.employee_id", "employees.id")
      .whereRaw("EXTRACT(YEAR FROM attendance.date) = ?", [year])
      .andWhereRaw("EXTRACT(MONTH FROM attendance.date) = ?", [mon])
      .groupBy("employees.id", "employees.name");

    if (employee_id) {
      query = query.where("employees.id", Number(employee_id));
    }

    const report = await query;

    return res.status(200).json(report);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

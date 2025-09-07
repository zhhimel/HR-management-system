import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const employees = await employeeService.getAllEmployees(search);
    res.json(employees);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const emp = await employeeService.getEmployeeById(id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, age, designation, hiring_date, date_of_birth, salary } = req.body;
    const photo_path = req.file ? req.file.filename : undefined;
    const emp = await employeeService.createEmployee({
      name,
      age: Number(age),
      designation,
      hiring_date,
      date_of_birth,
      salary: Number(salary),
      photo_path,
    });
    res.status(201).json(emp);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updates = { ...req.body };
    if (req.file) updates.photo_path = req.file.filename;
    const emp = await employeeService.updateEmployee(id, updates);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await employeeService.deleteEmployee(id);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

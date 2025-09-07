import { Request, Response } from "express";
import * as authService from "../services/auth.service";

// src/controllers/auth.controller.ts
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" }); // ✅ return
    }

    const user = await authService.registerHR(email, password, name);

    return res.status(201).json({ message: "User registered successfully", user }); // ✅ return
  } catch (err: any) {
    return res.status(400).json({ message: err.message }); // ✅ return
  }
};




export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginHR(email, password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

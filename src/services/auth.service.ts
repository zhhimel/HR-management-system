import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/knex";

// src/services/auth.service.ts
export const registerHR = async (email: string, password: string, name: string) => {
  // Check if email or name already exists
  const existing = await db("hr_users")
    .where("email", email)
    .orWhere("name", name)
    .first();

  if (existing) {
    throw new Error("Email or name is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [hr] = await db("hr_users")
    .insert({ email, password_hash: hashedPassword, name })
    .returning(["id", "email", "name"]);

  return hr;
};


export const loginHR = async (email: string, password: string) => {
  const hr = await db("hr_users").where({ email }).first();

  if (!hr) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, hr.password_hash); // ✅ use password_hash
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: hr.id, email: hr.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return { token, user: { id: hr.id, email: hr.email } };
};

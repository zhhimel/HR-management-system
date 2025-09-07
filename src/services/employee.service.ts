import db from "../config/knex";

interface EmployeeInput {
  name: string;
  age: number;
  designation: string;
  hiring_date: string;
  date_of_birth: string;
  salary: number;
  photo_path?: string;
}

export const getAllEmployees = async (search?: string) => {
  let query = db("employees").select("*");
  if (search) {
    query = query.whereILike("name", `%${search}%`);
  }
  return await query;
};

export const getEmployeeById = async (id: number) => {
  return await db("employees").where({ id }).first();
};

export const createEmployee = async (data: EmployeeInput) => {
  const [emp] = await db("employees").insert(data).returning("*");
  return emp;
};

export const updateEmployee = async (id: number, data: Partial<EmployeeInput>) => {
  const [emp] = await db("employees").where({ id }).update(data).returning("*");
  return emp;
};

export const deleteEmployee = async (id: number) => {
  return await db("employees").where({ id }).del();
};

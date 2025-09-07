import db from "../config/knex";

interface AttendanceInput {
  employee_id: number;
  date: string; // YYYY-MM-DD
  check_in_time: string; // HH:mm:ss
}

// List attendance
export const getAllAttendance = async (filters?: {
  employee_id?: number;
  from?: string;
  to?: string;
}) => {
  let query = db("attendance").select("*");
  
  if (filters?.employee_id) {
    query = query.where("employee_id", filters.employee_id);
  }
  if (filters?.from) {
    query = query.where("date", ">=", filters.from);
  }
  if (filters?.to) {
    query = query.where("date", "<=", filters.to);
  }

  return await query;
};

// Get single
export const getAttendanceById = async (id: number) => {
  return await db("attendance").where({ id }).first();
};

// Create or upsert attendance
export const upsertAttendance = async (data: AttendanceInput) => {
  const existing = await db("attendance")
    .where({ employee_id: data.employee_id, date: data.date })
    .first();

  if (existing) {
    const [updated] = await db("attendance")
      .where({ id: existing.id })
      .update({ check_in_time: data.check_in_time })
      .returning("*");
    return updated;
  }

  const [att] = await db("attendance").insert(data).returning("*");
  return att;
};

// Update attendance
export const updateAttendance = async (id: number, data: Partial<AttendanceInput>) => {
  const [att] = await db("attendance").where({ id }).update(data).returning("*");
  return att;
};

// Delete attendance
export const deleteAttendance = async (id: number) => {
  return await db("attendance").where({ id }).del();
};

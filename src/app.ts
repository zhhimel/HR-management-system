import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import attendanceRoutes from "./routes/attendance.routes";

// import employeeRoutes from "./routes/employee.routes";
// import attendanceRoutes from "./routes/attendance.routes";
// import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/attendance", attendanceRoutes);

// // Error handler
// app.use(errorHandler);

export default app;

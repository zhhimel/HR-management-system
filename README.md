# HR Management Backend

A **RESTful HR Management Backend** built with **Node.js, TypeScript, Express, Knex, and PostgreSQL**.  
Supports **HR user authentication, employee management, attendance tracking, and monthly attendance reports**.

---

## **Features**

- HR user authentication with JWT
- CRUD operations for employees
- Daily attendance recording (check-in time)
- Monthly attendance reports with days present and times late
- Soft delete for employees
- Pagination and search for employees and attendance
- Input validation with Joi
- File upload support for employee photos
- Fully typed with TypeScript

---

## **Tech Stack**

- Node.js + TypeScript
- Express.js
- PostgreSQL
- Knex.js (Query builder + migrations)
- JWT for authentication
- Joi for input validation
- Multer for file uploads
- ESLint & Prettier for code quality

---

## **Project Structure**

```
hr-backend/
│
├─ src/
│  ├─ config/          # DB & Knex config
│  ├─ controllers/     # Route handlers
│  ├─ middlewares/     # JWT, error handling
│  ├─ routes/          # Auth, Employees, Attendance, Reports
│  ├─ app.ts           # Express app
│  └─ server.ts        # Server startup
│
├─ uploads/            # File uploads directory
├─ knexfile.ts         # Knex config
├─ package.json
├─ tsconfig.json
├─ .env
├─ .env.example
└─ README.md
```

---

## **Setup Instructions**

### 1. Clone the repository
```bash
git clone <repo_url>
cd hr-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
Copy `.env.example` to `.env` and update values:

```env
# Server
PORT=4000
NODE_ENV=development

# DB (Postgres)
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=hr_user
DB_PASSWORD=hr_pass
DB_NAME=hr_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s

# Uploads
UPLOAD_DIR=uploads

# Knex (optional)
KNEX_CLIENT=pg
```

### 4. Setup PostgreSQL Database
Create a PostgreSQL database with the credentials specified in your `.env` file:

```sql
CREATE DATABASE hr_db;
CREATE USER hr_user WITH PASSWORD 'hr_pass';
GRANT ALL PRIVILEGES ON DATABASE hr_db TO hr_user;
```

### 5. Run migrations
```bash
npm run migrate:latest
```

### 6. Optional: Run seeds
```bash
npm run seed:run
```

### 7. Start the server
```bash
npm run dev
```

Server should run at: **http://localhost:4000**

---

## **API Endpoints**

### **Auth**
| Method | URL | Body | Description |
|--------|-----|------|-------------|
| POST | `/api/auth/login` | `{ email, password }` | HR user login |

### **Employees**
| Method | URL | Body / Query | Description |
|--------|-----|--------------|-------------|
| GET | `/api/employees` | `?page=&limit=&search=` | List employees with pagination/search |
| GET | `/api/employees/:id` | | Get employee by ID |
| POST | `/api/employees` | Form-data: `name, age, designation, hiring_date, date_of_birth, salary, photo` | Create employee |
| PUT | `/api/employees/:id` | Same as POST | Update employee |
| DELETE | `/api/employees/:id` | | Soft delete employee |

### **Attendance**
| Method | URL | Body / Query | Description |
|--------|-----|--------------|-------------|
| GET | `/api/attendance` | `?employee_id=&from=&to=&page=&limit=` | List attendance |
| GET | `/api/attendance/:id` | | Get attendance by ID |
| POST | `/api/attendance` | `{ employee_id, date, check_in_time }` | Create or update attendance |
| PUT | `/api/attendance/:id` | `{ employee_id, date, check_in_time }` | Update attendance |
| DELETE | `/api/attendance/:id` | | Delete attendance |

### **Reports**
| Method | URL | Query | Description |
|--------|-----|-------|-------------|
| GET | `/api/reports/attendance` | `month=YYYY-MM&employee_id` | Monthly attendance summary |

---

## **Development Scripts**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run migrations
npm run migrate:latest

# Rollback migrations
npm run migrate:rollback

# Run seeds
npm run seed:run

# Lint code
npm run lint

# Format code
npm run format
```

---

## **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment mode | `development` |
| `DB_HOST` | PostgreSQL host | `127.0.0.1` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database username | `hr_user` |
| `DB_PASSWORD` | Database password | `hr_pass` |
| `DB_NAME` | Database name | `hr_db` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `3600s` |
| `UPLOAD_DIR` | File uploads directory | `uploads` |
| `KNEX_CLIENT` | Knex database client | `pg` |

---

## **Database Schema**

### **HR Users**
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `created_at`
- `updated_at`

### **Employees**
- `id` (Primary Key)
- `name`
- `age`
- `designation`
- `hiring_date`
- `date_of_birth`
- `salary`
- `photo` (File path)
- `is_deleted` (Soft delete flag)
- `created_at`
- `updated_at`

### **Attendance**
- `id` (Primary Key)
- `employee_id` (Foreign Key)
- `date`
- `check_in_time`
- `created_at`
- `updated_at`

---

## **Authentication**

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## **File Uploads**

Employee photos are uploaded to the `uploads/` directory. Supported formats: JPG, PNG, GIF.

---

## **Error Handling**

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (if available)"
}
```

---

## **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

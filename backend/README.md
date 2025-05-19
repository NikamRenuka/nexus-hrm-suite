
# HRMS Backend

This is the backend server for the HRMS (Human Resource Management System) application.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and update the values:
   ```
   cp .env.example .env
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. For production, start with:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/users - Register a new user
- POST /api/users/login - Authenticate user
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Employees
- GET /api/employees - Get all employees
- GET /api/employees/:id - Get employee by ID
- POST /api/employees - Create new employee
- PUT /api/employees/:id - Update employee
- DELETE /api/employees/:id - Delete employee
- GET /api/employees/profile - Get current employee profile
- POST /api/employees/:id/documents - Upload document

### Attendance
- POST /api/attendance/check-in - Check in
- POST /api/attendance/check-out - Check out
- GET /api/attendance/my - Get my attendance
- GET /api/attendance - Get all attendance records
- GET /api/attendance/:id - Get attendance by ID
- PUT /api/attendance/:id/override - Override attendance

### Leave
- POST /api/leave - Apply for leave
- GET /api/leave/my - Get my leaves
- GET /api/leave - Get all leaves
- GET /api/leave/:id - Get leave by ID
- PUT /api/leave/:id/status - Update leave status
- PUT /api/leave/:id/cancel - Cancel leave

### Payroll
- POST /api/payroll - Generate payroll
- GET /api/payroll - Get all payrolls
- GET /api/payroll/:id - Get payroll by ID
- PUT /api/payroll/:id/status - Update payroll status
- PUT /api/payroll/:id/bank-transfer - Update bank transfer details
- GET /api/payroll/my - Get my salary slips

### Departments
- GET /api/departments - Get all departments
- GET /api/departments/:id - Get department by ID
- POST /api/departments - Create department
- PUT /api/departments/:id - Update department
- DELETE /api/departments/:id - Delete department
- GET /api/departments/:id/employees - Get department employees

## Environment Variables

- NODE_ENV - Node environment (development/production)
- PORT - Server port
- MONGO_URI - MongoDB connection string
- JWT_SECRET - Secret for JWT signing
- JWT_EXPIRE - JWT expiration time
- CLIENT_URL - Frontend URL (for CORS)
- SMTP_HOST - SMTP host for email
- SMTP_PORT - SMTP port
- SMTP_USER - SMTP username
- SMTP_PASSWORD - SMTP password
- SMTP_SECURE - Use secure connection
- EMAIL_FROM - Default from email address

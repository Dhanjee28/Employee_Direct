# Employee Directory Management System

A full-stack Employee Directory and Management System built using **Node.js, Express.js, MySQL, Sequelize, HTML, CSS, and JavaScript**.

This project allows users to manage employees and departments through a clean dashboard. It includes authentication, JWT-based protected routes, role-based access control, employee CRUD, department CRUD, search/filter functionality, and a responsive frontend UI.

---

## Why I Built This Project

I built this project as a portfolio project to improve my full-stack development skills.

This project helped me understand:

- REST API development
- MySQL database design
- Sequelize ORM
- Authentication and authorization
- JWT protected routes
- Role-based access control
- Frontend-backend integration
- CRUD operations
- Responsive UI/UX
- Clean project structure

---

## Key Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- First registered user becomes admin
- Normal users get viewer access

### Role-Based Access Control

- Admin can add, update, and delete employees/departments
- Normal users can only view data
- Backend routes are protected using authentication middleware
- Admin-only routes are protected using role-check middleware

### Employee Management

- View all employees
- View employee details
- Add new employee
- Update employee details
- Delete employee
- Auto-generated employee ID
- Search employees by name, email, or employee ID
- Filter employees by department

### Department Management

- View all departments
- Add department
- Update department
- Delete department
- Prevents deleting a department if employees are assigned to it

### Dashboard

- Total employees count
- Total departments count
- Current user role
- Recent employees table
- Open roles section

### UI/UX

- Responsive design
- Dark/light theme toggle
- Toast notifications
- Loading overlay
- Modal-based forms
- Delete confirmation modal
- Clean dashboard layout

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend logic and API integration |
| Font Awesome | Icons |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| Sequelize | ORM for MySQL |
| MySQL | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| cors | Cross-origin request handling |

---

## Folder Structure

```text
employee-direct/
│
├── config/
│   ├── database.js
│   └── seed.js
│
├── controllers/
│   ├── authController.js
│   ├── departmentController.js
│   └── employeeController.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── Department.js
│   ├── Employee.js
│   └── User.js
│
├── public/
│   ├── app.js
│   ├── index.html
│   └── style-fixed.css
│
├── routes/
│   └── api.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## System Architecture

```text
Browser Frontend
      |
      | fetch API requests
      v
Express.js Server
      |
      v
Routes
      |
      v
Controllers
      |
      v
Sequelize Models
      |
      v
MySQL Database
```

---

## Database Design

### User Table

| Field | Description |
|---|---|
| id | Primary key |
| username | Unique username |
| email | Unique email |
| password | Hashed password |
| role | admin or user |

### Department Table

| Field | Description |
|---|---|
| id | Primary key |
| name | Unique department name |
| description | Department description |

### Employee Table

| Field | Description |
|---|---|
| id | Primary key |
| employeeId | Auto-generated employee ID |
| name | Employee name |
| email | Unique employee email |
| departmentId | Foreign key linked to Department |
| salary | Employee salary |
| joinDate | Employee joining date |

### Relationship

```text
Department has many Employees
Employee belongs to one Department
```

---

## API Endpoints

Base URL:

```text
http://localhost:5002/api
```

### Authentication APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login user |
| GET | `/auth/me` | Authenticated | Get logged-in user details |

### Employee APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/employees` | Authenticated | Get all employees |
| GET | `/employees/:id` | Authenticated | Get employee by ID |
| POST | `/employees` | Admin | Create employee |
| PUT | `/employees/:id` | Admin | Update employee |
| DELETE | `/employees/:id` | Admin | Delete employee |

### Department APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/departments` | Authenticated | Get all departments |
| GET | `/departments/:id` | Authenticated | Get department by ID |
| POST | `/departments` | Admin | Create department |
| PUT | `/departments/:id` | Admin | Update department |
| DELETE | `/departments/:id` | Admin | Delete department |

---

## Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5002
DB_NAME=your_database_name
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-directory-management-system.git
```

### 2. Go to the project folder

```bash
cd employee-directory-management-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create MySQL database

Open MySQL Workbench and run:

```sql
CREATE DATABASE your_database_name;
```

### 5. Configure `.env`

Create a `.env` file and add your database credentials and JWT secret.

### 6. Start the server

```bash
node server.js
```


---

## How to Test APIs

You can test APIs using Postman or Thunder Client.

### Testing Steps

1. Register a user using:

```text
POST /api/auth/register
```

2. Login using:

```text
POST /api/auth/login
```

3. Copy the JWT token from the login response.

4. Add the token in headers:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

5. Test protected routes:

```text
GET /api/employees
GET /api/departments
```

6. Test admin routes:

```text
POST /api/employees
PUT /api/employees/:id
DELETE /api/employees/:id
```

Note: The first registered user becomes admin.



---

## Challenges Faced

While building this project, I worked on:

- Creating a clean backend folder structure
- Designing Sequelize models and relationships
- Implementing JWT authentication
- Hashing passwords securely using bcrypt
- Protecting APIs using middleware
- Implementing role-based admin access
- Connecting frontend with backend APIs
- Handling employee and department CRUD operations
- Showing clean error/success messages
- Preventing deletion of departments that have employees

---

## Future Improvements

- Add backend pagination
- Add backend search and filter APIs
- Move Open Roles from localStorage to backend database
- Add job application database storage
- Add stronger validation middleware
- Add rate limiting for login/register APIs
- Add centralized error handling
- Add Swagger API documentation
- Add unit and integration tests
- Deploy frontend and backend

---

<!-- ## Author

**Dhanjee Tiwari**

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME

Email: your.email@example.com

--- -->

## Project Status

Current Status: Active / Improving

The project currently includes authentication, protected routes, employee management, department management, dashboard, search/filter, and frontend-backend integration.

Upcoming focus:

- Backend-driven Open Roles feature
- Better validation
- Pagination
- Deployment
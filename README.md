# Employee Directory

A full-stack web application for managing employees and departments with authentication and role-based access.

## Features

- User authentication with JWT
- Role-based access (admin/viewer)
- Full CRUD operations for employees and departments
- Employee ID auto-generation (7-digit starting with 25)
- Dark/light theme toggle
- Responsive frontend

## Tech Stack

- Backend: Node.js, Express, Sequelize, MySQL
- Frontend: HTML, CSS, Vanilla JavaScript
- Authentication: JWT

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MySQL database
4. Copy `.env.example` to `.env` and configure environment variables
5. Run seed: `npm run seed`
6. Start server: `npm start`

## Database Setup

Create a MySQL database named `employee_directory`.

## Environment Variables

- PORT=5000
- DB_HOST=localhost
- DB_PORT=3306
- DB_NAME=employee_directory
- DB_USER=root
- DB_PASSWORD=your_password
- JWT_SECRET=change_this_secret
- JWT_EXPIRES_IN=8h

## Run Commands

- `npm start`: Start the server
- `npm run dev`: Start with nodemon
- `npm run seed`: Seed the database

## Demo Credentials

- Admin: admin/admin123
- Viewer: viewer/viewer123

## API Endpoints

### Auth
- POST /api/auth/login
- GET /api/auth/me

### Employees
- GET /api/employees
- GET /api/employees/:id
- POST /api/employees (admin)
- PUT /api/employees/:id (admin)
- DELETE /api/employees/:id (admin)

### Departments
- GET /api/departments
- GET /api/departments/:id
- POST /api/departments (admin)
- PUT /api/departments/:id (admin)
- DELETE /api/departments/:id (admin)

## Troubleshooting

- Ensure MySQL is running
- Check .env configuration
- Run seed after database setup
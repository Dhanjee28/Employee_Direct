const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

// Import models
const UserModel = require('../models/User');
const DepartmentModel = require('../models/Department');
const EmployeeModel = require('../models/Employee');

// Initialize models
const User = UserModel(sequelize);
const Department = DepartmentModel(sequelize);
const Employee = EmployeeModel(sequelize);

// Associations
Department.hasMany(Employee, { foreignKey: 'departmentId' });
Employee.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = { sequelize, User, Department, Employee };
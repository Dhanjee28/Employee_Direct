const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Employee = sequelize.define(
    'Employee',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
      salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      joinDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeValidate: async (employee) => {
          if (!employee.employeeId) {
           const joinYear = new Date(employee.joinDate).getFullYear();const randomNum = Math.floor(1000 + Math.random() * 9000);employee.employeeId = `EMP-${joinYear}-${randomNum}`;
          }
        }
      }
    }
  );

  return Employee;
};
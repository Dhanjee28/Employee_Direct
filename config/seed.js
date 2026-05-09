
require('dotenv').config();
const { sequelize, Department, Employee } = require('./database');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const dept1 = await Department.create({
      name: 'Engineering',
      description: 'Software development',
    });

    const dept2 = await Department.create({
      name: 'HR',
      description: 'Human resources',
    });

    const dept3 = await Department.create({
      name: 'Finance',
      description: 'Financial operations',
    });

    await Employee.create({
      name: 'John Doe',
      email: 'john@example.com',
      departmentId: dept1.id,
      salary: 75000,
      joinDate: new Date('2020-01-15'),
    });

    await Employee.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      departmentId: dept2.id,
      salary: 65000,
      joinDate: new Date('2019-05-20'),
    });

    console.log('Seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
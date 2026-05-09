const { Employee, Department } = require('../config/database');

class EmployeeController {
  async getAll(req, res) {
    try {
      const employees = await Employee.findAll({
        include: [{ model: Department, attributes: ['id', 'name'] }],
        order: [['id', 'ASC']],
      });

      res.json({ success: true, data: employees });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id, {
        include: [{ model: Department, attributes: ['id', 'name'] }],
      });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }

      res.json({ success: true, data: employee });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async create(req, res) {
    try {
      const { name, email, departmentId, salary, joinDate } = req.body;

      if (!name || !email || !departmentId || !salary || !joinDate) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      const department = await Department.findByPk(departmentId);
      if (!department) {
        return res.status(400).json({
          success: false,
          message: 'Department not found',
        });
      }

      const employee = await Employee.create({
        name,
        email,
        departmentId,
        salary,
        joinDate,
      });

      res.status(201).json({ success: true, data: employee });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }

      const { name, email, departmentId, salary, joinDate } = req.body;

      if (departmentId) {
        const department = await Department.findByPk(departmentId);
        if (!department) {
          return res.status(400).json({
            success: false,
            message: 'Department not found',
          });
        }
      }

      await employee.update({
        name: name ?? employee.name,
        email: email ?? employee.email,
        departmentId: departmentId ?? employee.departmentId,
        salary: salary ?? employee.salary,
        joinDate: joinDate ?? employee.joinDate,
      });

      const updatedEmployee = await Employee.findByPk(employee.id, {
        include: [{ model: Department, attributes: ['id', 'name'] }],
      });

      res.json({ success: true, data: updatedEmployee });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }

      await employee.destroy();

      res.json({ success: true, message: 'Employee deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new EmployeeController();
const { Department, Employee } = require('../config/database');

class DepartmentController {
  async getAll(req, res) {
    try {
      const departments = await Department.findAll({
        order: [['id', 'ASC']],
      });

      res.json({ success: true, data: departments });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found',
        });
      }

      res.json({ success: true, data: department });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async create(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Department name is required',
        });
      }

      const department = await Department.create({ name, description });

      res.status(201).json({ success: true, data: department });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found',
        });
      }

      const { name, description } = req.body;

      await department.update({
        name: name ?? department.name,
        description: description ?? department.description,
      });

      res.json({ success: true, data: department });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found',
        });
      }

      const employeeCount = await Employee.count({
        where: { departmentId: req.params.id },
      });

      if (employeeCount > 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete department with employees',
        });
      }

      await department.destroy();

      res.json({ success: true, message: 'Department deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new DepartmentController();
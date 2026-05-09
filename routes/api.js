const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const authController = require('../controllers/authController');
const employeeController = require('../controllers/employeeController');
const departmentController = require('../controllers/departmentController');

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authenticateToken, authController.me);

// Employee routes
router.get('/employees', authenticateToken, employeeController.getAll);
router.get('/employees/:id', authenticateToken, employeeController.getById);
router.post('/employees', authenticateToken, requireAdmin, employeeController.create);
router.put('/employees/:id', authenticateToken, requireAdmin, employeeController.update);
router.delete('/employees/:id', authenticateToken, requireAdmin, employeeController.delete);

// Department routes
router.get('/departments', authenticateToken, departmentController.getAll);
router.get('/departments/:id', authenticateToken, departmentController.getById);
router.post('/departments', authenticateToken, requireAdmin, departmentController.create);
router.put('/departments/:id', authenticateToken, requireAdmin, departmentController.update);
router.delete('/departments/:id', authenticateToken, requireAdmin, departmentController.delete);

module.exports = router;
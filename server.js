require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database sync error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
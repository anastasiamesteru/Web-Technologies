const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./configuration/database');  

// Import routes
const bugRoutes = require('./routes/bugRoutes');
const testerRoutes = require('./routes/testerRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');
const projectRoutes = require('./routes/projectRoute');
const teamRoutes = require('./routes/teamRoute');

// Initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

// Use routes
app.use('/models/bugs', bugRoutes);
app.use('/models/testers', testerRoutes);
app.use('/models/team-members', teamMemberRoutes);
app.use('/models/projects', projectRoutes);
app.use('/models/teams', teamRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

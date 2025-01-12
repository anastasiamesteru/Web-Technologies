import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';  

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello!');
});

import bugRoute from './routes/bugRoute.js';
import projectRoute from './routes/projectRoute.js';
import teamRoute from './routes/teamRoute.js';
import accountRoutes from './routes/accountsRoute.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

//  routes
app.use('/models/bugs', bugRoute);
app.use('/models/projects', projectRoute);
app.use('/models/teams', teamRoute);
app.use('/accounts', accountRoutes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

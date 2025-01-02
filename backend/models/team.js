import { Sequelize } from 'sequelize';
import db from '../configuration/database.js';
import teamMember from './teammember.js';

const team = db.define('Team', {
    teamId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   projectId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'project', 
            key: 'projectId',
        },
    },
    tstId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'tester', 
            key: 'tstId',
        },
    },
    tmId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'teammember', 
            key: 'tmId',
        },
    },
});

export default team;


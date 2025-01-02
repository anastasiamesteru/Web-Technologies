import { Sequelize } from 'sequelize';
import db from '../configuration/database.js';

const tester = db.define('Tester', {
    tstId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export default tester;

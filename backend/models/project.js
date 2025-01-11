import { Sequelize } from 'sequelize';
import db from '../configuration/database.js';
import team from '../models/team.js'

const project = db.define('Project', {
    projectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    repositoryURL: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    teamId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'team', 
            key: 'teamId',
        },
    },
});

export default project;

// Create a new project
export async function createProject(projectData) {
    try {
        const project = await Project.create(projectData);
        return project;
    } catch (error) {
        throw new Error('Error creating project: ' + error.message);
    }
}

// Get project by Id
export async function getProjectById(id) {
    try {
        const project = await Project.findByPk(id, {
            include: {
                model: Team,
                attributes: ['teamId', 'name'], // Includef team details
            },
        });
        if (!project) throw new Error('Project not found');
        return project;
    } catch (error) {
        throw new Error('Error fetching project: ' + error.message);
    }
}

// Delete a project by Id
export async function deleteProjectById(id) {
    try {
        const project = await getProjectById(id);
        await project.destroy();
        return { message: 'Project successfully deleted' };
    } catch (error) {
        throw new Error('Error deleting project: ' + error.message);
    }
}


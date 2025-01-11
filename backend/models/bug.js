import { Sequelize } from 'sequelize';
import db from '../configuration/database.js';

// Define the Bug model
const Bug = db.define('Bug', {
    bugId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    severity: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['Low', 'Medium', 'High']],
        },
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['In Progress', 'Resolved']],
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    commitLink: {
        type: Sequelize.STRING,
        allowNull: true,
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
        allowNull: true,
        references: {
            model: 'teammember', 
            key: 'tmId',
        },
    },
});

// Export the model
export default Bug;

// Helper function to get a bug by ID
export async function getBugById(id) {
    try {
        const bugRecord = await Bug.findByPk(id);
        if (!bugRecord) {
            throw new Error('Bug not found');
        }
        return bugRecord;
    } catch (error) {
        throw new Error(`Error fetching bug by ID: ${error.message}`);
    }
}

// Function to set the status of a bug to 'Resolved'
export async function setBugStatusToResolved(id) {
    try {
        const bug = await getBugById(id);
        bug.status = 'Resolved';
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

// Function to set the status of a bug to 'In Progress'
export async function setBugStatusToInProgress(id) {
    try {
        const bug = await getBugById(id);
        bug.status = 'In Progress';
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

// Function to set the severity of a bug to 'Low'
export async function setBugSeverityToLow(id) {
    try {
        const bug = await getBugById(id);
        bug.severity = 'Low'; 
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

// Function to set the severity of a bug to 'Medium'
export async function setBugSeverityToMedium(id) {
    try {
        const bug = await getBugById(id);
        bug.severity = 'Medium';
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

// Function to set the severity of a bug to 'High'
export async function setBugSeverityToHigh(id) {
    try {
        const bug = await getBugById(id);
        bug.severity = 'High';
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

// Create a new bug
export async function createBug(bugData) {
    try {
        const bug = await Bug.create(bugData);
        return bug;
    } catch (error) {
        throw new Error('Error creating bug: ' + error.message);
    }
}

// Assign a tester to a bug
export async function assignTesterToBug(bugId, tstId) {
    try {
        const bug = await getBugById(bugId);
        bug.tstId = tstId;
        return await bug.save();
    } catch (error) {
        throw new Error('Error assigning tester to bug: ' + error.message);
    }
}

// Assign a team member to a bug
export async function assignTeamMemberToBug(bugId, tmId) {
    try {
        const bug = await getBugById(bugId);
        bug.tmId = tmId;
        return await bug.save();
    } catch (error) {
        throw new Error('Error assigning team member to bug: ' + error.message);
    }
}

// Get all bugs assigned to a specific tester
export async function getBugsByTester(tstId) {
    try {
        const bugs = await Bug.findAll({ where: { tstId } });
        return bugs;
    } catch (error) {
        throw new Error('Error fetching bugs by tester: ' + error.message);
    }
}

// Get all bugs assigned to a specific team member
export async function getBugsByTeamMember(tmId) {
    try {
        const bugs = await Bug.findAll({ where: { tmId } });
        return bugs;
    } catch (error) {
        throw new Error('Error fetching bugs by team member: ' + error.message);
    }
}

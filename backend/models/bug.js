import { Sequelize } from 'sequelize';
import db from '../configuration/database.js';

const bug = db.define('Bug', {
    bugId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    severity: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    commitLink: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Open',
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

export default bug;

export async function getBugById(id) {
    try {
        const bugRecord = await bug.findByPk(id);
        if (!bugRecord) {
            throw new Error('Bug not found');
        }
        return bugRecord;
    } catch (error) {
        throw new Error(`Error fetching bug by ID: ${error.message}`);
    }
}

// to set the status of a bug
export async function setBugStatusToResolved(id) {
    try {
        const bug = await getBugById(id);
        bug.status = 'Resolved';
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

export async function setBugStatusToInProgress(id) {
    try {
        const bug = await getBugById(id);
        bug.status = 'In Progress';
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

// to set the severity of a bug
export async function setBugSeverityToLow(id) {
    try {
        const bug = await getBugById(id);
        bug.severity = 'Low'; 
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

export async function setBugSeverityToMedium(id) {
    try {
        const bug = await getBugById(id);
        bug.severity = 'Medium';
        return await bug.save();
    } catch (e) {
        throw e;
    }
}

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

// Get a bug by Id
export async function getBugById(id) {
    try {
        const bug = await Bug.findByPk(id);
        if (!bug) throw new Error('Bug not found');
        return bug;
    } catch (error) {
        throw new Error('Error fetching bug: ' + error.message);
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

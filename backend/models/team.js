import { Sequelize } from 'sequelize';
import db from '../configuration/database.js';
import teamMember from './teammember.js';
import tester from './tester.js';

//i considered a team to be made up of tms and testers 
//to avoid the many to many relationships and to simplify the logic
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

// Create a new team
export async function createTeam(teamData) {
    try {
        const team = await Team.create(teamData);
        return team;
    } catch (error) {
        throw new Error('Error creating team: ' + error.message);
    }
}

// Assign testers to a team
export async function assignTestersToTeam(teamId, testers) {
    try {
        const assignments = [];
        for (const tstId of testers) {
            const assignment = await Team.create({
                teamId: teamId,
                tstId: tstId,
            });
            assignments.push(assignment);
        }
        return assignments;
    } catch (error) {
        throw new Error('Error assigning testers to team: ' + error.message);
    }
}

// Assign team members to a team
export async function assignTeamMembersToTeam(teamId, teamMembers) {
    try {
        const assignments = [];
        for (const tmId of teamMembers) {
            const assignment = await Team.create({
                teamId: teamId,
                tmId: tmId,
            });
            assignments.push(assignment);
        }
        return assignments;
    } catch (error) {
        throw new Error('Error assigning team members to team: ' + error.message);
    }
}

// Assign a project to a team
export async function assignProjectToTeam(teamId, projectId) {
    try {
        const team = await Team.findByPk(teamId);
        if (!team) {
            throw new Error('Team not found');
        }

        team.projectId = projectId;
        await team.save();
        return team;
    } catch (error) {
        throw new Error('Error assigning project to team: ' + error.message);
    }
}

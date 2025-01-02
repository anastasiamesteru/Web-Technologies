import express from 'express';
import {
    createTeam,
    assignTestersToTeam,
    assignTeamMembersToTeam,
    assignProjectToTeam
} from '../models/team.js';

const teamRoute = express.Router();

// Create a new team
teamRoute.post('/teams', async (req, res) => {
    try {
        const teamData = req.body;
        const newTeam = await createTeam(teamData);
        res.status(201).json(newTeam);  
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
});

// Assign testers to a team
teamRoute.post('/teams/:teamId/testers', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { testers } = req.body;
        const assignments = await assignTestersToTeam(teamId, testers);
        res.status(200).json(assignments);  
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
});

// Assign team members to a team
teamRoute.post('/teams/:teamId/members', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { teamMembers } = req.body;
        const assignments = await assignTeamMembersToTeam(teamId, teamMembers);
        res.status(200).json(assignments);  
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
});

// Assign a project to a team
teamRoute.post('/teams/:teamId/project', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { projectId } = req.body;
        const updatedTeam = await assignProjectToTeam(teamId, projectId);
        res.status(200).json(updatedTeam);  
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
});

export default teamRoute;

import express from 'express';
import {
    getBugById,
    createBug,
    updateBugField,
    assignTesterToBug,
    assignTeamMemberToBug,
    getBugsByTester,
    getBugsByTeamMember,
} from '../models/bug.js';

const bugRoute = express.Router();

// Get a bug by ID
bugRoute.get('/:id', async (req, res) => {
    try {
        const bug = await getBugById(req.params.id);
        res.json(bug);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Create a new bug
bugRoute.post('/', async (req, res) => {
    try {
        const bug = await createBug(req.body);
        res.status(201).json(bug);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update bug severity
bugRoute.patch('/:id/severity', async (req, res) => {
    const { severity } = req.body;
    try {
        const updatedBug = await updateBugField(req.params.id, 'severity', severity);
        res.json(updatedBug);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update bug status
bugRoute.patch('/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        const updatedBug = await updateBugField(req.params.id, 'status', status);
        res.json(updatedBug);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Assign a tester to a bug
bugRoute.patch('/:id/assign-tester', async (req, res) => {
    const { tstId } = req.body;
    try {
        const updatedBug = await assignTesterToBug(req.params.id, tstId);
        res.json(updatedBug);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Assign a team member to a bug
bugRoute.patch('/:id/assign-teammember', async (req, res) => {
    const { tmId } = req.body;
    try {
        const updatedBug = await assignTeamMemberToBug(req.params.id, tmId);
        res.json(updatedBug);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all bugs assigned to a specific tester
bugRoute.get('/tester/:tstId', async (req, res) => {
    const { tstId } = req.params;
    const { limit, offset } = req.query;
    try {
        const bugs = await getBugsByTester(tstId, parseInt(limit) || 10, parseInt(offset) || 0);
        res.json(bugs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all bugs assigned to a specific team member
bugRoute.get('/teammember/:tmId', async (req, res) => {
    const { tmId } = req.params;
    const { limit, offset } = req.query;
    try {
        const bugs = await getBugsByTeamMember(tmId, parseInt(limit) || 10, parseInt(offset) || 0);
        res.json(bugs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default bugRoute;

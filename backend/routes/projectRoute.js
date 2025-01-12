import express from 'express';
import { createProject, getProjectById, deleteProjectById } from '../models/project.js';

const projectRoute = express.Router();

// Create new project
projectRoute.post('/projects', async (req, res) => {
    try {
        const projectData = req.body;
        const newProject = await createProject(projectData);
        res.status(201).json(newProject);  
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

// Get a project by Id
projectRoute.get('/projects/:id', async (req, res) => {
    try {
        const project = await getProjectById(req.params.id);
        res.status(200).json(project);  
    } catch (error) {
        res.status(404).json({ message: error.message });  
    }
});

// Delete a project by Id
projectRoute.delete('/projects/:id', async (req, res) => {
    try {
        const result = await deleteProjectById(req.params.id);
        res.status(200).json(result);  
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
});

export default projectRoute;

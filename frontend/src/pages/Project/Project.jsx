import React, { useState, useEffect } from 'react';
import './Project.css';

// replace with actual API endpoint
const API_URL = 'http://localhost:5000/api/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    repositoryURL: '',
    teamId: 1, // replace with actual dynamic data
  });

  // Fetch projects from the backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Add a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
  
    // Custom validation
    if (!newProject.name.trim()) {
      alert("Project name is required.");
      return;
    }
  
    if (!newProject.description.trim()) {
      alert("Description is required.");
      return;
    }
  
    if (newProject.teamId < 0) {
      alert("Team ID must be a positive number.");
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
  
      const addedProject = await response.json();
      setProjects([...projects, addedProject]);
      setNewProject({
        name: '',
        description: '',
        repositoryURL: '',
        teamId: 1, // Reset the teamId or set it dynamically
      }); // Reset the form
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };
  

  // Handle status change of a project
  const handleStatusChange = (id, status) => {
    // Assuming you will implement status change logic in your backend
    const updatedProjects = projects.map((project) =>
      project.projectId === id ? { ...project, status: status } : project
    );
    setProjects(updatedProjects);
  };

  return (
    
    <div className="projects">
      <h1>Projects Management</h1>
      {/* Form to add new project */}
      <div className="add-project">
        <h2>Add New Project</h2>
        <form onSubmit={handleAddProject}>
  <div>
    <label>Project Name: </label>
    <input
      type="text"
      name="name"
      value={newProject.name}
      onChange={handleInputChange}
    />
  </div>
  <div>
    <label>Description:</label>
    <textarea
      name="description"
      value={newProject.description}
      onChange={handleInputChange}
    />
  </div>
  <div>
    <label>Repository URL: </label>
    <input
      type="text"
      name="repositoryURL"
      value={newProject.repositoryURL}
      onChange={handleInputChange}
    />
  </div>
  <div>
    <label>Team ID: </label>
    <input
      type="number"
      name="teamId"
      value={newProject.teamId}
      onChange={handleInputChange}
      min="0"
    />
  </div>
  <button type="submit">Add Project</button>
</form>

      </div>
      {/* Displaying the projects list */}
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.projectId} className="project-item">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>Repository: {project.repositoryURL}</p>
            {/* Add status handling logic if needed */}
            <p>Status: {project.status || 'Active'}</p>
            <button onClick={() => handleStatusChange(project.projectId, project.status === 'Active' ? 'Completed' : 'Active')}>
              {project.status === 'Active' ? 'Mark as Completed' : 'Activate Project'}
            </button>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default Projects;

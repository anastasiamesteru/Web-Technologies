import { useState, useEffect } from 'react';
import './Project.css';

const API_URL = 'http://localhost:5000/api/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    repositoryURL: '',
    teamId: 1,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching projects');
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
  
    if (!newProject.name.trim() || !newProject.description.trim() || newProject.teamId < 0) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    const optimisticProjects = [...projects, { ...newProject, projectId: Date.now() }];

    setProjects(optimisticProjects);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const addedProject = await response.json();
      setProjects([...projects, addedProject]);
      setNewProject({
        name: '',
        description: '',
        repositoryURL: '',
        teamId: 1, 
      });
    } catch (error) {
      console.error('Error adding project:', error);
      setProjects(projects);  // Rollback optimistic update
      setError('Error adding project');
    }
  };

  const handleStatusChange = async (id, status) => {
    const updatedProjects = projects.map((project) =>
      project.projectId === id ? { ...project, status: status } : project
    );
    setProjects(updatedProjects);

    // Assume you have an API endpoint to update the status
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      setError('Error updating project status');
      // Rollback optimistic update
      setProjects(projects);
    }
  };

  return (
    <div className="projects">
      <h1>Projects Management</h1>
      {error && <p className="error">{error}</p>}
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
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.projectId} className="project-item">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>Repository: {project.repositoryURL}</p>
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

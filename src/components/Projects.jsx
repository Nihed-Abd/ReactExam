import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projects');
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des projets');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    
    if (statusFilter) {
      result = result.filter(project => project.status === statusFilter);
    }
    
    if (priorityFilter) {
      result = result.filter(project => project.priority === priorityFilter);
    }
    
    setFilteredProjects(result);
  }, [statusFilter, priorityFilter, projects]);

  const handleDelete = async (id, e) => {
    // Stop event propagation to prevent navigation
    e.stopPropagation();
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`);
        setProjects(projects.filter(project => project.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression du projet');
      }
    }
  };

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="projects-container">
      <h2>Liste des Projets</h2>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select 
            id="status" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tous</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
            <option value="en retard">En retard</option>
            <option value="archivé">Archivé</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="priority">Priorité:</label>
          <select 
            id="priority" 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">Toutes</option>
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="no-results">Aucun projet ne correspond aux critères de recherche</div>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Status</th>
              <th>Priorité</th>
              <th>Date Limite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project.id}>
                <td>
                  <Link to={`/projects/${project.id}`} className="project-link">{project.name}</Link>
                </td>
                <td>{project.status}</td>
                <td>{project.priority}</td>
                <td>{new Date(project.deadline).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="delete-btn" 
                    onClick={(e) => handleDelete(project.id, e)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Projects;

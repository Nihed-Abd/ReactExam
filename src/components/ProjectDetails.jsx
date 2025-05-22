import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Projet non trouvé');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Countdown timer effect
  useEffect(() => {
    if (!project) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const deadline = new Date(project.deadline);
      const timeDiff = deadline - now;

      // If deadline is passed
      if (timeDiff < 0) {
        const daysPassed = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
        setTimeRemaining(`Deadline dépassée depuis ${daysPassed} jour${daysPassed > 1 ? 's' : ''}`);
        return;
      }

      // Calculate remaining time
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(`${days} jour${days > 1 ? 's' : ''}, ${hours} heure${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''} restants`);
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every minute
    const intervalId = setInterval(calculateTimeRemaining, 60000);

    return () => clearInterval(intervalId);
  }, [project]);

  const handleBack = () => {
    navigate('/projects');
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`);
        navigate('/projects');
      } catch (err) {
        alert('Erreur lors de la suppression du projet');
      }
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="not-found">Not Found</div>;
  if (!project) return <div className="not-found">Not Found</div>;

  return (
    <div className="project-details-container">
      <h2>Détails du Projet</h2>
      
      <div className="project-card">
        <h3>{project.name}</h3>
        
        <div className="project-info">
          <div className="info-item">
            <span className="label">Status:</span>
            <span className="value">
              {project.status}
            </span>
          </div>
          
          <div className="info-item">
            <span className="label">Priorité:</span>
            <span className="value">
              {project.priority}
            </span>
          </div>
          
          <div className="info-item">
            <span className="label">Date Limite:</span>
            <span className="value">
              {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>
          
          <div className="info-item">
            <span className="label">Temps:</span>
            <span className={`value countdown ${timeRemaining.includes('dépassée') ? 'overdue' : ''}`}>
              {timeRemaining}
            </span>
          </div>
        </div>

        <div className="project-actions">
          <button className="delete-btn" onClick={handleDelete}>
            Supprimer
          </button>
          <button className="back-btn" onClick={handleBack}>
            Retour à la liste
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;

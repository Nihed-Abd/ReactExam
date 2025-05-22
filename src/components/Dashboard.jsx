import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDashboardStore from '../store/dashboardStore';

function Dashboard() {
  const { projects, fetchProjects } = useDashboardStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enCours: 0,
    termine: 0,
    enRetard: 0,
    archive: 0,
    projectsThisMonth: 0,
    lateProjectsThisMonth: 0
  });
  const [hasLateProjects, setHasLateProjects] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await fetchProjects();
      setLoading(false);
    };
    loadData();
  }, [fetchProjects]);

  useEffect(() => {
    if (projects.length > 0) {
      // Get current date information
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      // Calculate stats
      const enCours = projects.filter(p => p.status === 'en cours').length;
      const termine = projects.filter(p => p.status === 'terminé').length;
      const enRetard = projects.filter(p => p.status === 'en retard').length;
      const archive = projects.filter(p => p.status === 'archivé').length;
      
      // Check for late projects with passed deadlines
      const lateProjects = projects.filter(p => {
        const deadline = new Date(p.deadline);
        return p.status === 'en retard' && deadline < today;
      });
      
      // Projects created this month
      const projectsThisMonth = projects.filter(p => {
        // Note: This is a simplification as we don't have a creation date in our data model
        // In a real app, you would check the creation date instead
        const deadline = new Date(p.deadline);
        return deadline.getMonth() === currentMonth && deadline.getFullYear() === currentYear;
      }).length;
      
      // Late projects with passed deadlines this month
      const lateProjectsThisMonth = lateProjects.filter(p => {
        const deadline = new Date(p.deadline);
        return deadline.getMonth() === currentMonth && deadline.getFullYear() === currentYear;
      }).length;

      setStats({
        enCours,
        termine,
        enRetard,
        archive,
        projectsThisMonth,
        lateProjectsThisMonth
      });
      
      setHasLateProjects(lateProjects.length > 0);
    }
  }, [projects]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="dashboard-container">
      <h2>Tableau de Bord</h2>
      
      {hasLateProjects && (
        <div className="alert alert-danger">
          <strong>Attention :</strong> Un ou plusieurs projets sont en retard et dépassent la deadline !
        </div>
      )}
      
      <h3>Statistiques par Status</h3>
      <div className="stats-container">
        <div className="stat-card">
          <h4>En Cours</h4>
          <p>{stats.enCours}</p>
        </div>
        
        <div className="stat-card">
          <h4>Terminés</h4>
          <p>{stats.termine}</p>
        </div>
        
        <div className="stat-card">
          <h4>En Retard</h4>
          <p>{stats.enRetard}</p>
        </div>
        
        <div className="stat-card">
          <h4>Archivés</h4>
          <p>{stats.archive}</p>
        </div>
      </div>
      
      <h3>Statistiques du Mois</h3>
      <div className="stats-container">
        <div className="stat-card">
          <h4>Projets ce mois-ci</h4>
          <p>{stats.projectsThisMonth}</p>
        </div>
        
        <div className="stat-card">
          <h4>Projets en retard ce mois-ci</h4>
          <p>{stats.lateProjectsThisMonth}</p>
        </div>
      </div>
      
      <h3>Projets Récents</h3>
      {projects.length === 0 ? (
        <p>Aucun projet disponible</p>
      ) : (
        <div className="recent-projects">
          {projects.slice(0, 3).map(project => (
            <div key={project.id} className="project-card">
              <h4>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h4>
              <div className="project-card-details">
                <span>Status: {project.status}</span>
                <span>Priorité: {project.priority}</span>
                <span>Échéance: {new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          <div className="view-all">
            <Link to="/projects">Voir tous les projets</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

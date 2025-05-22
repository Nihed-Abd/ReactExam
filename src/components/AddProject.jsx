import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

// Define validation schema with Zod
const projectSchema = z.object({
  name: z.string()
    .min(3, { message: 'Le nom doit contenir au moins 3 caractères' })
    .regex(/^[A-Z].*/, { message: 'Le nom doit commencer par une majuscule' }),
  status: z.string(),
  priority: z.string(),
  deadline: z.string().min(1, { message: 'La date limite est requise' })
});

function AddProject() {
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      status: 'en cours',
      priority: 'moyenne',
      deadline: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/projects', data);
      navigate('/projects');
    } catch (err) {
      console.error('Erreur lors de l\'ajout du projet:', err);
      alert('Erreur lors de l\'ajout du projet');
    }
  };

  return (
    <div className="add-project-container">
      <h2>Ajouter un Nouveau Projet</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Nom du Projet*</label>
          <input
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <p className="error-text">{errors.name.message}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            {...register('status')}
          >
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
            <option value="en retard">En retard</option>
            <option value="archivé">Archivé</option>
          </select>
          {errors.status && (
            <p className="error-text">{errors.status.message}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priorité</label>
          <select
            id="priority"
            {...register('priority')}
          >
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
          {errors.priority && (
            <p className="error-text">{errors.priority.message}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="deadline">Date Limite*</label>
          <input
            type="date"
            id="deadline"
            {...register('deadline')}
          />
          {errors.deadline && (
            <p className="error-text">{errors.deadline.message}</p>
          )}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">Ajouter le Projet</button>
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={() => navigate('/projects')}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;

import { create } from 'zustand';
import axios from 'axios';

const useDashboardStore = create((set) => ({
  projects: [],
  fetchProjects: async () => {
    try {
      const response = await axios.get('http://localhost:3000/projects');
      set({ projects: response.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
}));

export default useDashboardStore;

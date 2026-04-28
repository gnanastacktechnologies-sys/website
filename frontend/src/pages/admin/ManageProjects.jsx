import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import ProjectForm from '../../components/admin/ProjectForm';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiEye, HiEyeOff, HiCollection } from 'react-icons/hi';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await adminService.getProjects();
      setProjects(response.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingProject) {
        await adminService.updateProject(editingProject._id, data);
        toast.success('Project updated');
      } else {
        await adminService.createProject(data);
        toast.success('Project created');
      }
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project sample?')) {
      try {
        await adminService.deleteProject(id);
        toast.success('Project deleted');
        fetchProjects();
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  const toggleActive = async (project) => {
    try {
      await adminService.updateProject(project._id, { isActive: !project.isActive });
      toast.success(`Project ${!project.isActive ? 'activated' : 'deactivated'}`);
      fetchProjects();
    } catch {
      toast.error('Status update failed');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
          <p className="text-muted">Control the project samples displayed on your portfolio.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => { setShowForm(true); setEditingProject(null); }}
            className="btn-primary flex items-center gap-2"
          >
            <HiPlus /> Add Project
          </button>
        )}
      </div>

      {showForm && (
        <ProjectForm 
          initialData={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingProject(null); }}
          loading={formLoading}
        />
      )}

      <div className="grid gap-6">
        {projects.length === 0 ? (
          <div className="glass-card p-12 text-center border-dashed border-white/10">
            <HiCollection className="text-5xl text-muted/30 mx-auto mb-4" />
            <p className="text-muted">No projects found. Add your first project to showcase your work!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className={`glass-card p-6 flex flex-col md:flex-row items-center gap-6 border-white/5 ${!project.isActive && 'opacity-60'}`}>
              <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center text-3xl text-emerald shrink-0">
                 <HiCollection />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <div className="flex items-center gap-3 justify-center md:justify-start">
                   <h3 className="text-xl font-bold text-white">{project.title}</h3>
                   {!project.isActive && <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase rounded">Hidden</span>}
                 </div>
                 <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-indigo font-bold uppercase">{project.type}</span>
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-muted">{tech}</span>
                    ))}
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleActive(project)}
                  className={`p-3 rounded-xl transition-all ${project.isActive ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white' : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/10 hover:text-white'}`}
                  title={project.isActive ? 'Hide Project' : 'Show Project'}
                >
                  {project.isActive ? <HiEye /> : <HiEyeOff />}
                </button>
                <button 
                  onClick={() => { setEditingProject(project); setShowForm(true); }}
                  className="p-3 bg-white/5 text-muted rounded-xl hover:bg-indigo hover:text-white transition-all"
                  title="Edit Project"
                >
                  <HiPencil />
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="p-3 bg-white/5 text-muted rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                  title="Delete Project"
                >
                  <HiTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProjects;

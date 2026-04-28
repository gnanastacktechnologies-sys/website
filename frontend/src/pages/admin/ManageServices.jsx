import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiEye, HiEyeOff, HiChip } from 'react-icons/hi';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    icon: 'HiCode',
    order: 0,
    isActive: true,
  });

  const fetchServices = useCallback(async () => {
    try {
      const data = await adminService.getServices();
      setServices(data.data);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const openCreate = () => {
    setEditingService(null);
    setFormData({ title: '', icon: 'HiCode', order: 0, isActive: true });
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      icon: service.icon || 'HiCode',
      order: service.order ?? 0,
      isActive: service.isActive ?? true,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingService) {
        await adminService.updateService(editingService._id, formData);
        toast.success('Service updated');
      } else {
        await adminService.createService(formData);
        toast.success('Service created');
      }
      setShowForm(false);
      setEditingService(null);
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await adminService.deleteService(id);
      toast.success('Service deleted');
      fetchServices();
    } catch {
      toast.error('Delete failed');
    }
  };

  const toggleActive = async (service) => {
    try {
      await adminService.updateService(service._id, { isActive: !service.isActive });
      toast.success(`Service ${!service.isActive ? 'activated' : 'deactivated'}`);
      fetchServices();
    } catch {
      toast.error('Status update failed');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Services</h1>
          <p className="text-muted">Add, edit, hide, or delete service items.</p>
        </div>
        {!showForm && (
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <HiPlus /> Add Service
          </button>
        )}
      </div>

      {showForm && (
        <div className="glass-card p-8 border-indigo/20">
          <h3 className="text-xl font-bold text-white mb-6">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">Service Title</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo"
                  placeholder="e.g. React Frontend Development"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">Icon Key</label>
                <input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo"
                  placeholder="e.g. HiCode"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value || '0', 10) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo"
                />
              </div>
              <div className="flex items-center gap-3 pt-8">
                <input
                  type="checkbox"
                  id="service-active"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-indigo focus:ring-indigo"
                />
                <label htmlFor="service-active" className="text-sm font-medium text-white">Active / Visible</label>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                }}
                className="px-6 py-2 rounded-lg text-muted hover:text-white transition-all"
              >
                Cancel
              </button>
              <button disabled={formLoading} type="submit" className="btn-primary px-8">
                {formLoading ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {services.map((service) => (
          <div key={service._id} className={`glass-card p-6 flex flex-col md:flex-row items-center gap-6 border-white/5 ${!service.isActive && 'opacity-60'}`}>
            <div className="w-16 h-16 rounded-2xl bg-indigo/10 flex items-center justify-center text-3xl text-indigo shrink-0">
              <HiChip />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                {!service.isActive && (
                  <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase rounded">Hidden</span>
                )}
              </div>
              <p className="text-muted text-xs mt-1">Icon: {service.icon || 'HiCode'} | Order: {service.order ?? 0}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleActive(service)}
                className={`p-3 rounded-xl transition-all ${service.isActive ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white' : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'}`}
                title={service.isActive ? 'Hide Service' : 'Show Service'}
              >
                {service.isActive ? <HiEye /> : <HiEyeOff />}
              </button>
              <button
                onClick={() => openEdit(service)}
                className="p-3 bg-white/5 text-muted rounded-xl hover:bg-indigo hover:text-white transition-all"
                title="Edit Service"
              >
                <HiPencil />
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="p-3 bg-white/5 text-muted rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                title="Delete Service"
              >
                <HiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;

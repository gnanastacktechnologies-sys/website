import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { adminService } from '../../services/adminService';
import toast from 'react-hot-toast';

const ProjectForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    techStack: '',
    description: '',
    imageUrl: '',
    sampleImages: [],
    order: 0,
    isActive: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sampleHeading, setSampleHeading] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        techStack: Array.isArray(initialData.techStack) ? initialData.techStack.join(', ') : initialData.techStack,
        sampleImages: Array.isArray(initialData.sampleImages)
          ? initialData.sampleImages.map((item) =>
              typeof item === 'string' ? { heading: '', url: item } : { heading: item.heading || '', url: item.url || '' }
            ).filter((item) => item.url)
          : []
      });
    }
  }, [initialData]);

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error('Please choose an image first');
      return;
    }

    setUploadingImage(true);
    try {
      const response = await adminService.uploadProjectImage(imageFile);
      setFormData((prev) => ({ ...prev, imageUrl: response.data.imageUrl }));
      toast.success('Project image uploaded');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      techStack: typeof formData.techStack === 'string' ? formData.techStack.split(',').map(s => s.trim()).filter(s => s) : formData.techStack,
      sampleImages: (formData.sampleImages || []).map((item) => ({
        heading: (item.heading || '').trim(),
        url: item.url,
      })).filter((item) => item.url)
    };
    onSubmit(dataToSubmit);
  };

  const handleAddSampleImage = async () => {
    if (!imageFile) {
      toast.error('Please choose an image first');
      return;
    }

    setUploadingImage(true);
    try {
      const response = await adminService.uploadProjectImage(imageFile);
      setFormData((prev) => ({
        ...prev,
        sampleImages: [...(prev.sampleImages || []), { heading: sampleHeading.trim(), url: response.data.imageUrl }],
      }));
      toast.success('Sample image added');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
      setImageFile(null);
      setSampleHeading('');
    }
  };

  const removeSampleImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sampleImages: (prev.sampleImages || []).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const updateSampleHeading = (index, heading) => {
    setFormData((prev) => ({
      ...prev,
      sampleImages: (prev.sampleImages || []).map((item, idx) =>
        idx === index ? { ...item, heading } : item
      ),
    }));
  };

  return (
    <div className="glass-card p-8 border-indigo/20 relative animate-in fade-in slide-in-from-top-4 duration-300">
      <button onClick={onCancel} className="absolute top-4 right-4 text-muted hover:text-white"><HiX /></button>
      <h3 className="text-xl font-bold text-white mb-6">{initialData ? 'Edit Project' : 'Add New Project'}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">Project Title</label>
            <input 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo" 
              placeholder="e.g. Online Test Portal"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">Project Type</label>
            <input 
              required
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo" 
              placeholder="e.g. EdTech / Enterprise"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Tech Stack (comma separated)</label>
          <input 
            required
            value={formData.techStack}
            onChange={(e) => setFormData({...formData, techStack: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo" 
            placeholder="e.g. React, Node.js, MongoDB"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Description</label>
          <textarea 
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo" 
            rows="3"
            placeholder="Brief description of the project..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Project Image</label>
          <div className="grid md:grid-cols-[1fr_auto] gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo"
            />
            <button
              type="button"
              disabled={uploadingImage}
              onClick={handleImageUpload}
              className="px-5 py-3 rounded-lg bg-indigo/20 text-indigo hover:bg-indigo hover:text-white transition-all disabled:opacity-50"
            >
              {uploadingImage ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <input
            value={formData.imageUrl || ''}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo"
            placeholder="Image URL will appear here after upload"
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Project preview"
              className="w-full max-w-sm h-44 object-cover rounded-lg border border-white/10"
            />
          )}
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-muted uppercase">More Sample Outputs</label>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              type="text"
              value={sampleHeading}
              onChange={(e) => setSampleHeading(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo"
              placeholder="Sample heading (e.g. Login Page Output)"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo"
            />
          </div>
          <button
            type="button"
            disabled={uploadingImage}
            onClick={handleAddSampleImage}
            className="px-5 py-3 rounded-lg bg-emerald/20 text-emerald hover:bg-emerald hover:text-white transition-all disabled:opacity-50"
          >
            {uploadingImage ? 'Uploading...' : 'Add Sample'}
          </button>
          {(formData.sampleImages || []).length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(formData.sampleImages || []).map((sample, idx) => (
                <div key={`${sample.url}-${idx}`} className="relative rounded-lg overflow-hidden border border-white/10 bg-[#0a1024]">
                  <img src={sample.url} alt={`Sample ${idx + 1}`} className="w-full h-28 object-cover" />
                  <div className="p-2">
                    <input
                      type="text"
                      value={sample.heading || ''}
                      onChange={(e) => updateSampleHeading(idx, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-indigo"
                      placeholder={`Heading for sample ${idx + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSampleImage(idx)}
                    className="absolute top-1 right-1 text-[10px] px-2 py-1 bg-rose-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">Display Order</label>
            <input 
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo" 
            />
          </div>
          <div className="flex items-center gap-3 pt-8">
            <input 
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="w-5 h-5 rounded border-white/10 bg-white/5 text-indigo focus:ring-indigo"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-white">Active / Visible</label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg text-muted hover:text-white transition-all">Cancel</button>
          <button disabled={loading} type="submit" className="btn-primary px-8">{loading ? 'Saving...' : 'Save Project'}</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

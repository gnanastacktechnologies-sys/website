import { useState } from 'react';
import { HiPlus, HiX } from 'react-icons/hi';

const ProductForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    features: '',
    isActive: true,
    order: 0,
    icon: 'HiCube'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      features: typeof formData.features === 'string' 
        ? formData.features.split(',').map(f => f.trim()).filter(f => f)
        : formData.features
    };
    onSubmit(data);
  };

  return (
    <div className="glass-card p-8 border-indigo/20 relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white">{initialData ? 'Edit Product' : 'Add New Product'}</h3>
        <button onClick={onCancel} className="text-muted hover:text-white"><HiX size={24} /></button>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Product Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Slug (URL friendly)</label>
          <input name="slug" value={formData.slug} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Short Description</label>
          <input name="shortDescription" value={formData.shortDescription} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Full Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Features (Comma separated)</label>
          <input name="features" value={formData.features} onChange={handleChange} placeholder="Feature 1, Feature 2..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase">Display Order</label>
          <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo" />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-xs font-bold text-muted uppercase">Is Active?</label>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-6 h-6 rounded bg-indigo" />
        </div>
        
        <div className="md:col-span-2 pt-4">
           <button type="submit" disabled={loading} className="btn-primary w-full py-4 font-bold uppercase tracking-widest">
             {loading ? 'Processing...' : (initialData ? 'Update Product' : 'Create Product')}
           </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

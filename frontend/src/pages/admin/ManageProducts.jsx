import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import ProductForm from '../../components/admin/ProductForm';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiEye, HiEyeOff, HiCube } from 'react-icons/hi';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await adminService.getProducts();
      setProducts(response.data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingProduct) {
        await adminService.updateProduct(editingProduct._id, data);
        toast.success('Product updated');
      } else {
        await adminService.createProduct(data);
        toast.success('Product created');
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminService.deleteProduct(id);
        toast.success('Product deleted');
        fetchProducts();
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  const toggleActive = async (product) => {
    try {
      await adminService.updateProduct(product._id, { isActive: !product.isActive });
      toast.success(`Product ${!product.isActive ? 'activated' : 'deactivated'}`);
      fetchProducts();
    } catch {
      toast.error('Status update failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Products</h1>
          <p className="text-muted">Add, edit, or remove MERN stack products.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => { setShowForm(true); setEditingProduct(null); }}
            className="btn-primary flex items-center gap-2"
          >
            <HiPlus /> Add Product
          </button>
        )}
      </div>

      {showForm && (
        <ProductForm 
          initialData={editingProduct ? { ...editingProduct, features: editingProduct.features.join(', ') } : null}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingProduct(null); }}
          loading={formLoading}
        />
      )}

      <div className="grid gap-6">
        {products.map((product) => (
          <div key={product._id} className={`glass-card p-6 flex flex-col md:flex-row items-center gap-6 border-white/5 ${!product.isActive && 'opacity-60'}`}>
            <div className="w-16 h-16 rounded-2xl bg-indigo/10 flex items-center justify-center text-3xl text-indigo shrink-0">
               <HiCube />
            </div>
            <div className="flex-1 text-center md:text-left">
               <div className="flex items-center gap-3 justify-center md:justify-start">
                 <h3 className="text-xl font-bold text-white">{product.title}</h3>
                 {!product.isActive && <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase rounded">Hidden</span>}
               </div>
               <p className="text-muted text-sm mt-1">{product.shortDescription}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleActive(product)}
                className={`p-3 rounded-xl transition-all ${product.isActive ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white' : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'}`}
                title={product.isActive ? 'Hide Product' : 'Show Product'}
              >
                {product.isActive ? <HiEye /> : <HiEyeOff />}
              </button>
              <button 
                onClick={() => { setEditingProduct(product); setShowForm(true); }}
                className="p-3 bg-white/5 text-muted rounded-xl hover:bg-indigo hover:text-white transition-all"
                title="Edit Product"
              >
                <HiPencil />
              </button>
              <button 
                onClick={() => handleDelete(product._id)}
                className="p-3 bg-white/5 text-muted rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                title="Delete Product"
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

export default ManageProducts;

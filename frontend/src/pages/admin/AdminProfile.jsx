import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';
import { HiUser, HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';

const AdminProfile = () => {
  const { user, login } = useAuth(); // We'll use login to refresh the context state
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      const dataToUpdate = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password) dataToUpdate.password = formData.password;

      const response = await authService.updateProfile(dataToUpdate);
      
      // Update local context
      login(response.data); 
      
      toast.success('Profile updated successfully');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-muted">Manage your admin profile and security credentials.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Side: Profile Info */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card p-8 border-white/5 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">Admin Name</label>
                <div className="relative">
                  <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">Email Address</label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">New Password</label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input 
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                    placeholder="Leave blank to keep current"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">Confirm Password</label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                disabled={loading}
                type="submit" 
                className="btn-primary px-10 py-3 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Quick Tips */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-white/5">
             <div className="w-12 h-12 rounded-2xl bg-indigo/10 flex items-center justify-center text-2xl text-indigo mb-4">
                <HiShieldCheck />
             </div>
             <h4 className="text-white font-bold mb-2">Security Tip</h4>
             <p className="text-xs text-muted leading-relaxed">
               Use a strong, unique password with at least 8 characters, including symbols and numbers to keep your studio data safe.
             </p>
          </div>
          
          <div className="p-6 rounded-2xl border border-dashed border-white/10">
             <h4 className="text-white font-medium text-sm mb-4">Account Status</h4>
             <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Role:</span>
                <span className="text-emerald font-bold uppercase tracking-widest">Master Admin</span>
             </div>
             <div className="flex items-center justify-between text-xs mt-3">
                <span className="text-muted">Last Login:</span>
                <span className="text-white">Today</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

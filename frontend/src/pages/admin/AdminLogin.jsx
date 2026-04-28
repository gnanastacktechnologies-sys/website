import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      if (response.success) {
        toast.success('Welcome to Admin Portal');
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      <div className="glow-circle w-[400px] h-[400px] bg-indigo/10 -top-20 -left-20" />
      <div className="glow-circle w-[400px] h-[400px] bg-electric-blue/10 -bottom-20 -right-20" />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-medium">GnanaStack Technologies</p>
        </div>

        <div className="glass-card p-8 md:p-10 border-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Admin Email</label>
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo transition-all"
                placeholder="admin@gnanastack.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white outline-none focus:border-indigo transition-all"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 px-4 text-muted hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Login to Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-xs mt-8">
          Protected Administrative Area. Authorization Required.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

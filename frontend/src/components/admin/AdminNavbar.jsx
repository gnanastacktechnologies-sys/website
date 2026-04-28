import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';
import { HiUserCircle, HiBell, HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ onToggleMobileSidebar }) => {
  const { user } = useAuth();
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (showNotifications) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showNotifications]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        setNewEnquiriesCount(response.data.newEnquiries || 0);

        const enquiriesRes = await adminService.getEnquiries();
        const recent = (enquiriesRes.data || [])
          .slice(0, 5)
          .map((e) => ({
            id: e._id,
            name: e.name,
            projectType: e.projectType,
            status: e.status,
          }));
        setRecentNotifications(recent);
      } catch (error) {
        console.error('Failed to fetch stats for notification', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 bg-[#050816]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-10 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg bg-white/5 text-white text-2xl"
        >
          <HiMenu />
        </button>
        <div className="lg:hidden">
          <span className="text-lg font-bold text-white leading-none block">GnanaStack</span>
          <span className="text-[8px] text-indigo font-bold uppercase tracking-widest">Admin</span>
        </div>
        <div className="hidden lg:block text-muted text-sm font-medium">
           Welcome back, <span className="text-white font-bold">{user?.name?.split(' ')[0]}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 text-muted hover:text-white transition-all bg-white/5 rounded-lg border border-white/5 group"
          >
           <HiBell className="text-xl" />
           {newEnquiriesCount > 0 && (
             <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#050816] animate-pulse">
               {newEnquiriesCount}
             </span>
           )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[92vw] max-w-[92vw] bg-[#0a1024] border border-white/10 rounded-xl shadow-2xl p-3 z-50 sm:absolute sm:top-auto sm:left-auto sm:translate-x-0 sm:mt-3 sm:right-0 sm:w-80 sm:max-w-[24rem]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-white">Recent Notifications</p>
                  <Link
                    to="/admin/enquiries"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-indigo hover:text-white"
                  >
                    View All
                  </Link>
                </div>
                {recentNotifications.length === 0 ? (
                  <p className="text-xs text-muted">No recent notifications.</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {recentNotifications.map((item) => (
                      <Link
                        key={item.id}
                        to="/admin/enquiries"
                        onClick={() => setShowNotifications(false)}
                        className="block rounded-lg bg-white/5 hover:bg-white/10 p-3 transition-all"
                      >
                        <p className="text-sm text-white font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted truncate">{item.projectType}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <Link to="/admin/profile" className="flex items-center gap-4 border-l border-white/10 pl-3 sm:pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">{user?.name}</p>
            <p className="text-[10px] text-muted mt-1 uppercase tracking-widest">{user?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo/20 flex items-center justify-center text-indigo text-2xl border border-indigo/20 shrink-0">
            <HiUserCircle />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AdminNavbar;

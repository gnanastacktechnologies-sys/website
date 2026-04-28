import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { HiCube, HiChip, HiCollection, HiInboxIn, HiCheckCircle } from 'react-icons/hi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="animate-pulse flex space-x-4">Loading stats...</div>;

  const statCards = [
    { title: 'Total Products', value: stats?.totalProducts, icon: <HiCube />, color: 'text-indigo', bg: 'bg-indigo/10' },
    { title: 'Active Products', value: stats?.activeProducts, icon: <HiCheckCircle />, color: 'text-emerald', bg: 'bg-emerald/10' },
    { title: 'Total Services', value: stats?.totalServices, icon: <HiChip />, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
    { title: 'Total Projects', value: stats?.totalProjects, icon: <HiCollection />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: 'Total Enquiries', value: stats?.totalEnquiries, icon: <HiInboxIn />, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { title: 'New Enquiries', value: stats?.newEnquiries, icon: <HiInboxIn />, color: 'text-indigo', bg: 'bg-indigo/10' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-muted">Real-time statistics of GnanaStack Technologies.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="glass-card p-6 border-white/5 flex items-center gap-6 group hover:border-white/10 transition-all">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-muted text-xs font-bold uppercase tracking-widest mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <div className="glass-card p-8 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <p className="text-muted text-sm italic">Coming soon: Activity logs and audit trails.</p>
        </div>
        <div className="glass-card p-8 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Site Health</h3>
          <div className="flex items-center gap-4 text-emerald text-sm font-medium">
             <div className="w-3 h-3 rounded-full bg-emerald animate-pulse" />
             API Service: Operational
          </div>
          <div className="flex items-center gap-4 text-emerald text-sm font-medium mt-4">
             <div className="w-3 h-3 rounded-full bg-emerald animate-pulse" />
             Database: Connected
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

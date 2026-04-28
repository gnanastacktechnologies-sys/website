import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import toast from 'react-hot-toast';
import { HiTrash, HiCheck, HiOutlineClock, HiMail } from 'react-icons/hi';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = useCallback(async () => {
    try {
      const data = await adminService.getEnquiries();
      setEnquiries(data.data);
    } catch {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchEnquiries();
    };
    init();
  }, [fetchEnquiries]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminService.updateEnquiryStatus(id, status);
      toast.success(`Marked as ${status}`);
      fetchEnquiries();
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await adminService.deleteEnquiry(id);
      toast.success('Enquiry deleted');
      fetchEnquiries();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="p-10 text-white">Loading enquiries...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Project Enquiries</h1>
        <p className="text-muted">Manage incoming requests from the public website.</p>
      </div>

      <div className="grid gap-6">
        {enquiries.map((enquiry) => (
          <div key={enquiry._id} className="glass-card p-8 border-white/5 relative overflow-hidden group">
            {enquiry.status === 'new' && <div className="absolute top-0 right-0 w-2 h-2 bg-indigo m-4 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.8)]" />}
            
            <div className="flex flex-col lg:flex-row justify-between gap-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-indigo text-2xl font-bold">
                        {enquiry.name.charAt(0)}
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-white">{enquiry.name}</h3>
                        <p className="text-muted text-sm">{enquiry.email} • {enquiry.phone}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <span className="px-3 py-1 bg-indigo/10 text-indigo text-[10px] font-bold uppercase rounded-full border border-indigo/20">
                        {enquiry.projectType}
                     </span>
                     <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
                       enquiry.status === 'new' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                     }`}>
                        {enquiry.status}
                     </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed max-w-2xl bg-white/5 p-4 rounded-xl border border-white/5 italic">
                    "{enquiry.message}"
                  </p>
               </div>

               <div className="flex lg:flex-col gap-3 justify-end">
                  <button 
                    onClick={() => handleUpdateStatus(enquiry._id, enquiry.status === 'new' ? 'contacted' : 'resolved')}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold"
                  >
                    <HiCheck /> {enquiry.status === 'new' ? 'Mark Contacted' : 'Mark Resolved'}
                  </button>
                  <button 
                    onClick={() => window.location.href = `mailto:${enquiry.email}`}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo/10 text-indigo rounded-xl hover:bg-indigo hover:text-white transition-all text-sm font-bold"
                  >
                    <HiMail /> Reply
                  </button>
                  <button 
                    onClick={() => handleDelete(enquiry._id)}
                    className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all text-sm font-bold"
                  >
                    <HiTrash /> Delete
                  </button>
               </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 text-[10px] text-muted uppercase tracking-[0.2em] font-medium">
               Received: {new Date(enquiry.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
        {enquiries.length === 0 && <div className="p-20 glass-card text-center text-muted">No enquiries yet.</div>}
      </div>
    </div>
  );
};

export default ManageEnquiries;

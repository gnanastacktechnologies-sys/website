import { useState, useEffect, useCallback } from 'react';
import { enquiryService } from '../services/api';
import toast from 'react-hot-toast';
import { HiTrash, HiCheck, HiOutlineClock } from 'react-icons/hi';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = useCallback(async () => {
    try {
      const data = await enquiryService.getAll();
      setEnquiries(data.enquiries);
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
      await enquiryService.updateStatus(id, status);
      toast.success(`Marked as ${status}`);
      fetchEnquiries();
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await enquiryService.delete(id);
      toast.success('Enquiry deleted');
      fetchEnquiries();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-white">Project Enquiries</h1>
          <span className="px-4 py-1 bg-indigo/10 text-indigo rounded-full text-xs font-bold uppercase tracking-widest">
            {enquiries.length} Total
          </span>
        </div>

        <div className="overflow-x-auto glass-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-6 text-xs font-bold text-muted uppercase tracking-widest">Client</th>
                <th className="p-6 text-xs font-bold text-muted uppercase tracking-widest">Project Info</th>
                <th className="p-6 text-xs font-bold text-muted uppercase tracking-widest">Message</th>
                <th className="p-6 text-xs font-bold text-muted uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-muted uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                  <td className="p-6">
                    <div className="text-white font-bold">{enquiry.name}</div>
                    <div className="text-muted text-xs mt-1">{enquiry.email}</div>
                    <div className="text-muted text-xs">{enquiry.phone}</div>
                  </td>
                  <td className="p-6">
                    <span className="px-2 py-1 bg-indigo/10 text-indigo rounded text-[10px] font-bold uppercase">
                      {enquiry.projectType}
                    </span>
                    <div className="text-muted text-[10px] mt-2 italic">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-6 max-w-xs">
                    <div className="text-muted text-sm line-clamp-2">{enquiry.message}</div>
                  </td>
                  <td className="p-6">
                    <span className={`flex items-center gap-2 text-[10px] font-bold uppercase px-2 py-1 rounded w-fit ${
                      enquiry.status === 'new' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {enquiry.status === 'new' ? <HiOutlineClock /> : <HiCheck />}
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      {enquiry.status === 'new' && (
                        <button 
                          onClick={() => handleUpdateStatus(enquiry._id, 'contacted')}
                          className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                          title="Mark as Contacted"
                        >
                          <HiCheck />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(enquiry._id)}
                        className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                        title="Delete"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-20 text-center text-muted italic">
                    No enquiries found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;

import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import toast from 'react-hot-toast';
import { HiShieldCheck, HiOutlineDocumentText, HiRefresh, HiXCircle, HiSave } from 'react-icons/hi';

const ManageLegal = ({ type }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getTitle = () => {
    switch (type) {
      case 'privacyPolicy': return 'Privacy Policy';
      case 'termsOfService': return 'Terms of Service';
      case 'refundPolicy': return 'Refund Policy';
      case 'cancellationPolicy': return 'Cancellation Policy';
      default: return 'Legal Document';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'privacyPolicy': return <HiShieldCheck />;
      case 'termsOfService': return <HiOutlineDocumentText />;
      case 'refundPolicy': return <HiRefresh />;
      case 'cancellationPolicy': return <HiXCircle />;
      default: return <HiOutlineDocumentText />;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await adminService.getLegalData();
        if (isMounted && response.success) {
          setContent(response.data[type] || '');
        }
      } catch {
        if (isMounted) toast.error('Failed to load legal data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [type]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminService.updateLegalData({ [type]: content });
      toast.success(`${getTitle()} updated successfully`);
    } catch {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-indigo">{getIcon()}</span>
            {getTitle()}
          </h1>
          <p className="text-muted">Edit the content for the {getTitle()} page.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? 'Saving...' : <><HiSave /> Save Changes</>}
        </button>
      </div>

      <div className="glass-card p-6 border-white/5 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted font-medium uppercase tracking-wider">Document Content (HTML supported)</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Enter the ${getTitle()} content here...`}
          className="w-full h-[600px] bg-primary/50 border border-white/10 rounded-xl p-6 text-white font-mono text-sm focus:ring-2 focus:ring-indigo outline-none resize-none transition-all"
        />
        <div className="text-xs text-muted italic">
          Tip: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, and &lt;li&gt; to format your policy professionally.
        </div>
      </div>
    </div>
  );
};

export default ManageLegal;

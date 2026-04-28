import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import toast from 'react-hot-toast';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    tagline: '',
    heroBadge: '',
    heroTitle: '',
    heroSubtitle: '',
    primaryCTA: '',
    secondaryCTA: '',
    aboutTitle: '',
    aboutDescription: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
    whatsappNumber: '',
    workMode: '',
    footerText: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await adminService.getSettings();
        setSettings(response.data);
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  const sections = [
    {
      title: 'Global Branding',
      fields: [
        { name: 'companyName', label: 'Company Name' },
        { name: 'tagline', label: 'Tagline' },
        { name: 'footerText', label: 'Footer Description' },
      ]
    },
    {
      title: 'Hero Section',
      fields: [
        { name: 'heroBadge', label: 'Hero Badge' },
        { name: 'heroTitle', label: 'Hero Title' },
        { name: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
        { name: 'primaryCTA', label: 'Primary CTA Text' },
        { name: 'secondaryCTA', label: 'Secondary CTA Text' },
      ]
    },
    {
      title: 'About Section',
      fields: [
        { name: 'aboutTitle', label: 'About Title' },
        { name: 'aboutDescription', label: 'About Description', type: 'textarea' },
      ]
    },
    {
      title: 'Contact Info',
      fields: [
        { name: 'contactEmail', label: 'Email Address' },
        { name: 'contactPhone', label: 'Phone Number' },
        { name: 'location', label: 'Location' },
        { name: 'whatsappNumber', label: 'WhatsApp (Phone only, e.g. 910000000000)' },
        { name: 'workMode', label: 'Work Mode (e.g. Remote-first)' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
        <p className="text-muted">Modify the core content of your public homepage.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="glass-card p-8 border-white/5">
            <h3 className="text-lg font-bold text-indigo mb-6 uppercase tracking-wider">{section.title}</h3>
            <div className="grid gap-6">
              {section.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-widest">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={settings[field.name]}
                      onChange={handleChange}
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo transition-all"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={settings[field.name]}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="sticky bottom-6">
           <button
             type="submit"
             disabled={saving}
             className="btn-primary w-full py-4 font-bold uppercase tracking-widest shadow-2xl shadow-indigo/20 disabled:opacity-50"
           >
             {saving ? 'Saving Changes...' : 'Save All Settings'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;

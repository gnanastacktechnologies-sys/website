import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker, HiChatAlt2 } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { publicService } from '../../services/publicService';
import toast from 'react-hot-toast';

const Contact = ({ settings, initialProduct, activeProducts = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const projectTypeOptions = activeProducts
    .filter((p) => p?.isActive !== false)
    .map((p) => p.title)
    .filter(Boolean);

  // Sync with initialProduct when user clicks from Products section
  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({ ...prev, projectType: initialProduct }));
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await publicService.submitEnquiry(formData);
      toast.success('Enquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: initialProduct || '',
        message: ''
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi GnanaStack Technologies, I'm interested in your projects.`;
    const phone = settings?.whatsappNumber || '910000000000';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#070b1d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Let’s Build Your <br />Digital Product</h2>
            <p className="text-muted text-lg mb-10 leading-relaxed">
              Have an idea for HRMS, test portal, digital invitation website, or custom MERN application? Contact GnanaStack Technologies and start your digital journey today.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo text-xl">
                  <HiMail />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase font-bold tracking-widest">Email Us</div>
                  <div className="text-white font-medium">{settings?.contactEmail || 'gnanastacktechnologies@gmail.com'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald text-xl">
                  <HiLocationMarker />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase font-bold tracking-widest">Location</div>
                  <div className="text-white font-medium">{settings?.location || 'Tamil Nadu, India'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center text-electric-blue text-xl">
                  <HiChatAlt2 />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase font-bold tracking-widest">Work Mode</div>
                  <div className="text-white font-medium">{settings?.workMode || 'Remote-first software studio'}</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">Email Address</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                    placeholder="john@company.com" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">Phone</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                    placeholder="+91 00000 00000" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">Project Type</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-primary text-muted">
                      {projectTypeOptions.length ? 'Select Project Type' : 'No Active Project Types'}
                    </option>
                    {projectTypeOptions.map((type) => (
                      <option key={type} value={type} className="bg-primary text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo transition-all" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button 
                  disabled={loading}
                  type="submit" 
                  className="btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                   {loading ? 'Sending...' : 'Send Message'}
                 </button>
                 <button 
                  onClick={handleWhatsApp}
                  type="button" 
                  className="px-6 py-4 rounded-full bg-green-600 hover:bg-green-700 transition-all font-medium flex items-center justify-center gap-2 text-white"
                 >
                   <FaWhatsapp className="text-xl" /> WhatsApp Us
                 </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { publicService } from '../../services/publicService';

const LegalPrivacy = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await publicService.getLegalData();
        if (res.success && res.data.privacyPolicy) {
          setContent(res.data.privacyPolicy);
        }
      } catch {
        console.error('Failed to fetch privacy policy');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const fallbackContent = `
    <section>
      <p class="text-muted text-sm mb-4">Effective Date: May 1, 2026</p>
      <h2 class="text-2xl font-bold text-white mb-4">1. Introduction</h2>
      <p class="text-muted leading-relaxed">
        GnanaStack Technologies (“we”, “our”, “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
      <p class="text-muted leading-relaxed mb-4">We may collect the following information:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Project requirements / messages</li>
        <li>Any information you provide through contact forms</li>
      </ul>
      <p class="text-muted mt-4 italic">We do not collect sensitive personal data unless explicitly required for a project.</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
      <p class="text-muted leading-relaxed mb-4">We use your information to:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Respond to enquiries</li>
        <li>Provide services</li>
        <li>Improve our website and offerings</li>
        <li>Communicate project updates</li>
        <li>Send important service-related information</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">4. Data Protection</h2>
      <p class="text-muted leading-relaxed">
        We implement reasonable security measures to protect your data. However, no method of transmission over the internet is 100% secure.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">5. Sharing of Information</h2>
      <p class="text-muted leading-relaxed mb-4">
        We do not sell, rent, or trade your personal information.
      </p>
      <p class="text-muted leading-relaxed">We may share data only:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4 mt-2">
        <li>When required by law</li>
        <li>To protect our rights</li>
        <li>With trusted services (hosting, email, etc.) only for business operations</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">6. Cookies</h2>
      <p class="text-muted leading-relaxed">
        Our website may use basic cookies to improve user experience and analytics. You can disable cookies in your browser settings.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
      <p class="text-muted leading-relaxed mb-4">We may use third-party platforms such as:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Hosting services (Vercel, Render)</li>
        <li>Database services (MongoDB Atlas)</li>
      </ul>
      <p class="text-muted mt-4">These services have their own privacy policies.</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
      <p class="text-muted leading-relaxed mb-4">You can:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Request access to your data</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent</li>
      </ul>
      <p class="mt-4 font-semibold text-indigo">Contact us for any requests.</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">9. Changes to Policy</h2>
      <p class="text-muted leading-relaxed">
        We may update this Privacy Policy at any time. Changes will be posted on this page.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
      <div class="bg-white/5 p-6 rounded-xl border border-white/10">
        <p class="text-white font-bold mb-2">GnanaStack Technologies</p>
        <p class="text-muted flex items-center gap-2 mb-2">
          <span class="text-indigo">📧</span> gnanastacktechnologies@gmail.com
        </p>
        <p class="text-muted flex items-center gap-2">
          <span class="text-indigo">🌐</span> https://website-sand-pi-96.vercel.app/
        </p>
      </div>
    </section>
  `;

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-indigo font-semibold mb-8 italic">GnanaStack Technologies — From Village Vision to Digital Innovation</p>
        
        <div className="glass-card p-8 space-y-8 border-white/5">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-white/10 rounded w-1/4"></div>
              <div className="h-8 bg-white/10 rounded w-1/2"></div>
              <div className="h-32 bg-white/10 rounded"></div>
            </div>
          ) : (
            <div 
              className="prose prose-invert max-w-none space-y-8"
              dangerouslySetInnerHTML={{ __html: content || fallbackContent }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LegalPrivacy;

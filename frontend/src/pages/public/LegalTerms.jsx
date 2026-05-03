import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { publicService } from '../../services/publicService';

const LegalTerms = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await publicService.getLegalData();
        if (res.success && res.data.termsOfService) {
          setContent(res.data.termsOfService);
        }
      } catch {
        console.error('Failed to fetch terms of service');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const fallbackContent = `
    <section>
      <p class="text-muted text-sm mb-4">Effective Date: May 1, 2026</p>
      <h2 class="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
      <p class="text-muted leading-relaxed">
        By accessing or using our website and services, you agree to these Terms of Service.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">2. Services</h2>
      <p class="text-muted leading-relaxed mb-4">GnanaStack Technologies provides:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>HRMS solutions</li>
        <li>Online test portals</li>
        <li>Digital invitation websites</li>
        <li>Custom MERN stack web applications</li>
      </ul>
      <p class="text-muted mt-4">All services are subject to project scope and agreement.</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">3. Client Responsibilities</h2>
      <p class="text-muted leading-relaxed mb-4">Clients agree to:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Provide accurate project requirements</li>
        <li>Share necessary content and information</li>
        <li>Make timely payments</li>
        <li>Communicate clearly during project development</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">4. Payments</h2>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Pricing will be agreed before project start</li>
        <li>Payments may be one-time or subscription-based</li>
        <li>Advance payment may be required</li>
        <li>Delays in payment may delay project delivery</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">5. Project Delivery</h2>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Timelines depend on project scope</li>
        <li>Changes in requirements may affect delivery time</li>
        <li>Minor revisions are included; major changes may cost extra</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>After full payment, the client owns the final product (unless otherwise agreed)</li>
        <li>GnanaStack Technologies may showcase work in portfolio</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">7. Hosting & Maintenance</h2>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Hosting may use third-party platforms (Vercel, Render, MongoDB)</li>
        <li>Free hosting may have limitations (e.g., server sleep)</li>
        <li>Maintenance services are separate and optional</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
      <p class="text-muted mb-4">We are not liable for:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Data loss due to third-party services</li>
        <li>Downtime caused by hosting providers</li>
        <li>Misuse of software by clients</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">9. Termination</h2>
      <p class="text-muted mb-4">We reserve the right to terminate services if:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Terms are violated</li>
        <li>Payments are not made</li>
        <li>Misuse or illegal activities are detected</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
      <p class="text-muted leading-relaxed">
        We may update these Terms at any time. Continued use means acceptance of updated terms.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
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

export default LegalTerms;

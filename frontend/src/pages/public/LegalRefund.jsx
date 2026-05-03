import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { publicService } from '../../services/publicService';

const LegalRefund = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await publicService.getLegalData();
        if (res.success && res.data.refundPolicy) {
          setContent(res.data.refundPolicy);
        }
      } catch {
        console.error('Failed to fetch refund policy');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const fallbackContent = `
    <section>
      <p class="text-muted text-sm mb-4">Effective Date: May 1, 2026</p>
      <h2 class="text-2xl font-bold text-white mb-4">1. Overview</h2>
      <p class="text-muted leading-relaxed">
        At GnanaStack Technologies, we aim to deliver high-quality software services. Due to the nature of digital services, refunds are handled under specific conditions.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">2. Advance Payment</h2>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>All projects may require an advance payment before work begins.</li>
        <li>Advance payments confirm project booking and resource allocation.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">3. Refund Eligibility</h2>
      <p class="text-muted leading-relaxed mb-4">Refunds may be considered only in the following cases:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Project has not been started</li>
        <li>Technical limitation from our side prevents completion</li>
        <li>Mutual agreement between client and GnanaStack Technologies</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">4. Non-Refundable Cases</h2>
      <p class="text-muted leading-relaxed mb-4">Refunds will not be provided in the following situations:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Work has already started or partially completed</li>
        <li>Project is completed and delivered</li>
        <li>Client delays or fails to provide required information</li>
        <li>Client changes requirements after project start</li>
        <li>Digital products (e.g., delivered websites, portals, or applications)</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">5. Partial Refund</h2>
      <p class="text-muted leading-relaxed mb-4">In some cases, a partial refund may be provided based on:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Work completed</li>
        <li>Time and resources used</li>
      </ul>
      <p class="text-muted mt-4 italic">Final decision will be made by GnanaStack Technologies.</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">6. Subscription Services</h2>
      <p class="text-muted leading-relaxed mb-4">For services like HRMS and Test Portal:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Monthly payments are non-refundable once the billing cycle starts</li>
        <li>Clients can cancel future billing at any time</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">7. Processing Time</h2>
      <p class="text-muted leading-relaxed mb-4">Approved refunds will be processed within:</p>
      <p class="text-white font-bold ml-4">5–10 business days</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
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

export default LegalRefund;

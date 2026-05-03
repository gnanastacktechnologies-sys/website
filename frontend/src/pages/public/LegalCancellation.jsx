import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { publicService } from '../../services/publicService';

const LegalCancellation = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await publicService.getLegalData();
        if (res.success && res.data.cancellationPolicy) {
          setContent(res.data.cancellationPolicy);
        }
      } catch {
        console.error('Failed to fetch cancellation policy');
      } finally {        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const fallbackContent = `
    <section>
      <p class="text-muted text-sm mb-4">Effective Date: May 1, 2026</p>
      <h2 class="text-2xl font-bold text-white mb-4">1. Cancellation by Client</h2>
      <p class="text-muted leading-relaxed mb-4">Clients may request project cancellation:</p>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 class="text-indigo font-bold mb-2">Before Work Starts</h3>
          <p class="text-muted text-sm">Full refund may be provided (after deducting any processing fees if applicable).</p>
        </div>
        <div class="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 class="text-indigo font-bold mb-2">After Work Starts</h3>
          <p class="text-muted text-sm">No full refund. Charges will apply based on work completed.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">2. Cancellation by GnanaStack Technologies</h2>
      <p class="text-muted leading-relaxed mb-4">We reserve the right to cancel a project if:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Client fails to provide required information</li>
        <li>Payments are delayed or not completed</li>
        <li>Client requests unethical or illegal work</li>
        <li>Communication is not maintained</li>
      </ul>
      <p class="text-muted mt-4 italic">In such cases, a partial refund may be considered based on progress.</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">3. Project Hold / Delay</h2>
      <p class="text-muted leading-relaxed mb-4">If client does not respond or provide inputs:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Project may be put on hold</li>
        <li>Delays in delivery will not be our responsibility</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">4. Change of Requirements</h2>
      <p class="text-muted leading-relaxed">
        Major changes after project start will be treated as a new scope. Additional cost and timeline will apply.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">5. No Show / No Response</h2>
      <p class="text-muted leading-relaxed mb-4">If client is inactive for more than 7–14 days:</p>
      <ul class="list-disc list-inside text-muted space-y-2 ml-4">
        <li>Project may be paused or cancelled</li>
        <li>Advance payment will not be refunded</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">6. Restarting Cancelled Project</h2>
      <p class="text-muted leading-relaxed">
        Cancelled projects can be restarted. However, additional charges may apply.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Project Cancellation Policy</h1>
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

export default LegalCancellation;
